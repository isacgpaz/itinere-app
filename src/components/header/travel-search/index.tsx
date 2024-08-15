"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { MapPin, MapPinned } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

type TravelSearch = {
  destination: string;
  origin?: string;
  date?: Date;
};

export function TravelSearch() {
  const form = useForm<TravelSearch>({
    defaultValues: {
      destination: "",
      origin: "",
      date: undefined,
    },
  });

  const originOptions: any[] = [];
  const destinationOptions: any[] = [];

  function onSubmit({ destination, origin, date }: TravelSearch) {
    console.log(destination, origin, date);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={originOptions}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Selecione o local de partida..."
                  searchPlaceholder="Pesquisar o local de partida..."
                  icon={MapPin}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={destinationOptions}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Selecione o local de destino..."
                  searchPlaceholder="Pesquisar o local de destino..."
                  icon={MapPinned}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="bg-emerald-900 hover:bg-emerald-950 w-full shadow-2xl"
          type="submit"
        >
          Pesquisar viagens
        </Button>
      </form>
    </Form>
  );
}
