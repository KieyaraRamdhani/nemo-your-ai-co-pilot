import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const emailSchema = z.object({
  recipient: z.string().trim().max(120),
  company: z.string().trim().max(120),
  context: z.string().trim().max(4000),
  purpose: z.string().trim().min(3, "Describe the purpose of the email").max(1000),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

const meetingSchema = z.object({
  notes: z.string().trim().min(20, "Paste at least a few lines of notes").max(20000),
});

const taskSchema = z.object({
  tasks: z.string().trim().min(5, "List at least one task").max(8000),
  horizon: z.enum(["Daily", "Weekly"]),
  workingHours: z.string().trim().max(80),
});

const researchSchema = z.object({
  topic: z.string().trim().min(5, "Enter a topic or paste some text").max(20000),
});

async function runNemo(prompt: string, system: string) {
  const { generateText } = await import("ai");
  const { createLovableAiGatewayProvider, NEMO_MODEL } = await import("./ai-gateway.server");
  const { SYSTEM_PROMPTS } = await import("./nemo-prompts");

  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI is not configured for this workspace.");

  const gateway = createLovableAiGatewayProvider(key);

  try {
    const { text } = await generateText({
      model: gateway(NEMO_MODEL),
      system: system || SYSTEM_PROMPTS.base,
      prompt,
      providerOptions: { lovable: { reasoningEffort: "none" } },
    });
    return { text };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("429")) throw new Error("Nemo is rate limited right now. Try again in a moment.");
    if (message.includes("402")) throw new Error("AI credits have run out for this workspace.");
    console.error("[Nemo AI]", message);
    throw new Error("Nemo could not complete that request. Please try again.");
  }
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const { buildEmailPrompt, SYSTEM_PROMPTS } = await import("./nemo-prompts");
    return runNemo(buildEmailPrompt(data), SYSTEM_PROMPTS.base);
  });

export const summariseMeeting = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => meetingSchema.parse(data))
  .handler(async ({ data }) => {
    const { buildMeetingPrompt, SYSTEM_PROMPTS } = await import("./nemo-prompts");
    return runNemo(buildMeetingPrompt(data.notes), SYSTEM_PROMPTS.base);
  });

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => taskSchema.parse(data))
  .handler(async ({ data }) => {
    const { buildTaskPrompt, SYSTEM_PROMPTS } = await import("./nemo-prompts");
    return runNemo(buildTaskPrompt(data), SYSTEM_PROMPTS.base);
  });

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => researchSchema.parse(data))
  .handler(async ({ data }) => {
    const { buildResearchPrompt, SYSTEM_PROMPTS } = await import("./nemo-prompts");
    return runNemo(buildResearchPrompt(data.topic), SYSTEM_PROMPTS.base);
  });
