"use client";

import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SchedulesForm } from "@/lib/zod/schemas/contribute/schedules";
import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

type ScheduleFieldProps = {
  dayOfWeek: keyof SchedulesForm;
  label: string;
  timeSlots: string[];
};

export function ScheduleField({
  dayOfWeek,
  label,
  timeSlots,
}: ScheduleFieldProps) {
  const form = useFormContext<SchedulesForm>();

  const scheduleField = form.watch(dayOfWeek);

  const {
    fields: schedules,
    append: appendScheduleField,
    remove: removeScheduleField,
  } = useFieldArray({
    control: form.control,
    name: `${dayOfWeek}.schedules`,
  });

  function onToggleDayOfWeek(checked: boolean) {
    form.setValue(`${dayOfWeek}.isActive`, checked);

    if (checked) {
      onAddSchedule();
    } else {
      form.setValue(`${dayOfWeek}.schedules`, []);
    }
  }

  function onAddSchedule() {
    if (!scheduleField.isActive) {
      form.setValue(`${dayOfWeek}.isActive`, true);
    }

    const lastScheduleTime =
      scheduleField.schedules[scheduleField.schedules.length - 1]?.start ??
      "04:30";

    const lastScheduleTimeSlot =
      timeSlots.find((time) => time === lastScheduleTime) ?? "00:00";

    let defaultScheduleTime =
      timeSlots[timeSlots.indexOf(lastScheduleTimeSlot) + 15];

    if (
      lastScheduleTimeSlot === timeSlots[timeSlots.length - 1] ||
      !defaultScheduleTime
    )
      defaultScheduleTime = timeSlots[0];

    appendScheduleField({
      start: defaultScheduleTime,
    });
  }

  function onRemoveSchedule(fieldIndex: number) {
    if (scheduleField.schedules.length === 1) {
      form.setValue(`${dayOfWeek}.isActive`, false);
    }

    removeScheduleField(fieldIndex);
  }

  return (
    <div className="grid grid-cols-3 justify-between gap-4">
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
                    onCheckedChange={onToggleDayOfWeek}
                  />
                </FormControl>
                <FormLabel className="font-medium">{label}</FormLabel>
              </FormItem>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex items-center justify-center w-full">
        {scheduleField.isActive ? (
          <div className="flex flex-col gap-4 w-full">
            {schedules.map((schedule, index) => (
              <div key={schedule.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`${dayOfWeek}.schedules.${index}.start`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger showIcon={false}>
                            <SelectValue placeholder="00:00" />
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

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="flex-shrink-0"
                        onClick={() => onRemoveSchedule(index)}
                        type="button"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remover horário</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground leading-none">
            Indisponível.
          </span>
        )}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="ml-auto"
              onClick={onAddSchedule}
              type="button"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar horário</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
