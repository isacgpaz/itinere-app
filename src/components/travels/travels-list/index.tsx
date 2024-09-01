"use client";

import { useQuery } from "@tanstack/react-query";
import { TravelCard } from "../travel-card";
import { findTravels } from "@/services/travels/find-travels";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export function TravelsList() {
  const searchParams = useSearchParams();

  const destinationId = searchParams.get("destination") ?? undefined;
  const originId = searchParams.get("origin") ?? undefined;

  const { data: travelsResponse, isLoading } = useQuery({
    queryKey: ["travels", { page: 1, pageSize: 15, destinationId, originId }],
    queryFn: () =>
      findTravels({
        destinationId,
        originId,
      }),
    enabled: Boolean(destinationId || originId),
  });

  const travels = travelsResponse?.result ?? [];

  if (!(destinationId || originId)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center text-sm text-muted-foreground mb-6">
        <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin" />
        Pesquisando viagens...
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
    </>
  );
}
