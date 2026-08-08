"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAccessibleStore } from "@/lib/store-access";

import { categorySchema } from "@/schemas/category";

export async function createCategory(
  data: unknown
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado.");
  }

  const values = categorySchema.parse(data);

  await getAccessibleStore(values.storeId);

  await prisma.category.create({
    data: {
      name: values.name,
      slug: values.slug,
      color: values.color || null,
      isActive: true,
      storeId: values.storeId,
    },
  });

  revalidatePath("/admin/categories");
}