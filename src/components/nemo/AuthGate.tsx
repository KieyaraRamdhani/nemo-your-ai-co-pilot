import { Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Shown when a signed-out visitor opens a page that stores data in their account. */
export function AuthGate() {
  return (
    <div className="glass-panel mx-auto max-w-md p-10 text-center">
      <LockKeyhole className="mx-auto size-8 text-primary" />
      <h1 className="mt-4 text-xl font-semibold">Sign in to use the assistant</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Conversations are saved securely to your Nemo account so you can pick up where you left off.
      </p>
      <Button asChild className="btn-shine mt-6 rounded-xl">
        <Link to="/auth">Sign in or create an account</Link>
      </Button>
    </div>
  );
}
