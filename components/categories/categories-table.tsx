import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  isActive: boolean;
  createdAt: Date;

  store: {
    id: string;
    name: string;
  };
}

interface Props {
  categories: CategoryRow[];
}

export function CategoriesTable({
  categories,
}: Props) {
  return (
    <div className="rounded-lg border">

      <table className="w-full">

        <thead className="border-b bg-muted/40">

          <tr>

            <th className="px-6 py-3 text-left">
              Nome
            </th>

            <th className="px-6 py-3 text-left">
              Loja
            </th>

            <th className="px-6 py-3 text-left">
              Status
            </th>

            <th className="px-6 py-3 text-right">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-b"
            >

              <td className="px-6 py-4">

                <div className="font-medium">
                  {category.name}
                </div>

                <div className="text-sm text-muted-foreground">
                  {category.slug}
                </div>

              </td>

              <td className="px-6 py-4">
                {category.store.name}
              </td>

              <td className="px-6 py-4">
                {category.isActive
                  ? "Ativa"
                  : "Inativa"}
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-end gap-2">

                  <Button
                    variant="outline"
                    size="icon"
                    render={
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                      />
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}