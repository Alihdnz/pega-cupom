import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { Sidebar } from "@/components/layouts/admin/sidebar";
import { Topbar } from "@/components/layouts/admin/topbar";

interface LayoutProps {
children: ReactNode;
}

export default async function AdminLayout({
children,
}: LayoutProps) {
const session = await auth();

if (!session) {
  redirect("/login");
}

return (
  <div className="flex min-h-screen bg-muted/30">
    <Sidebar />

    <main className="flex flex-1 flex-col">
      <Topbar />

      <div className="flex-1 p-6">
        {children}
      </div>
    </main>
  </div>
);
}