import {
  BarChart3,
  Bot,
  CalendarDays,
  CircleHelp,
  FileText,
  LayoutDashboard,
  MailCheck,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NemoTool = {
  slug: string;
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** The five AI applications that make up the Nemo workspace. */
export const NEMO_TOOLS: NemoTool[] = [
  {
    slug: "email",
    to: "/email",
    title: "Smart Emails",
    description: "Create polished professional emails instantly.",
    icon: MailCheck,
  },
  {
    slug: "meeting",
    to: "/meeting",
    title: "Meeting Notes",
    description: "Summarise meetings into clear action points.",
    icon: FileText,
  },
  {
    slug: "tasks",
    to: "/tasks",
    title: "Task Planner",
    description: "Plan your day and week with prioritised tasks.",
    icon: CalendarDays,
  },
  {
    slug: "research",
    to: "/research",
    title: "Research Assistant",
    description: "Generate research summaries and business insights.",
    icon: Search,
  },
  {
    slug: "chat",
    to: "/chat",
    title: "AI Assistant",
    description: "Chat with your intelligent workplace assistant.",
    icon: Bot,
  },
];

export const NEMO_NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email", icon: MailCheck },
  { to: "/meeting", label: "Meeting Notes", icon: FileText },
  { to: "/tasks", label: "Task Planner", icon: CalendarDays },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "AI Assistant", icon: Bot },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help", icon: CircleHelp },
];
