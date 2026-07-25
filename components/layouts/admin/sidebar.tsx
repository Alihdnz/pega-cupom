import { Logo } from "./logo";
import { NavItem } from "./nav-item";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <NavItem href="/admin" label="Home" icon="home" />
        <NavItem href="/admin/stores" label="Stores" icon="store" />
        <NavItem href="/admin/categories" label="Categories" icon="categories" />
        <NavItem href="/admin/offers" label="Offers" icon="ticket" />
        <NavItem href="/admin/groups" label="Groups" icon="users" />
        <NavItem href="/admin/dispatches" label="Dispatches" icon="send" />
        <NavItem href="/admin/settings" label="Settings" icon="settings" />
      </nav>

      <div className="border-t p-4 text-xs text-muted-foreground">
        v0.1.0
      </div>
    </aside>
  );
}