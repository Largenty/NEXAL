import WatchlistTable from "@/components/WatchlistTable";
import { getUserWatchlistWithData } from "@/lib/actions/watchlist.actions";

export default async function Page() {
    const watchlist = await getUserWatchlistWithData();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="watchlist-title">Watchlist</h1>
            </div>
            <WatchlistTable watchlist={watchlist} />
        </div>
    );
}
