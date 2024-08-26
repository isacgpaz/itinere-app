import { z } from "@/lib/zod";
import { paginationSchema } from "./shared";

const steps = z.array(
  z.object({
    locationId: z
      .string({
        invalid_type_error: "Local de parada inválido.",
        required_error: "Local de parada é obrigatório.",
      })
      .min(1, "Local de parada é obrigatório.")
      .trim(),
    durationTime: z
      .number({ invalid_type_error: "Duração da parada deve ser um número." })
      .int({
        message: "Duração da parada deve ser um número inteiro.",
      })
      .positive({
        message: "Duração da parada deve ser um número positivo.",
      })
      .optional(),
  })
);

export const createTravelBodySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nome inválido.",
    })
    .trim()
    .optional(),
  description: z
    .string({
      invalid_type_error: "Descrição inválida.",
    })
    .trim()
    .optional(),
  steps,
  driverId: z
    .string({
      invalid_type_error: "Motorista inválido.",
      required_error: "Motorista é obrigatório.",
    })
    .min(1, "Motorista é obrigatório.")
    .trim(),
});

export const findTravelsSearchParamsSchema = z
  .object({
    originId: z
      .string({
        invalid_type_error: "Origem inválida.",
        required_error: "Origem é obrigatória.",
      })
      .trim(),
    destinationId: z
      .string({
        invalid_type_error: "Destino inválido.",
        required_error: "Destino é obrigatório.",
      })
      .trim(),
  })
  .merge(paginationSchema);
