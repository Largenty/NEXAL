"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Github, User, Linkedin, MessageCircle } from "lucide-react";
import NavItems from "@/components/NavItems";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({
    user,
    initialStocks,
}: {
    user: User;
    initialStocks: StockWithWatchlistStatus[];
}) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-3 text-gray-4 hover:text-[#00E560]"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/57532296?s=400&u=de8dbc238f2d11b84ccb6146ce5d16a5c0cbb624&v=4" />
                        <AvatarFallback className="bg-[#00E560] text-gray-950 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-base font-medium text-gray-400">
                            {user.name}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-emerald-100 bg-emerald-950/90 border border-emerald-800 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-emerald-950/80">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/57532296?s=400&u=de8dbc238f2d11b84ccb6146ce5d16a5c0cbb624&v=4" />
                            <AvatarFallback className="bg-[#00E560] text-gray-950 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-400">
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <nav className="sm:hidden">
                    <NavItems initialStocks={initialStocks} />
                </nav>
                <DropdownMenuSeparator className="bg-emerald-800/50" />
                <DropdownMenuItem
                    asChild
                    className="text-emerald-100 text-md font-medium focus:bg-emerald-900/40 focus:text-emerald-200 transition-colors cursor-pointer"
                >
                    <Link href="/profil" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-emerald-800/50" />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-emerald-100 text-md font-medium focus:bg-emerald-900/40 focus:text-emerald-200 transition-colors cursor-pointer"
                >
                    <LogOut className="h-4 w-4 mr-2 " />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block bg-emerald-800/50" />
                <DropdownMenuItem
                    asChild
                    className="text-emerald-100 text-md font-medium focus:bg-emerald-900/40 focus:text-emerald-200 transition-colors cursor-pointer"
                >
                    <a
                        href="https://www.linkedin.com/in/largenty"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center"
                    >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                    asChild
                    className="text-emerald-100 text-md font-medium focus:bg-emerald-900/40 focus:text-emerald-200 transition-colors cursor-pointer"
                >
                    <a
                        href="https://github.com/Largenty"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center"
                    >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                    asChild
                    className="text-emerald-100 text-md font-medium focus:bg-emerald-900/40 focus:text-emerald-200 transition-colors cursor-pointer"
                >
                    <Link href="/contact" className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" /> Contact L.
                        Argenty
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default UserDropdown;
