"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { ArrowUpDown, MapPin, MapPinned } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useQuery } from "@tanstack/react-query";
import { findPlaces } from "@/services/places/find-places";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { findTravels } from "@/services/travels/find-travels";
import { queryClient } from "@/lib/query";

type TravelSearch = {
  destination?: string;
  origin?: string;
  date?: Date;
  originSearch?: string;
  destinationSearch?: string;
};

export function TravelSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const originId = params.get("origin");
  const destinationId = params.get("destination");
  const date = params.get("date");

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

  const [isLoading, setIsLoading] = useState(false);

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

  function updateParams(name: string, value?: string) {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params}`, {
      scroll: false,
    });
  }

  function swipeLocations() {
    form.setValue("origin", destination);
    form.setValue("destination", origin);
  }

  async function onSubmit({ destination, origin, date }: TravelSearch) {
    updateParams("origin", origin);
    updateParams("destination", destination);
    updateParams("date", date?.toISOString());

    setIsLoading(true);

    await queryClient
      .ensureQueryData({
        queryKey: [
          "travels",
          {
            page: 1,
            pageSize: 15,
            destinationId: destination,
            originId: origin,
            date: date?.toISOString(),
          },
        ],
        queryFn: () =>
          findTravels({
            destinationId: destination!,
            originId: origin!,
          }),
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full relative"
      >
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={originPlaces}
                  onChange={(origin) => {
                    field.onChange(origin);
                    // updateParams("origin", origin);
                  }}
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

        <Button
          size="icon"
          className="rounded-full absolute top-4 right-10"
          onClick={swipeLocations}
          type="button"
        >
          <ArrowUpDown className="w-4 h-4" />
        </Button>

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  options={destinationPlaces}
                  onChange={(destination) => {
                    field.onChange(destination);
                    // updateParams("destination", destination);
                  }}
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
                <DatePicker
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    // updateParams("date", date?.toISOString());
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="w-full shadow-2xl"
          type="submit"
          isLoading={isLoading}
        >
          Pesquisar viagens
        </Button>
      </form>
    </Form>
  );
}
