import { Place, Travel } from "@prisma/client";

type TravelsResponse = {
  result: Array<
    Travel & {
      steps: {
        location: Place;
      }[];
    }
  >;
  meta: {};
};

type FindTravelsProps = {
  destinationId?: string;
  originId?: string;
};

export async function findTravels({
  destinationId,
  originId,
}: FindTravelsProps) {
  const response = await fetch(
    "/api/travel?destinationId=" + destinationId + "&originId=" + originId
  );
  const travelsResponse: TravelsResponse = await response.json();

  return travelsResponse;
}
