import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-0">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-zinc-500 sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Token Launchpad</p>
        <div className="flex items-center gap-5">
          <a
            href="https://solana.com/docs"
            className="transition-colors hover:text-zinc-300"
          >
            Solana docs
          </a>
          <a
            href="https://github.com"
            aria-label="GitHub"
            className="transition-colors hover:text-zinc-300"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://twitter.com"
            aria-label="X (Twitter)"
            className="transition-colors hover:text-zinc-300"
          >
            <Twitter className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
