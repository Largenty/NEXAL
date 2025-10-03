"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    addToWatchlist,
    removeFromWatchlist,
} from "@/lib/actions/watchlist.actions";

const WatchlistButton = ({
    symbol,
    company,
    isInWatchlist,
    type = "button",
    onWatchlistChange,
}: WatchlistButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const [inWatchlist, setInWatchlist] = useState<boolean>(isInWatchlist);

    useEffect(() => {
        setInWatchlist(isInWatchlist);
    }, [isInWatchlist]);

    const handleClick = () => {
        if (isPending) return;

        startTransition(async () => {
            const result = inWatchlist
                ? await removeFromWatchlist(symbol)
                : await addToWatchlist(symbol, company);

            if (result?.success) {
                const next = !inWatchlist;
                setInWatchlist(next);
                onWatchlistChange?.(symbol, next);
            }
        });
    };

    if (type === "icon") {
        return (
            <button
                className={`watchlist-icon-btn ${
                    inWatchlist ? "watchlist-icon-added" : ""
                }`}
                aria-label="Toggle watchlist"
                aria-busy={isPending}
                disabled={isPending}
                onClick={handleClick}
            >
                <span className="watchlist-icon">★</span>
            </button>
        );
    }

    return (
        <Button
            className={`watchlist-btn ${inWatchlist ? "watchlist-remove" : ""}`}
            aria-busy={isPending}
            disabled={isPending}
            onClick={handleClick}
        >
            {isPending
                ? inWatchlist
                    ? "Removing..."
                    : "Adding..."
                : inWatchlist
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
        </Button>
    );
};

export default WatchlistButton;
