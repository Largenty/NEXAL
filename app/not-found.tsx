import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full grid place-items-center p-6">
            <div className="relative w-full max-w-2xl text-center">
                <div className="mx-auto mb-6 w-fit rounded-full border px-4 py-1 text-xs font-medium text-muted-foreground">
                    404 • The grind never stops
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Page not found, stay SIGMA 🕶️
                </h1>

                <p className="mt-4 text-sm md:text-base text-muted-foreground">
                    You can&apos;t lose what you never had, but you can always
                    level up. Take the L like a legend and move smarter. 📈
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground shadow hover:opacity-90 transition"
                    >
                        Return home
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted transition"
                    >
                        Open markets
                    </Link>
                </div>


                <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-30 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent" />
                </div>
            </div>
        </div>
    );
}
