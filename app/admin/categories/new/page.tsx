import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";

import { CategoryForm } from "@/components/categories/categories-form";

export default async function NewCategoryPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const stores =
    session.user.role === "SUPER_ADMIN"
      ? await prisma.store.findMany({
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: "asc",
          },
        })
      : await prisma.store.findMany({
          where: {
            users: {
              some: {
                userId: session.user.id,
              },
            },
          },
          select: {
            id: true,
            name: true,
          },
        });

  return (
    <PageContainer>
      <PageHeader
        title="New Category"
        description="Create a new category."
      />

      <div className="mt-6">
        <CategoryForm
          stores={stores}
          isSuperAdmin={
            session.user.role === "SUPER_ADMIN"
          }
        />
      </div>
    </PageContainer>
  );
}