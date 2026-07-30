import { Link } from "@tanstack/react-router";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ChatThread } from "@/lib/chat.functions";
import { cn } from "@/lib/utils";

export type ThreadListProps = {
  threads: ChatThread[];
  activeId?: string;
  onNew: () => void;
  onDelete: (id: string) => void;
  creating?: boolean;
};

/** Sidebar list of saved conversations. */
export function ThreadList({ threads, activeId, onNew, onDelete, creating }: ThreadListProps) {
  return (
    <aside className="glass flex w-full shrink-0 flex-col gap-3 p-4 lg:w-72">
      <Button onClick={onNew} disabled={creating} className="btn-shine w-full rounded-xl">
        <Plus className="size-4" /> New conversation
      </Button>
      <nav aria-label="Conversations" className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {threads.length === 0 && (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">
            No conversations yet.
          </p>
        )}
        {threads.map((thread) => (
          <div
            key={thread.id}
            className={cn(
              "group flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-accent",
              thread.id === activeId && "bg-accent",
            )}
          >
            <Link
              to="/chat/$threadId"
              params={{ threadId: thread.id }}
              className="flex min-w-0 flex-1 items-center gap-2 py-1 text-sm"
            >
              <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{thread.title}</span>
            </Link>
            <button
              type="button"
              aria-label={`Delete ${thread.title}`}
              onClick={() => onDelete(thread.id)}
              className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
}
