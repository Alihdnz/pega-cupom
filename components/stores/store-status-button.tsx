"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { toggleStoreStatus } from "@/actions/store";

import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  active: boolean;
}

export function StoreStatusButton({
  id,
  active,
}: Props) {
  const [loading, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await toggleStoreStatus(id);

        toast.success(
          active
            ? "Loja desativada."
            : "Loja ativada."
        );
      } catch {
        toast.error("Erro ao alterar o status.");
      }
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={handleClick}
    >
      {active ? "Desativar" : "Ativar"}
    </Button>
  );
}