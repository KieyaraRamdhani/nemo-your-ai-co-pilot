import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Bot } from "lucide-react";

import { ThreadList } from "@/components/nemo/ThreadList";
import { AuthGate } from "@/components/nemo/AuthGate";
import { createThread, deleteThread, listThreads } from "@/lib/chat.functions";

export const Route = createFileRoute("/_shell/chat/")({
  head: () => ({
    meta: [
      { title: "Workplace AI Assistant | Nemo" },
      {
        name: "description",
        content:
          "Chat with Nemo, your workplace AI assistant, for guidance, drafting help and problem solving. Conversations are saved to your account.",
      },
      { property: "og:title", content: "Workplace AI Assistant | Nemo" },
      { property: "og:description", content: "Your saved AI conversations, in one workspace." },
    ],
  }),
  component: ChatIndex,
});

function ChatIndex() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchThreads = useServerFn(listThreads);
  const newThread = useServerFn(createThread);
  const removeThread = useServerFn(deleteThread);

  const threads = useQuery({ queryKey: ["threads"], queryFn: () => fetchThreads(), retry: false });

  const create = useMutation({
    mutationFn: () => newThread(),
    onSuccess: (thread) => {
      void queryClient.invalidateQueries({ queryKey: ["threads"] });
      void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    },
  });

  const remove = useMutation({
    mutationFn: (threadId: string) => removeThread({ data: { threadId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["threads"] }),
  });

  if (threads.isError) return <AuthGate />;

  return (
    <div className="mx-auto flex max-w-7xl animate-rise flex-col gap-4 lg:flex-row">
      <ThreadList
        threads={threads.data ?? []}
        onNew={() => create.mutate()}
        onDelete={(id) => remove.mutate(id)}
        creating={create.isPending}
      />
      <div className="glass flex flex-1 flex-col items-center justify-center gap-3 p-16 text-center">
        <Bot className="size-10 text-primary" />
        <h1 className="text-xl font-semibold">Workplace AI Assistant</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Start a new conversation or pick one from the list to continue where you left off.
        </p>
      </div>
    </div>
  );
}
