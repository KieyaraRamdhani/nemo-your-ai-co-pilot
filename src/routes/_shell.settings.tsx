import { createFileRoute } from "@tanstack/react-router";
import { Moon, ShieldCheck, Sun, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Workspace Settings | Nemo" },
      {
        name: "description",
        content: "Manage your Nemo appearance, assistant preferences, account and local data.",
      },
      { property: "og:title", content: "Workspace Settings | Nemo" },
      { property: "og:description", content: "Appearance, preferences and account controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  return (
    <div className="mx-auto max-w-3xl animate-rise space-y-6">
      <header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Tune Nemo to the way you work.</p>
      </header>

      <section className="glass space-y-4 p-6" aria-labelledby="appearance">
        <h2 id="appearance" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Appearance
        </h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="theme-toggle">Ocean theme</Label>
            <p className="text-xs text-muted-foreground">
              Deep ocean dark mode, or a brighter daylight surface.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="size-4 text-muted-foreground" />
            <Switch
              id="theme-toggle"
              checked={theme === "ocean"}
              onCheckedChange={(checked) => setTheme(checked ? "ocean" : "daylight")}
            />
            <Moon className="size-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="compact">Compact density</Label>
            <p className="text-xs text-muted-foreground">Tighter spacing across workspace pages.</p>
          </div>
          <Switch id="compact" checked={compact} onCheckedChange={setCompact} />
        </div>
      </section>

      <section className="glass space-y-3 p-6" aria-labelledby="account">
        <h2 id="account" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Account
        </h2>
        <p className="text-sm">{email ?? "You are not signed in."}</p>
        {email ? (
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success("Signed out");
              setEmail(null);
            }}
          >
            Sign out
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            Sign in from the assistant page to save conversations.
          </p>
        )}
      </section>

      <section className="glass space-y-3 p-6" aria-labelledby="data">
        <h2 id="data" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Local data
        </h2>
        <p className="text-sm text-muted-foreground">
          Clears preferences stored in this browser. Saved conversations are not affected.
        </p>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => {
            window.localStorage.removeItem("nemo-theme");
            toast.success("Local preferences cleared");
          }}
        >
          <Trash2 className="size-4" /> Clear local preferences
        </Button>
      </section>

      <section className="glass flex items-start gap-3 p-6">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Nemo never asks for API keys in the browser. All AI requests run on the server with
          securely stored credentials.
        </p>
      </section>
    </div>
  );
}
