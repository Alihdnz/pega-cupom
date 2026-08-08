"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  categorySchema,
  CategoryFormData,
} from "@/schemas/category";

import { createCategory } from "@/actions/category";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormValues {
  id?: string;

  storeId: string;

  name: string;

  slug: string;

  color: string | null;

  isActive: boolean;
}

interface Props {
  stores: Pick<Store, "id" | "name">[];

  isSuperAdmin: boolean;

  category?: CategoryFormValues;
}

export function CategoryForm({
  stores,
  isSuperAdmin,
  category,
}: Props) {
  const router = useRouter();

  const [loading, startTransition] =
    useTransition();

  const {
  register,
  control,
  handleSubmit,
  setValue,
  formState: { errors },
  } = useForm<CategoryFormData>({

    
    resolver: zodResolver(categorySchema),

    defaultValues: {
  storeId: category?.storeId ?? "",

  name: category?.name ?? "",

  slug: category?.slug ?? "",

  color: category?.color ?? "",

  isActive: category?.isActive ?? true,
},
  });

  useEffect(() => {
  if (!isSuperAdmin && stores.length) {
    setValue("storeId", stores[0].id);
  }
}, [isSuperAdmin, stores, setValue]);

  function onSubmit(data: CategoryFormData) {
    startTransition(async () => {
      try {
        await createCategory(data);

        toast.success(
          "Categoria criada."
        );

        router.push("/admin/categories");
        router.refresh();
      } catch {
        toast.error(
          "Erro ao criar categoria."
        );
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

            {isSuperAdmin && (
  <div className="space-y-2">

    <Label>Loja</Label>

    <Controller
      control={control}
      name="storeId"
      render={({ field }) => (

        <Select
          value={field.value}
          onValueChange={field.onChange}
        >

          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma loja" />
          </SelectTrigger>

          <SelectContent>

            {stores.map((store) => (

              <SelectItem
                key={store.id}
                value={store.id}
              >
                {store.name}
              </SelectItem>

            ))}

          </SelectContent>

        </Select>

      )}
    />

    {errors.storeId && (
      <p className="text-sm text-destructive">
        {errors.storeId.message}
      </p>
    )}

  </div>
)}
          <div className="space-y-2">
            <Label>Nome</Label>

            <Input
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>

            <Input
              {...register("slug")}
            />
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>

            <Input
              placeholder="#2563eb"
              {...register("color")}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Salvando..."
              : "Salvar Categoria"}
          </Button>

        </form>

      </CardContent>
    </Card>
  );
}