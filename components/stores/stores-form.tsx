"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { toast } from "sonner";

import { createStore, updateStore } from "@/actions/store";
import {
  storeSchema,
  type StoreFormData,
} from "@/schemas/store";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StoreFormProps {
  store?: Store;
}

export function StoreForm({
  store,
}: StoreFormProps) {
  const router = useRouter();

  const [loading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),

    defaultValues: {
      name: store?.name ?? "",
      slug: store?.slug ?? "",
      website: store?.website ?? "",
      logoUrl: store?.logoUrl ?? "",
      isActive: store?.isActive ?? true,
    },
  });

  function onSubmit(data: StoreFormData) {
    startTransition(async () => {
      try {
        if (store) {
          await updateStore(store.id, data);

          toast.success("Loja atualizada com sucesso.");
        } else {
          await createStore(data);

          toast.success("Loja cadastrada com sucesso.");
        }

        router.push("/admin/stores");
        router.refresh();

      } catch {
        toast.error("Ocorreu um erro.");
      }
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div className="space-y-2">
            <Label>Nome</Label>

            <Input {...register("name")} />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>

            <Input {...register("slug")} />

            {errors.slug && (
              <p className="text-sm text-destructive">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Website</Label>

            <Input {...register("website")} />

            {errors.website && (
              <p className="text-sm text-destructive">
                {errors.website.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Logo URL</Label>

            <Input {...register("logoUrl")} />

            {errors.logoUrl && (
              <p className="text-sm text-destructive">
                {errors.logoUrl.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Salvando..."
              : store
                ? "Atualizar Loja"
                : "Cadastrar Loja"}
          </Button>

        </form>

      </CardContent>
    </Card>
  );
}