import Link from "next/link";
import { Coins } from "lucide-react";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-2 text-zinc-50">
          <Coins className="h-5 w-5 text-sky-400" aria-hidden="true" />
          <span className="text-base font-medium tracking-tight">
            Token Launchpad
          </span>
        </Link>

        <Link
          href="/launch"
          className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          launch it
        </Link>
      </nav>
    </header>
  );
}
