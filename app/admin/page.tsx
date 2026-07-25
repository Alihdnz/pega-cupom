import { auth } from "@/auth";
import { redirect } from "next/navigation";

import {
  Building2,
  MousePointerClick,
  Tags,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Bem-vindo ao painel administrativo do PegaCupom.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Ofertas"
          value={125}
          icon={Tags}
          description="Ofertas cadastradas"
        />

        <StatCard
          title="Lojas"
          value={32}
          icon={Building2}
          description="Lojas parceiras"
        />

        <StatCard
          title="Cliques Hoje"
          value="2.841"
          icon={MousePointerClick}
          description="Últimas 24 horas"
        />

        <StatCard
          title="Usuários"
          value={487}
          icon={Users}
          description="Usuários ativos"
        />

      </div>

    </div>
  );
}