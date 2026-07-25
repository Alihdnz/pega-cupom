import { auth } from "@/auth";

import { UserMenu } from "./user-menu";

export async function Topbar() {
  const session = await auth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Painel Administrativo
        </h1>

        <p className="text-sm text-muted-foreground">
          Gerencie sua plataforma.
        </p>
      </div>

      <UserMenu
        name={session?.user?.name}
        email={session?.user?.email}
      />
    </header>
  );
}