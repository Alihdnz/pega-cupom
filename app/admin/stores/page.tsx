import Link from "next/link";

import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { Button } from "@/components/ui/button";

import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

import { StoresTable } from "@/components/stores/stores-table";
import { isSuperAdmin } from "@/lib/permissions";

export default async function StoresPage() {
  const session = await auth();

  const superAdmin = await isSuperAdmin();

  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      website: true,
      logoUrl: true,
      isActive: true,
      createdAt: true,
    },

    where: superAdmin
  ? {}
  : {
      users: {
        some: {
          userId: session!.user.id,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PageContainer>
      <PageHeader
        title="Lojas"
        description="Gerencie as lojas cadastradas."
        action={
          <Button
            render={<Link href="/admin/stores/new" />}
          >
            <Plus className="h-4 w-4" />

            Nova Loja
          </Button>
        }
      />

      {stores.length === 0 ? (
        <EmptyState
          title="Nenhuma loja cadastrada"
          description="Cadastre sua primeira loja para começar a criar ofertas."
          action={
            <Button
              render={<Link href="/admin/stores/new" />}
            >
              <Plus className="mr-2 h-4 w-4" />

              Nova Loja
            </Button>
          }
        />
      ) : (
        <StoresTable stores={stores} />
      )}
    </PageContainer>
  );
}