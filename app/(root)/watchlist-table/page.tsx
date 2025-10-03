"use client";

import WatchlistTable from "@/components/WatchlistTable";
import { Button } from "@/components/ui/button";
import { addToWatchlist } from "@/lib/actions/watchlist.actions";
import { useState, useTransition } from "react";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<string>("");


    const handleAdd = () => {
        setStatus("");
        startTransition(async () => {
            const res = await addToWatchlist("AAPL", "Apple Inc.");
            setStatus(res.success ? "Added to watchlist" : "Failed to add");
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="watchlist-title">Watchlist Table Demo</h1>
                <Button onClick={handleAdd} disabled={isPending}>
                    {isPending ? "Adding..." : "Add to Watchlist"}
                </Button>
            </div>
            {status && (
                <p className="text-sm text-gray-400" role="status">
                    {status}
                </p>
            )}
            <WatchlistTable watchlist={[]} />
        </div>
    );
}
