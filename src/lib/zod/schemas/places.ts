import { z } from "@/lib/zod";
import { paginationSchema, searchSchema } from "./shared";
import { brazilianStates } from "@/constants/brazilian-states";

const brazilianStatesValues = brazilianStates.map((state) => state.value);

export const createPlaceBodySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nome inválido.",
    })
    .trim()
    .optional(),
  city: z
    .string({
      invalid_type_error: "Cidade inválida.",
    })
    .trim(),
  state: z
    .string()
    .length(2, "Sigla inválida.")
    .refine(
      (state) => brazilianStatesValues.includes(state),
      "Estado inválido."
    ),
});

export const findPlacesSearchParamsSchema =
  paginationSchema.merge(searchSchema);
