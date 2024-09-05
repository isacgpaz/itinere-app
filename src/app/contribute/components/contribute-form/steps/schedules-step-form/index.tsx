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
import { generateTimeSlots } from "@/lib/generate-time-slots";

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
  schedules: [{ start: "07:00" }],
  isActive: true,
};

const weekendFieldDefaultValues = {
  schedules: [],
  isActive: false,
};

const timeSlots: string[] = generateTimeSlots();

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
      tuesday: dayFieldDefaultValue,
      wednesday: dayFieldDefaultValue,
      thursday: dayFieldDefaultValue,
      friday: dayFieldDefaultValue,
      saturday: weekendFieldDefaultValues,
    },
  });

  function onSubmit(data: SchedulesForm) {
    console.log(data);
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
              timeSlots={timeSlots}
            />
          ))}
        </CardContent>

        <CardFooter>
          <Button className="ml-auto">Avançar</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
