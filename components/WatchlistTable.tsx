"use client";

import { WATCHLIST_TABLE_HEADER } from "@/lib/constants";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function WatchlistTable({
    watchlist = [] as StockWithData[],
}: WatchlistTableProps) {
    const router = useRouter();
    return (
        <div className="watchlist-table">
            <Table>
                <TableHeader>
                    <TableRow className="table-header-row">
                        {WATCHLIST_TABLE_HEADER.map((col) => (
                            <TableHead
                                key={col}
                                className="table-header text-left"
                            >
                                {col}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {watchlist.map((r, idx) => (
                        <TableRow
                            key={idx}
                            className="table-row"
                            role="link"
                            tabIndex={0}
                            onClick={() => router.push(`/stocks/${r.symbol}`)}
                        >
                            <TableCell className="table-cell text-left">
                                {r.company}
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                {r.symbol}
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                {r.priceFormatted ?? "—"}
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                {r.changeFormatted ?? "—"}
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                {r.marketCap ?? "—"}
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                {r.peRatio ?? "—"}
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                —
                            </TableCell>
                            <TableCell className="table-cell text-left">
                                —
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
