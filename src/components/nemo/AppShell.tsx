import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, LogIn, Moon, Search, Sun, User } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { NemoLogo } from "./NemoLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { NEMO_NAV } from "@/lib/nemo-tools";
import { supabase } from "@/integrations/supabase/client";

function NemoSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 px-3 py-4">
          <NemoLogo className="animate-float" />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Nemo</span>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NEMO_NAV.map((item) => {
                const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link to={item.to} className="transition-colors">
                        <item.icon className="size-4 transition-transform group-hover/menu-item:scale-110" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setEmail(data.session?.user.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/40 px-3 backdrop-blur-xl sm:px-5">
      <SidebarTrigger aria-label="Toggle sidebar" />
      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Nemo workspace..."
          aria-label="Search workspace"
          className="glass h-10 rounded-xl border-border pl-9"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "ocean" ? "Switch to daylight theme" : "Switch to ocean theme"}
        >
          {theme === "ocean" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        {email ? (
          <span
            className="flex size-9 items-center justify-center rounded-xl border border-border surface-gradient text-sm font-semibold text-primary-foreground"
            title={email}
          >
            {email.slice(0, 1).toUpperCase()}
          </span>
        ) : (
          <Button asChild variant="outline" size="sm" className="rounded-xl">
            <Link to="/auth">
              <LogIn className="size-4" /> Sign in
            </Link>
          </Button>
        )}
        <Button asChild variant="ghost" size="icon" aria-label="Account settings">
          <Link to="/settings">
            <User className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}

/** Dashboard chrome: collapsible sidebar, top navigation and main workspace. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <NemoSidebar />
        <SidebarInset className="bg-transparent">
          <TopBar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
