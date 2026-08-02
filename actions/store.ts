"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { storeSchema } from "@/schemas/store";
import { revalidatePath } from "next/cache";

export async function createStore(data: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado.");
  }
  console.log(session.user.id);

  const currentUser = await prisma.user.findUnique({
  where: {
    id: session.user.id,
  },
});

console.log(currentUser);

  const values = storeSchema.parse(data);

  const exists = await prisma.store.findUnique({
    where: {
      slug: values.slug,
    },
  });

  if (exists) {
    throw new Error("Já existe uma loja utilizando este slug.");
  }

  await prisma.store.create({
    data: {
      name: values.name,
      slug: values.slug,
      website: values.website || null,
      logoUrl: values.logoUrl || null,

      isActive: true,

      users: {
        create: {
          userId: session.user.id,
          isOwner: true,
        },
      },
    },
  });

  revalidatePath("/admin/stores");
}

export async function updateStore(
  id: string,
  data: unknown
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado.");
  }

  const values = storeSchema.parse(data);

  const store = await prisma.store.findFirst({
    where: {
      id,
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

  await prisma.store.update({
    where: {
      id,
    },
    data: {
      name: values.name,
      slug: values.slug,
      website: values.website || null,
      logoUrl: values.logoUrl || null,
      isActive: values.isActive,
    },
  });

  revalidatePath("/admin/stores");
}

export async function deleteStore(
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado.");
  }

  const store = await prisma.store.findFirst({
    where: {
      id,
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

  await prisma.store.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/stores");
}

export async function toggleStoreStatus(
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado.");
  }

  const store = await prisma.store.findFirst({
    where: {
      id,
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

  await prisma.store.update({
    where: {
      id,
    },
    data: {
      isActive: !store.isActive,
    },
  });

  revalidatePath("/admin/stores");
}
