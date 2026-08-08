"use client";

import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-sand/80 backdrop-blur-md dark:border-white/10 dark:bg-jungle-deep/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="focus-ring flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-jungle text-marigold dark:bg-marigold dark:text-jungle">
            <span className="font-display text-sm font-bold">H</span>
          </span>
          <span className="font-display text-lg font-semibold">
            HH Goa <span className="text-hibiscus">2026</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold sm:flex">
          <a href="#generator" className="focus-ring opacity-80 hover:opacity-100">Generator</a>
          <a href="#how" className="focus-ring opacity-80 hover:opacity-100">How it works</a>
          <a href="#features" className="focus-ring opacity-80 hover:opacity-100">Features</a>
        </nav>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
