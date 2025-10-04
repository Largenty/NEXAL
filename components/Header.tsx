import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropDown from "@/components/UserDropDown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <div className="flex  items-center gap-4">
                        <Image
                            src="/assets/icons/logo.svg"
                            alt="NEXAL logo"
                            width={140}
                            height={32}
                            className="h-8 w-auto cursor-pointer"
                        />
                        <h1 className="text-2xl font-bold text-white">NEXAL</h1>
                    </div>
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>

                <UserDropDown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    );
};
export default Header;
