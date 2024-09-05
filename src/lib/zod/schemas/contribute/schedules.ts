import { z } from "../..";

const scheduleItemSchema = z.object({
  start: z.string(),
});

export const schedulesSchema = z.object({
  sunday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
  monday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
  tuesday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
  wednesday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
  thursday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
  friday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
  saturday: z.object({
    schedules: z.array(scheduleItemSchema),
    isActive: z.boolean(),
  }),
});

export type SchedulesForm = z.infer<typeof schedulesSchema>;
