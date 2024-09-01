"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { MapPin, MapPinned } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useQuery } from "@tanstack/react-query";
import { findPlaces } from "@/services/places/find-places";
import { useEffect, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type TravelSearch = {
  destination: string;
  origin?: string;
  date?: Date;
  originSearch?: string;
  destinationSearch?: string;
};

export function TravelSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const originId = searchParams.get("origin");
  const destinationId = searchParams.get("destination");
  const date = searchParams.get("date");

  const form = useForm<TravelSearch>({
    defaultValues: {
      destination: "",
      origin: "",
      date: undefined,
      originSearch: "",
      destinationSearch: "",
    },
  });

  const origin = form.watch("origin");
  const destination = form.watch("destination");
  const originSearch = form.watch("originSearch");
  const destinationSearch = form.watch("destinationSearch");

  const debouncedOriginSearch = useDebounce(originSearch, 300);
  const debouncedDestinationSearch = useDebounce(destinationSearch, 300);

  const { data: originPlacesResult, isLoading: isOriginLoading } = useQuery({
    queryKey: [
      "origin-places",
      { page: 1, pageSize: 50, search: debouncedOriginSearch },
    ],
    queryFn: () =>
      findPlaces({
        search: debouncedOriginSearch,
      }),
  });

  const { data: destinationPlacesResult, isLoading: isDestinationLoading } =
    useQuery({
      queryKey: [
        "destination-places",
        { page: 1, pageSize: 50, search: debouncedDestinationSearch },
      ],
      queryFn: () =>
        findPlaces({
          search: debouncedDestinationSearch,
        }),
    });

  const originPlaces = useMemo(() => {
    const places = originPlacesResult?.result ?? [];

    const placesWithoutDestination = places.filter(
      (place) => place.id !== destination
    );

    const placesOptions = placesWithoutDestination.map((place) => ({
      value: place.id,
      label: `${place.name ?? place.city}-${place.state}`,
    }));

    return placesOptions;
  }, [destination, originPlacesResult?.result]);

  const destinationPlaces = useMemo(() => {
    const places = destinationPlacesResult?.result ?? [];

    const placesWithoutOrigin = places.filter((place) => place.id !== origin);

    const placesOptions = placesWithoutOrigin.map((place) => ({
      value: place.id,
      label: `${place.name ?? place.city}-${place.state}`,
    }));

    return placesOptions;
  }, [destinationPlacesResult?.result, origin]);

  function onSubmit({ destination, origin, date }: TravelSearch) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("destination", destination);

    if (origin) {
      params.set("origin", origin);
    }

    if (date) {
      params.set("date", date.toISOString());
    }

    router.push(pathname + "?" + params);
  }

  useEffect(() => {
    if (originId) {
      form.setValue("origin", originId);
    }

    if (destinationId) {
      form.setValue("destination", destinationId);
    }

    if (date) {
      form.setValue("date", new Date(date));
    }
  }, [form, originId, destinationId, date]);

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
                  options={originPlaces}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Selecione o local de partida..."
                  onSearchChange={(value) =>
                    form.setValue("originSearch", value)
                  }
                  search={form.watch("originSearch")}
                  searchPlaceholder="Pesquisar o local de partida..."
                  isLoading={isOriginLoading}
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
                  options={destinationPlaces}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Selecione o local de destino..."
                  onSearchChange={(value) =>
                    form.setValue("destinationSearch", value)
                  }
                  search={form.watch("destinationSearch")}
                  searchPlaceholder="Pesquisar o local de destino..."
                  isLoading={isDestinationLoading}
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

        <Button className="w-full shadow-2xl" type="submit">
          Pesquisar viagens
        </Button>
      </form>
    </Form>
  );
}
