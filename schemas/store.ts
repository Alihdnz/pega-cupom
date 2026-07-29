import { z } from "zod";

export const storeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .max(100),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug inválido."),

  website: z
    .string()
    .trim()
    .url("URL inválida.")
    .optional()
    .or(z.literal("")),

  logoUrl: z
    .string()
    .trim()
    .url("URL inválida.")
    .optional()
    .or(z.literal("")),

  isActive: z.boolean().default(true),
});

export type StoreFormData = z.infer<typeof storeSchema>;