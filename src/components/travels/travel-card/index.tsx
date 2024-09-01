import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Place, Travel } from "@prisma/client";
import { ArrowRight, CheckCircle2, Clock, MapPinCheck } from "lucide-react";

type TravelCardProps = {
  travel: Travel & {
    steps: {
      location: Place;
    }[];
  };
};

export function TravelCard({ travel }: TravelCardProps) {
  const origin = travel.steps[0].location;
  const destination = travel.steps[travel.steps.length - 1].location;

  return (
    <Card className={"p-4 flex justify-between gap-6 bg-muted"}>
      <CardHeader className="p-0">
        <CardTitle className="text-lg">
          {origin.name ?? origin.city} - {destination.name ?? destination.city}
        </CardTitle>

        <div className="space-y-1">
          <CardDescription className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-emerald-500" />
            Saída - 05h00
          </CardDescription>
          <CardDescription className="flex items-center">
            <MapPinCheck className="w-4 h-4 mr-1 text-emerald-500" />
            Embarque - Praça Padre Cícero
          </CardDescription>
          <CardDescription className="flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" />
            Passa em Juazeiro do Norte
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="p-0">
        <Button size="icon" className="rounded-full">
          <ArrowRight className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
