import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isSuperAdmin } from "@/lib/permissions";

import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { CategoriesTable } from "@/components/categories/categories-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CategoriesPage() {
  const session = await auth();

  const superAdmin = await isSuperAdmin();

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      color: true,
      isActive: true,
      createdAt: true,

      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    where: superAdmin
      ? {}
      : {
          store: {
            users: {
              some: {
                userId: session!.user.id,
              },
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
    title="Categories"
    description="Gerencie as categorias das lojas."
    />

    <div className="mt-6 flex justify-end">
    <Button
  nativeButton={false}
  render={
    <Link href="/admin/categories/new" />
  }
>
  Nova Categoria
</Button>
    </div>

    <div className="mt-6">
    <CategoriesTable categories={categories} />
    </div>

      <CategoriesTable
        categories={categories}
      />
    </PageContainer>
  );
}