"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeSlots } from "@/constants/time-slots";
import { SchedulesForm } from "@/lib/zod/schemas/contribute/schedules";
import { useFormContext } from "react-hook-form";

type ScheduleFieldProps = {
  dayOfWeek: keyof SchedulesForm;
  label: string;
};

export function ScheduleField({ dayOfWeek, label }: ScheduleFieldProps) {
  const form = useFormContext<SchedulesForm>();

  const scheduleField = form.watch(dayOfWeek);

  return (
    <div className="grid grid-cols-2 justify-between gap-4">
      <FormField
        control={form.control}
        name={`${dayOfWeek}.isActive`}
        render={({ field }) => (
          <FormItem className="mt-3">
            <FormControl>
              <FormItem
                key={dayOfWeek}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        form.setValue(`${dayOfWeek}.schedule.start`, "");
                        form.setValue(`${dayOfWeek}.schedule.end`, "");
                      }

                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-medium">{label}</FormLabel>
              </FormItem>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex items-center justify-end w-full">
        {scheduleField.isActive ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name={`${dayOfWeek}.schedule.start`}
                render={({ field }) => (
                  <FormItem className="w-28">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Partida" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="h-9 flex items-center">
                <span>-</span>
              </div>

              <FormField
                control={form.control}
                name={`${dayOfWeek}.schedule.end`}
                render={({ field }) => (
                  <FormItem className="w-28">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chegada" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            Selecione ao lado para adicionar horários.
          </span>
        )}
      </div>
    </div>
  );
}
