"use server";
import { auth } from "@/lib//better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";
import { connectToMongoDB } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export const signUpWithEmail = async ({
    email,
    password,
    fullName,
    country,
    investmentGoals,
    riskTolerance,
    preferredIndustry,
}: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName,
            },
        });

        if (response) {
            await inngest.send({
                name: "app/user.created",
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,
                },
            });
        }

        return { success: true, message: "SignUp successful", data: response };
    } catch (error) {
        console.log("SignUp failed", error);
        return { success: false, message: "SignUp failed" };
    }
};

export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });
    } catch (error) {
        console.log("SignOut failed", error);
    }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return { success: true, message: "SignUp successful", data: response };
    } catch (error) {
        console.log("SignUp failed", error);
        return { success: false, message: "SignUp failed" };
    }
};

export const deleteCurrentUser = async (_formData?: FormData) => {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const userId = session?.user?.id || "";
        const email = session?.user?.email || "";
        if (!userId) {
            return; // not authenticated, no-op
        }

        const mongoose = await connectToMongoDB();
        const db = mongoose.connection.db;
        if (!db) throw new Error("MongoDB connection not found");

        // Clean up app data linked to the user
        await Watchlist.deleteMany({ userId });

        // Resolve possible _id and fetch user
        const maybeObjectId = ObjectId.isValid(userId)
            ? new ObjectId(userId)
            : undefined;
        const userDoc = await db.collection("user").findOne({
            $or: [
                { id: userId },
                ...(maybeObjectId ? [{ _id: maybeObjectId }] : []),
                ...(email ? [{ email }] : []),
            ],
        });

        // Remove auth-related records (sessions, accounts)
        await db.collection("session").deleteMany({ userId });
        await db
            .collection("account")
            .deleteMany({ userId })
            .catch(() => {});

        // Remove user by multiple keys to be safe
        if (userDoc?._id)
            await db.collection("user").deleteOne({ _id: userDoc._id });
        await db.collection("user").deleteOne({ id: userId });
        if (email) await db.collection("user").deleteOne({ email });

        // Sign out to clear cookies/session
        await auth.api.signOut({ headers: await headers() });

        // Redirect to sign-in
        redirect("/sign-in");
    } catch (error) {
        console.error("deleteCurrentUser failed", error);
        return;
    }
};
