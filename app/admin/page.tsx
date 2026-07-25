import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Bem-vindo ao painel!
      </h1>

      <p className="mt-4">
        Você está autenticado.
      </p>
    </main>
  );
}