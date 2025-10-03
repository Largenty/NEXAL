import TradingViewWidget from "@/components/TradingViewWidget";
import {
    BASELINE_WIDGET_CONFIG,
    CANDLE_CHART_WIDGET_CONFIG,
    COMPANY_FINANCIALS_WIDGET_CONFIG,
    SYMBOL_INFO_WIDGET_CONFIG,
    TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";
import WatchlistButton from "@/components/WatchlistButton";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";

const StockDetails = async ({ params }: StockDetailsPageProps) => {
    const { symbol } = await params;

    // Determine if this symbol is in the user's watchlist
    const session = await auth.api.getSession({ headers: await headers() });
    const email = session?.user?.email || "";
    const symbols = email ? await getWatchlistSymbolsByEmail(email) : [];
    const isInWatchlist = symbols.includes(symbol.toUpperCase());

    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left column */}
            <section className="space-y-8">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}symbol-info.js`}
                    config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                    height={170}
                />

                <TradingViewWidget
                    scriptUrl={`${scriptUrl}advanced-chart.js`}
                    config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                    height={600}
                />

                <TradingViewWidget
                    scriptUrl={`${scriptUrl}advanced-chart.js`}
                    config={BASELINE_WIDGET_CONFIG(symbol)}
                    height={600}
                />
            </section>

            {/* Right column */}
            <section className="space-y-8">
                <WatchlistButton
                    symbol={symbol}
                    company={symbol}
                    isInWatchlist={isInWatchlist}
                />

                <TradingViewWidget
                    scriptUrl={`${scriptUrl}technical-analysis.js`}
                    config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                    height={400}
                />

                {/* <TradingViewWidget
                    scriptUrl={`${scriptUrl}company-profile.js`}
                    config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                    height={440}
                /> */}

                <TradingViewWidget
                    scriptUrl={`${scriptUrl}financials.js`}
                    config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                    height={464}
                />
            </section>
        </div>
    );
};

export default StockDetails;
