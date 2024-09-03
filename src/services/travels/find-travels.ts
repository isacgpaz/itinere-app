import { Place, Travel } from "@prisma/client";

type TravelsResponse = {
  result: Array<
    Travel & {
      steps: {
        location: Place;
      }[];
    }
  >;
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    page: number;
    pageSize: number;
  };
};

type FindTravelsProps = {
  destinationId?: string;
  originId?: string;
  date?: string;
};

export async function findTravels({
  destinationId,
  originId,
  date,
}: FindTravelsProps) {
  const response = await fetch(
    "/api/travel?destinationId=" +
      destinationId +
      "&originId=" +
      originId +
      "&date=" +
      date
  );
  const travelsResponse: TravelsResponse = await response.json();

  return travelsResponse;
}
