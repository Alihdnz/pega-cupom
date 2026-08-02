import { auth } from "@/auth";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Não autenticado.");
  }

  return session;
}

export async function isSuperAdmin() {
  const session = await requireUser();

  return session.user.role === "SUPER_ADMIN";
}