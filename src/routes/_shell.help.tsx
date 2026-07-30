import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NEMO_TOOLS } from "@/lib/nemo-tools";

export const Route = createFileRoute("/_shell/help")({
  head: () => ({
    meta: [
      { title: "Help & AI Guidance | Nemo" },
      {
        name: "description",
        content:
          "How to use each Nemo AI tool, prompt tips, and responsible AI guidance for workplace use.",
      },
      { property: "og:title", content: "Help & AI Guidance | Nemo" },
      { property: "og:description", content: "Guides, FAQs and responsible AI notes for Nemo." },
    ],
  }),
  component: HelpPage,
});

const FAQ = [
  {
    q: "How does Nemo generate content?",
    a: "Each tool sends your input to a server-side AI model together with a carefully engineered prompt that defines role, goal, context, tone and constraints. Nothing is generated in your browser.",
  },
  {
    q: "Are my API keys safe?",
    a: "Yes. Credentials live only on the server as environment secrets and are never exposed to the browser or included in any client bundle.",
  },
  {
    q: "Are my conversations saved?",
    a: "Assistant conversations are saved to your account so you can return to them. Tool results are not stored — copy or download anything you want to keep.",
  },
  {
    q: "How do I get better results?",
    a: "Give context: who the audience is, what outcome you want, and any constraints such as length or tone. The more specific your input, the better the output.",
  },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl animate-rise space-y-6">
      <header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Help &amp; guidance</h1>
        <p className="text-sm text-muted-foreground">
          Everything you need to get the most out of Nemo.
        </p>
      </header>

      <section className="glass p-6" aria-labelledby="tools">
        <h2 id="tools" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          What each tool does
        </h2>
        <ul className="mt-4 space-y-3">
          {NEMO_TOOLS.map((tool) => (
            <li key={tool.slug} className="flex items-start gap-3 text-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-primary">
                <tool.icon className="size-4" />
              </span>
              <span>
                <span className="font-medium">{tool.title}</span>
                <span className="block text-muted-foreground">{tool.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass p-6" aria-labelledby="faq">
        <h2 id="faq" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-2">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-sm">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="glass flex items-start gap-3 p-6">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Nemo uses AI to assist workplace productivity. AI can make mistakes — always review
          generated content and never rely solely on AI for legal, financial, medical or
          business-critical decisions.
        </p>
      </section>
    </div>
  );
}
