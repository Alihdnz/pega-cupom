import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { StoreForm } from "@/components/stores/stores-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStorePage({
  params,
}: Props) {
  const { id } = await params;

  const session = await auth();

  const store = await prisma.store.findFirst({
    where: {
      id,
      users: {
        some: {
          userId: session!.user.id,
        },
      },
    },
  });

  if (!store) {
    notFound();
  }

  return (
    <PageContainer>
        
      <PageHeader
        title="Editar Loja"
        description="Atualize as informações da loja."
      />

      <StoreForm store={store} />
    </PageContainer>
  );
}