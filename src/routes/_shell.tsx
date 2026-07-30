import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/nemo/AppShell";

/** Pathless layout that wraps every workspace page in the Nemo dashboard chrome. */
export const Route = createFileRoute("/_shell")({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
