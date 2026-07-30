import { cn } from "@/lib/utils";

/** Nemo brand mark — an aqua sonar/fish glyph in a glass ring. */
export function NemoLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border surface-gradient",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-5" role="img" aria-label="Nemo logo">
        <path
          d="M4 16c4.5-6 10-9 15-9 3.4 0 6.3 1.3 9 4-2.7 2.7-5.6 4-9 4-5 0-10.5-3-15 1Z"
          fill="currentColor"
          className="text-primary-foreground"
          opacity="0.92"
        />
        <path
          d="M4 16c4.5 6 10 9 15 9 3.4 0 6.3-1.3 9-4-2.7-2.7-5.6-4-9-4-5 0-10.5 3-15-1Z"
          fill="currentColor"
          className="text-primary-foreground"
          opacity="0.55"
        />
        <circle cx="22" cy="14.5" r="1.4" fill="currentColor" className="text-background" />
      </svg>
    </span>
  );
}
