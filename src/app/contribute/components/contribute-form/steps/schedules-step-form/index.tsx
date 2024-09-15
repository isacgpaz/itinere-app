import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScheduleField } from "./schedule-field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchedulesForm,
  schedulesSchema,
} from "@/lib/zod/schemas/contribute/schedules";
import { useMemo } from "react";

const daysOfWeek: { [key in keyof SchedulesForm]: string } = {
  sunday: "DOM",
  monday: "SEG",
  tuesday: "TER",
  wednesday: "QUA",
  thursday: "QUI",
  friday: "SEX",
  saturday: "SÁB",
};

const dayFieldDefaultValue = {
  schedule: {
    start: "07:00",
    end: "09:00",
  },
  isActive: true,
};

const weekendFieldDefaultValues = {
  isActive: false,
};

type SchedulesStepFormProps = {
  currentStep: number;
  goToNextStep: () => void;
  updateTravel: (travel: Partial<any>) => void;
};

export function SchedulesStepForm({
  currentStep,
  goToNextStep,
  updateTravel,
}: SchedulesStepFormProps) {
  const form = useForm<SchedulesForm>({
    resolver: zodResolver(schedulesSchema),
    defaultValues: {
      sunday: weekendFieldDefaultValues,
      monday: dayFieldDefaultValue,
      tuesday: weekendFieldDefaultValues,
      wednesday: weekendFieldDefaultValues,
      thursday: weekendFieldDefaultValues,
      friday: weekendFieldDefaultValues,
      saturday: weekendFieldDefaultValues,
    },
  });

  const schedules = form.watch();

  const enabledDays = useMemo(
    () =>
      Object.entries(schedules).filter(([_, dayOfWeek]) => dayOfWeek.isActive),
    [schedules]
  );

  const hasInvalidSchedules = useMemo(
    () =>
      enabledDays.some(
        ([_, dayOfWeek]) =>
          !dayOfWeek.schedule?.start && !dayOfWeek.schedule?.end
      ) || enabledDays.length === 0,
    [enabledDays]
  );

  function onSubmit(data: SchedulesForm) {
    updateTravel(data);
    goToNextStep();
  }

  if (currentStep !== 1) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <CardContent className="space-y-3 w-full">
          {Object.entries(daysOfWeek).map(([value, label]) => (
            <ScheduleField
              key={value}
              dayOfWeek={value as keyof SchedulesForm}
              label={label}
            />
          ))}
        </CardContent>

        <CardFooter>
          <Button className="ml-auto" disabled={hasInvalidSchedules}>
            Avançar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
