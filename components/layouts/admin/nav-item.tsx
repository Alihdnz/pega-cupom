"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Home,
  Store,
  Tags,
  Ticket,
  Users,
  Send,
  Settings,
} from "lucide-react";

const icons = {
  home: Home,
  store: Store,
  categories: Tags,
  ticket: Ticket,
  users: Users,
  send: Send,
  settings: Settings,
} as const;

interface NavItemProps {
  href: string;
  label: string;
  icon: keyof typeof icons;
}

export function NavItem({
  href,
  label,
  icon,
}: NavItemProps) {
  const pathname = usePathname();
  const Icon = icons[icon];

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />

      <span>{label}</span>
    </Link>
  );
}