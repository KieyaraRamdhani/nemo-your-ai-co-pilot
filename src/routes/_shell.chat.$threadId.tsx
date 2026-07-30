import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { UIMessage } from "ai";

import { AuthGate } from "@/components/nemo/AuthGate";
import { ChatWindow } from "@/components/nemo/ChatWindow";
import { ThreadList } from "@/components/nemo/ThreadList";
import {
  createThread,
  deleteThread,
  getThreadMessages,
  listThreads,
  renameThread,
} from "@/lib/chat.functions";

export const Route = createFileRoute("/_shell/chat/$threadId")({
  head: () => ({
    meta: [
      { title: "Conversation | Nemo AI Assistant" },
      {
        name: "description",
        content: "Continue your saved conversation with the Nemo workplace AI assistant.",
      },
      { property: "og:title", content: "Conversation | Nemo AI Assistant" },
      { property: "og:description", content: "Saved AI conversation in your Nemo workspace." },
    ],
  }),
  component: ChatThread,
});

function ChatThread() {
  const { threadId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchThreads = useServerFn(listThreads);
  const fetchMessages = useServerFn(getThreadMessages);
  const newThread = useServerFn(createThread);
  const removeThread = useServerFn(deleteThread);
  const rename = useServerFn(renameThread);

  const threads = useQuery({ queryKey: ["threads"], queryFn: () => fetchThreads(), retry: false });
  const conversation = useQuery({
    queryKey: ["thread", threadId],
    queryFn: () => fetchMessages({ data: { threadId } }),
    retry: false,
  });

  const create = useMutation({
    mutationFn: () => newThread(),
    onSuccess: (thread) => {
      void queryClient.invalidateQueries({ queryKey: ["threads"] });
      void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => removeThread({ data: { threadId: id } }),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ["threads"] });
      if (id === threadId) void navigate({ to: "/chat" });
    },
  });

  if (threads.isError) return <AuthGate />;

  const initialMessages: UIMessage[] = (conversation.data?.messages ?? []).map((row) => ({
    id: row.id,
    role: row.role,
    parts: [{ type: "text", text: row.content }],
  }));

  return (
    <div className="mx-auto flex max-w-7xl animate-rise flex-col gap-4 lg:flex-row">
      <ThreadList
        threads={threads.data ?? []}
        activeId={threadId}
        onNew={() => create.mutate()}
        onDelete={(id) => remove.mutate(id)}
        creating={create.isPending}
      />
      <div className="glass min-w-0 flex-1 p-4 sm:p-6">
        {conversation.isLoading ? (
          <p className="p-8 text-sm text-muted-foreground">Loading conversation...</p>
        ) : conversation.isError ? (
          <p className="p-8 text-sm text-destructive">This conversation could not be loaded.</p>
        ) : (
          <ChatWindow
            key={threadId}
            threadId={threadId}
            initialMessages={initialMessages}
            onFirstMessage={(text) => {
              void rename({ data: { threadId, title: text.slice(0, 60) } }).then(() =>
                queryClient.invalidateQueries({ queryKey: ["threads"] }),
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
