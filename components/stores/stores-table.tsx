"use client";

import Link from "next/link";

import { Pencil, Trash2 } from "lucide-react";

import { Store } from "@prisma/client";

import { Button } from "@/components/ui/button";

import { StatusBadge } from "@/components/shared/status-badge";
import { DeleteDialog } from "@/components/shared/dialogs/delete-dialog";

interface StoresTableProps {
  stores: Store[];
}

export function StoresTable({
  stores,
}: StoresTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Loja
            </th>

            <th className="px-6 py-3 text-left text-sm font-medium">
              Site
            </th>

            <th className="px-6 py-3 text-left text-sm font-medium">
              Status
            </th>

            <th className="w-36 px-6 py-3 text-right text-sm font-medium">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr
              key={store.id}
              className="border-b last:border-none"
            >
              <td className="px-6 py-4">
                <div className="font-medium">
                  {store.name}
                </div>

                <div className="text-sm text-muted-foreground">
                  {store.slug}
                </div>
              </td>

              <td className="px-6 py-4">
                {store.website ?? "-"}
              </td>

              <td className="px-6 py-4">
                <StatusBadge active={store.isActive} />
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    render={
                      <Link
                        href={`/admin/stores/${store.id}/edit`}
                      />
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <DeleteDialog
                    trigger={
                      <Button
                        variant="destructive"
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title="Excluir loja"
                    description={`Deseja realmente excluir "${store.name}"?`}
                    onDelete={async () => {
                      console.log(store.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}