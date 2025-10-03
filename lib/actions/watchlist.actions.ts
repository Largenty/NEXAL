"use server";

import { connectToMongoDB } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getBatchQuotesAndMetrics } from "@/lib/actions/finnhub.actions";

export async function getWatchlistSymbolsByEmail(
    email: string
): Promise<string[]> {
    if (!email) return [];

    try {
        const mongoose = await connectToMongoDB();
        const db = mongoose.connection.db;
        if (!db) throw new Error("MongoDB connection not found");

        // Better Auth stores users in the "user" collection
        const user = await db
            .collection("user")
            .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || "");
        if (!userId) return [];

        const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol));
    } catch (err) {
        console.error("getWatchlistSymbolsByEmail error:", err);
        return [];
    }
}

export async function addToWatchlist(
    symbol: string,
    company: string
): Promise<{ success: boolean }> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const userId = session?.user?.id || "";
        if (!userId) return { success: false };

        const upperSymbol = (symbol || "").trim().toUpperCase();
        const companyName = (company || "").trim();
        if (!upperSymbol || !companyName) return { success: false };

        await connectToMongoDB();

        await Watchlist.updateOne(
            { userId, symbol: upperSymbol },
            {
                $setOnInsert: {
                    userId,
                    symbol: upperSymbol,
                    company: companyName,
                    addedAt: new Date(),
                },
            },
            { upsert: true }
        );

        return { success: true };
    } catch (err) {
        console.error("addToWatchlist error:", err);
        return { success: false };
    }
}

export async function removeFromWatchlist(
    symbol: string
): Promise<{ success: boolean }> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const userId = session?.user?.id || "";
        if (!userId) return { success: false };

        const upperSymbol = (symbol || "").trim().toUpperCase();
        if (!upperSymbol) return { success: false };

        await connectToMongoDB();
        await Watchlist.deleteOne({ userId, symbol: upperSymbol });
        return { success: true };
    } catch (err) {
        console.error("removeFromWatchlist error:", err);
        return { success: false };
    }
}

export async function getUserWatchlistWithData(): Promise<StockWithData[]> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const userId = session?.user?.id || "";
        if (!userId) return [];

        await connectToMongoDB();

        const items = await Watchlist.find({ userId }).lean<
            {
                userId?: string;
                symbol?: string;
                company?: string;
                addedAt?: Date | string;
            }[]
        >();
        const symbols = items
            .map((i) => String(i?.symbol || ""))
            .filter(Boolean);
        if (symbols.length === 0) return [];

        const enriched = await getBatchQuotesAndMetrics(symbols);

        const result: StockWithData[] = items.map((i) => {
            const sym = String(i?.symbol || "").toUpperCase();
            const e = enriched[sym] || ({} as Partial<StockWithData>);
            return {
                userId: String(i?.userId || userId),
                symbol: sym,
                company: String(i?.company || sym),
                addedAt: i?.addedAt ? new Date(i.addedAt) : new Date(),
                currentPrice: e.currentPrice,
                changePercent: e.changePercent,
                priceFormatted: e.priceFormatted,
                changeFormatted: e.changeFormatted,
                marketCap: e.marketCap,
                peRatio: e.peRatio,
            } as StockWithData;
        });

        return result;
    } catch (err) {
        console.error("getUserWatchlistWithData error:", err);
        return [];
    }
}
