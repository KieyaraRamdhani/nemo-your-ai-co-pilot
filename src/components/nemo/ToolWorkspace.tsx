import { Copy, Download, RefreshCw, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

export type ToolWorkspaceProps = {
  title: string;
  description: string;
  icon: ReactNode;
  examples: string[];
  onExample?: (example: string) => void;
  form: ReactNode;
  result: string | null;
  loading: boolean;
  error: string | null;
  onRegenerate: () => void;
  downloadName: string;
  statusLabel: string;
};

/** Shared layout for every Nemo AI tool page: input panel + AI response panel. */
export function ToolWorkspace({
  title,
  description,
  icon,
  examples,
  onExample,
  form,
  result,
  loading,
  error,
  onRegenerate,
  downloadName,
  statusLabel,
}: ToolWorkspaceProps) {
  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${downloadName}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl animate-rise space-y-6">
      <header className="flex flex-wrap items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-2xl border border-border surface-gradient text-primary-foreground">
          {icon}
        </span>
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <span className="ml-auto flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
          <span
            className={`size-2 rounded-full ${loading ? "bg-warning animate-pulse-dot" : "bg-success animate-pulse-dot"}`}
          />
          {loading ? statusLabel : "AI Ready"}
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="glass-panel space-y-5 p-6" aria-label="Input">
          {form}
          {examples.length > 0 && (
            <div className="space-y-2 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Example prompts
              </p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => onExample?.(example)}
                    className="glass glass-hover rounded-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:text-foreground"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="glass-panel flex min-h-[26rem] flex-col p-6" aria-label="AI response">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Sparkles className="size-4 text-primary" /> AI Response
            </h2>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={copy}
                disabled={!result}
                aria-label="Copy response"
              >
                <Copy className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={download}
                disabled={!result}
                aria-label="Download response"
              >
                <Download className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRegenerate}
                disabled={loading}
                aria-label="Regenerate response"
              >
                <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto pr-1" aria-live="polite">
            {loading && (
              <div className="space-y-3">
                <Shimmer>{statusLabel}</Shimmer>
                {[90, 75, 82, 60].map((w) => (
                  <div
                    key={w}
                    className="h-3 animate-pulse rounded-full bg-muted"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            )}
            {!loading && error && <p className="text-sm text-destructive">{error}</p>}
            {!loading && !error && !result && (
              <p className="text-sm text-muted-foreground">
                Fill in the form and let Nemo generate a first draft. Results appear here in
                seconds.
              </p>
            )}
            {!loading && result && (
              <div className="prose-sm max-w-none text-sm leading-relaxed">
                <MessageResponse>{result}</MessageResponse>
              </div>
            )}
          </div>
        </section>
      </div>

      <p className="text-xs text-muted-foreground">
        Nemo can make mistakes. Always verify important information before acting on it — never
        rely on AI alone for legal, financial, medical or business-critical decisions.
      </p>
    </div>
  );
}
