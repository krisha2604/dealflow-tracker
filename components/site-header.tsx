import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 rounded-lg">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PipelineMark />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.15rem] tracking-tight">Dealflow</span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Tracker
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}

function PipelineMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="9" width="3" height="5" rx="0.6" fill="currentColor" opacity="0.45" />
      <rect x="6.5" y="6" width="3" height="8" rx="0.6" fill="currentColor" opacity="0.72" />
      <rect x="12" y="2" width="3" height="12" rx="0.6" fill="currentColor" />
    </svg>
  );
}
