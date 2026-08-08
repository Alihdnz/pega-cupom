import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getAccessibleStore(
  storeId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado.");
  }

  const store = await prisma.store.findFirst({
    where:
      session.user.role === "SUPER_ADMIN"
        ? {
            id: storeId,
          }
        : {
            id: storeId,

            users: {
              some: {
                userId: session.user.id,
              },
            },
          },
  });

  if (!store) {
    throw new Error("Loja não encontrada.");
  }

  return store;
}