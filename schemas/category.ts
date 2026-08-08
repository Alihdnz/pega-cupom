import { z } from "zod";

export const categorySchema = z.object({
  storeId: z.string().min(1, "Selecione uma loja."),

  name: z
    .string()
    .min(2, "Informe o nome."),

  slug: z
    .string()
    .min(2, "Informe o slug."),

  color: z.string().optional(),

  isActive: z.boolean(),
});

export type CategoryFormData = z.infer<
  typeof categorySchema
>;