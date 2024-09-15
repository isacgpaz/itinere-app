import { z } from "../..";

const scheduleSchema = z
  .object({
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .superRefine(({ end, start }, ctx) => {
    if ((start && !end) || (end && !start)) {
      return ctx.addIssue({
        path: start ? ["end"] : ["start"],
        code: "invalid_string",
        validation: "time",
        message: "Hora inválida.",
      });
    }
  });

export const schedulesSchema = z.object({
  sunday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
  monday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
  tuesday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
  wednesday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
  thursday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
  friday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
  saturday: z.object({
    schedule: scheduleSchema.optional(),
    isActive: z.boolean(),
  }),
});

export type SchedulesForm = z.infer<typeof schedulesSchema>;
