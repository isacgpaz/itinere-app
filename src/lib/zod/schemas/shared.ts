import { z } from "..";

export const paginationSchema = z.object({
  page: z.coerce
    .number({
      required_error: "A página é obrigatória.",
      invalid_type_error: "A página deve ser um número.",
    })
    .int("A página deve ser um número inteiro")
    .positive("A página deve ser um número positivo.")
    .default(1)
    .transform((page) => page - 1),
  pageSize: z.coerce
    .number({
      required_error: "O número de linhas por página é obrigatório.",
      invalid_type_error: "O número de linhas por página deve ser um número.",
    })
    .int("O número de linhas por página deve ser um número inteiro")
    .positive("O número de linhas por página deve ser um número positivo.")
    .default(10),
});

export const searchSchema = z.object({
  search: z
    .string({
      invalid_type_error: "A pesquisa deve ser do tipo string.",
    })
    .optional(),
});
