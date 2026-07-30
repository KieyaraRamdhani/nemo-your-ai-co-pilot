import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { supabase } from "@/integrations/supabase/client";

export type ChatWindowProps = {
  threadId: string;
  initialMessages: UIMessage[];
  onFirstMessage?: (text: string) => void;
};

const SUGGESTIONS = [
  "Help me prepare for a difficult client conversation",
  "Draft a polite decline to a meeting invite",
  "Explain our Q3 priorities to a new team member",
];

/** Streaming assistant conversation for a single thread. */
export function ChatWindow({ threadId, initialMessages, onFirstMessage }: ChatWindowProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { threadId },
        fetch: async (input, init) => {
          const { data } = await supabase.auth.getSession();
          const headers = new Headers(init?.headers);
          if (data.session?.access_token) {
            headers.set("Authorization", `Bearer ${data.session.access_token}`);
          }
          return fetch(input, { ...init, headers });
        },
      }),
    [threadId],
  );

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (err) => toast.error(err.message || "The assistant could not respond."),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId]);

  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    if (messages.length === 0) onFirstMessage?.(value);
    void sendMessage({ text: value });
  };

  return (
    <div className="flex h-[calc(100vh-11rem)] flex-col">
      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl">
          {messages.length === 0 && (
            <div className="py-10">
              <ConversationEmptyState
                icon={<Bot className="size-8 text-primary" />}
                title="Ask Nemo anything about your work"
                description="Workplace guidance, drafting help, explanations and problem solving."
              />
              <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="glass glass-hover rounded-full px-4 py-2 text-xs"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent>
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <MessageResponse key={index}>{part.text}</MessageResponse>
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Thinking...</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && (
            <p className="mx-auto max-w-3xl text-sm text-destructive">
              {error.message || "Something went wrong."}
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mx-auto w-full max-w-3xl pt-4">
        <PromptInput
          onSubmit={(message, event) => {
            event.preventDefault();
            send(message.text ?? "");
          }}
        >
          <PromptInputTextarea ref={textareaRef} placeholder="Message Nemo..." />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={busy} />
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Nemo can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
