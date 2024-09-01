import { Place } from "@prisma/client";

type PlacesResponse = {
  result: Place[];
  meta: {};
};

type FindPlacesProps = {
  search?: string;
};

export async function findPlaces({ search }: FindPlacesProps) {
  const response = await fetch("/api/place?search=" + search);
  const placesResponse: PlacesResponse = await response.json();

  return placesResponse;
}
