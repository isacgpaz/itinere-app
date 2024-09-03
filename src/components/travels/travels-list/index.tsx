"use client";

import { useQuery } from "@tanstack/react-query";
import { TravelCard } from "../travel-card";
import { findTravels } from "@/services/travels/find-travels";
import { useSearchParams } from "next/navigation";
import { Loader2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { dayjs } from "@/lib/dayjs";

export function TravelsList() {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const originId = params.get("origin");
  const destinationId = params.get("destination");
  const date = params.get("date");

  const [page, setPage] = useState(1);

  const { data: travelsResponse, isLoading } = useQuery({
    queryKey: [
      "travels",
      {
        page,
        pageSize: 15,
        destinationId,
        originId,
        date: date ? dayjs(date).toISOString() : undefined,
      },
    ],
    queryFn: () =>
      findTravels({
        destinationId: destinationId!,
        originId: originId!,
        date: dayjs(date).toISOString(),
      }),
    enabled: Boolean(destinationId && originId),
  });

  const travels = travelsResponse?.result ?? [];

  function onLoadNextPage() {
    setPage((page) => page + 1);
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center text-sm text-muted-foreground mb-6">
        <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin" />
        Pesquisando viagens...
      </div>
    );
  }

  if (!travelsResponse) {
    return null;
  }

  if (travels.length === 0) {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-center text-sm text-muted-foreground mb-6">
        <SearchX className="w-5 h-5" />

        <span>Nenhuma viagem encontrada.</span>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm">
        <span className="font-medium">Viagens encontradas:</span>{" "}
        <span className="text-muted-foreground">
          {travels.length ?? 0} viage
          {travels.length === 1 ? "m" : "ns"}
        </span>
      </p>

      <ul className="flex flex-col gap-4 mt-4">
        {travels.map((travel) => (
          <li key={travel.id}>
            <TravelCard travel={travel} />
          </li>
        ))}
      </ul>

      {travelsResponse.meta.hasNextPage && (
        <Button onClick={onLoadNextPage}>Carregar mais</Button>
      )}
    </>
  );
}
