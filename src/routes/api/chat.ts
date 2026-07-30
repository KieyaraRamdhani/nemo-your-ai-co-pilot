import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatBody = { messages?: UIMessage[]; threadId?: string };

function textOf(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, threadId } = (await request.json()) as ChatBody;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("AI is not configured", { status: 500 });

        const { supabaseFromBearer } = await import("@/lib/supabase-user.server");
        const auth = await supabaseFromBearer(request.headers.get("authorization"));
        if (!auth || !threadId) {
          return new Response("Unauthorized", { status: 401 });
        }

        // Verify the thread belongs to the caller before streaming or saving.
        const { data: thread, error: threadError } = await auth.client
          .from("chat_threads")
          .select("id, title")
          .eq("id", threadId)
          .maybeSingle();
        if (threadError || !thread) return new Response("Conversation not found", { status: 404 });

        const { createLovableAiGatewayProvider, NEMO_MODEL } = await import(
          "@/lib/ai-gateway.server"
        );
        const { SYSTEM_PROMPTS } = await import("@/lib/nemo-prompts");
        const gateway = createLovableAiGatewayProvider(key);

        const last = messages[messages.length - 1];
        if (last?.role === "user") {
          const content = textOf(last);
          const { error } = await auth.client.from("chat_messages").insert({
            thread_id: threadId,
            user_id: auth.userId,
            role: "user",
            content,
            client_message_id: last.id,
          });
          if (error) console.error("[Nemo chat] failed to save user message:", error.message);

          const title =
            thread.title === "New conversation" && content
              ? content.slice(0, 60)
              : thread.title;
          const { error: updateError } = await auth.client
            .from("chat_threads")
            .update({ title, updated_at: new Date().toISOString() })
            .eq("id", threadId);
          if (updateError) console.error("[Nemo chat] thread update failed:", updateError.message);
        }

        const result = streamText({
          model: gateway(NEMO_MODEL),
          system: SYSTEM_PROMPTS.chat,
          messages: await convertToModelMessages(messages),
          providerOptions: { lovable: { reasoningEffort: "none" } },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onFinish: async ({ responseMessage }) => {
            const content = textOf(responseMessage);
            if (!content) return;
            const { error } = await auth.client.from("chat_messages").insert({
              thread_id: threadId,
              user_id: auth.userId,
              role: "assistant",
              content,
              client_message_id: responseMessage.id,
            });
            if (error) console.error("[Nemo chat] failed to save reply:", error.message);
          },
        });
      },
    },
  },
});
