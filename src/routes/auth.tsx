import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { NemoLogo } from "@/components/nemo/NemoLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to Nemo" },
      {
        name: "description",
        content:
          "Sign in or create a Nemo account to save AI conversations and use the workplace assistant.",
      },
      { property: "og:title", content: "Sign in to Nemo" },
      { property: "og:description", content: "Access your Nemo AI productivity workspace." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/chat" });
    });
  }, [navigate]);

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    void navigate({ to: "/chat" });
  };

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/chat` },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created. You can start using Nemo now.");
    void navigate({ to: "/chat" });
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return toast.error("Google sign-in failed. Please try again.");
    if (result.redirected) return;
    void navigate({ to: "/chat" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-panel w-full max-w-md animate-rise p-8">
        <div className="flex items-center gap-3">
          <NemoLogo />
          <div>
            <h1 className="text-xl font-semibold">Welcome to Nemo</h1>
            <p className="text-sm text-muted-foreground">Your AI productivity workspace.</p>
          </div>
        </div>

        <Button variant="outline" onClick={() => void google()} className="mt-6 w-full rounded-xl">
          Continue with Google
        </Button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" />
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="w-full">
            <TabsTrigger value="signin" className="flex-1">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">
              Create account
            </TabsTrigger>
          </TabsList>

          {(["signin", "signup"] as const).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <form
                className="space-y-4 pt-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  void (tab === "signin" ? signIn() : signUp());
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor={`${tab}-email`}>Email</Label>
                  <Input
                    id={`${tab}-email`}
                    type="email"
                    required
                    maxLength={255}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${tab}-password`}>Password</Label>
                  <Input
                    id={`${tab}-password`}
                    type="password"
                    required
                    minLength={6}
                    maxLength={72}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" disabled={loading} className="btn-shine w-full rounded-xl">
                  {loading ? "Please wait..." : tab === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
