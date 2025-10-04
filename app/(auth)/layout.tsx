import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user) {
        redirect("/");
    }

    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default gap-2">
                <Link href="/" className="auth-logo">
                    <div className="flex  items-center gap-4">
                        <Image
                            src="/assets/icons/logo.svg"
                            alt="NEXAL logo"
                            width={140}
                            height={32}
                            className="h-8 w-auto"
                        />
                        <h1 className="text-3xl font-bold">NEXAL</h1>
                    </div>
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>
            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote">
                        <p className="text-gray-400 mb-1">
                            “Every day, millions of people around the world rely
                            on NEXAL to make smarter stock decisions.”
                        </p>
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">
                                @user from around the world
                            </cite>
                            <p className="max-md:text-xs text-gray-500">
                                Retail Investor
                            </p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image
                                    src={`/assets/icons/star.svg`}
                                    alt="Star"
                                    key={star}
                                    width={20}
                                    height={20}
                                    className="h-5 w-5"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <Image
                        src="/assets/images/image.png"
                        alt="Dashboard Preview"
                        width={1440}
                        height={1150}
                        className="auth-dashboard-preview absolute top-0"
                    />
                </div>
            </section>
        </main>
    );
};

export default layout;
