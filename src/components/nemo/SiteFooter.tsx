import { Github, Linkedin, Mail } from "lucide-react";
import { NemoLogo } from "./NemoLogo";

export function SiteFooter() {
  return (
    <footer className="mt-16 px-4 pb-10 sm:px-6">
      <div className="glass mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <NemoLogo />
            <div>
              <p className="font-semibold">Nemo</p>
              <p className="text-sm text-muted-foreground">
                AI-powered workplace productivity assistant.
              </p>
            </div>
          </div>
          <nav aria-label="Social links" className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="glass glass-hover flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:text-primary"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass glass-hover flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:text-primary"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="mailto:hello@nemo.ai"
              aria-label="Email Nemo"
              className="glass glass-hover flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:text-primary"
            >
              <Mail className="size-4" />
            </a>
          </nav>
        </div>
        <hr className="my-6 border-border" />
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Kieyara Ramdhani. All Rights Reserved. Nemo uses AI — always review generated
          content before acting on it.
        </p>
      </div>
    </footer>
  );
}
