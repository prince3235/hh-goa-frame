export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-jungle text-sand dark:border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">
              Hacker House <span className="text-marigold">Goa</span> 2026
            </p>
            <p className="mt-1 text-sm opacity-70">28–31 October · Goa, India</p>
          </div>
          <div className="text-sm opacity-80">
            <p>
              Remember: post your result on X with{" "}
              <span className="font-semibold text-marigold">#FrameInGoa</span> — submissions without it
              won&apos;t count.
            </p>
            <a
              href="https://forms.gle/jM5hTaGvsrfEfixPA"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-1 inline-block font-semibold text-hibiscus underline underline-offset-4"
            >
              Submit your entry →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
