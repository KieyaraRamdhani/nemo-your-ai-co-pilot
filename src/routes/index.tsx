import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Info, Cpu, PenLine, Rocket, ShieldCheck, Check } from "lucide-react";

import { NemoLogo } from "@/components/nemo/NemoLogo";
import { SiteFooter } from "@/components/nemo/SiteFooter";
import { Button } from "@/components/ui/button";
import { NEMO_TOOLS } from "@/lib/nemo-tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nemo | AI Productivity Assistant for Modern Teams" },
      {
        name: "description",
        content:
          "Nemo is an AI workplace productivity platform: draft emails, summarise meetings, plan your week, research topics and chat with an AI assistant in one workspace.",
      },
      { property: "og:title", content: "Nemo | AI Productivity Assistant" },
      {
        property: "og:description",
        content: "Work smarter. Let Nemo handle the rest — one AI workspace for everyday work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const WORKFLOW = [
  { icon: PenLine, title: "Describe Your Task", body: "Tell Nemo what you need help with." },
  { icon: Cpu, title: "AI Processing", body: "Nemo analyses your request with engineered prompts." },
  { icon: Check, title: "Receive Results", body: "Get professional, editable output instantly." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className="glass mx-auto flex max-w-7xl items-center gap-4 px-4 py-3"
        >
          <Link to="/" className="flex items-center gap-2" aria-label="Nemo home">
            <NemoLogo className="animate-float" />
            <span className="text-lg font-semibold">Nemo</span>
          </Link>
          <div className="ml-auto hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/analytics">Analytics</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/help">Help</Link>
            </Button>
          </div>
          <Button asChild size="sm" className="btn-shine ml-auto rounded-xl md:ml-0">
            <Link to="/dashboard">
              <Rocket className="size-4" /> Launch
            </Link>
          </Button>
        </nav>
      </header>

      <main className="px-4 sm:px-6">
        <section className="mx-auto grid max-w-7xl gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="glass-panel animate-rise p-8 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-primary">
              <ShieldCheck className="size-3.5" /> AI Workplace Productivity Assistant
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Work Smarter.
              <br />
              <span className="text-gradient">Let Nemo Handle the Rest.</span>
            </h1>
            <h2 className="mt-4 text-lg text-muted-foreground">
              Intelligent AI for Modern Businesses.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Nemo helps professionals streamline everyday work by generating emails, summarising
              meetings, planning schedules, researching information, and providing an intelligent
              AI assistant—all from one workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-shine rounded-xl">
                <Link to="/dashboard">
                  <Rocket className="size-4" /> Launch Dashboard
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link to="/help">
                  <Info className="size-4" /> Learn More
                </Link>
              </Button>
            </div>
          </div>

          <aside className="glass-panel animate-rise p-6 sm:p-8" aria-label="AI applications">
            <h2 className="text-xl font-semibold">Choose an AI Tool</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select an AI application to begin improving your productivity.
            </p>
            <div className="mt-5 space-y-3">
              {NEMO_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  to={tool.to}
                  className="glass glass-hover group flex items-center gap-4 rounded-2xl px-4 py-3.5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border surface-gradient text-primary-foreground transition-transform group-hover:scale-110">
                    <tool.icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{tool.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-7xl py-8" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="text-center text-2xl font-semibold sm:text-3xl">
            How Nemo Works
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {WORKFLOW.map((step) => (
              <article key={step.title} className="glass glass-hover p-6 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border surface-gradient text-primary-foreground">
                  <step.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-8" aria-labelledby="responsible-ai">
          <div className="glass-panel p-8 text-center">
            <ShieldCheck className="mx-auto size-8 text-primary" />
            <h2 id="responsible-ai" className="mt-4 text-2xl font-semibold">
              Responsible AI
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Nemo uses Artificial Intelligence to assist workplace productivity. AI can make
              mistakes — always review AI-generated content and verify important information. Never
              rely solely on AI for legal, financial, medical or business-critical decisions.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
