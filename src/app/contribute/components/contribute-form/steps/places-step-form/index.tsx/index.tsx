import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SelectPlacesSchema,
  selectPlacesSchema,
} from "@/lib/zod/schemas/places";
import { PlacesSortable } from "../places-sortable";

type PlacesStepFormProps = {
  currentStep: number;
  goToPrevStep: () => void;
  goToNextStep: () => void;
  updateTravel: (travel: Partial<any>) => void;
};

export function PlacesStepForm({
  currentStep,
  goToPrevStep,
  goToNextStep,
  updateTravel,
}: PlacesStepFormProps) {
  const form = useForm<SelectPlacesSchema>({
    resolver: zodResolver(selectPlacesSchema),
    defaultValues: {
      places: [
        { place: "", time: "" },
        { place: "", time: "" },
      ],
    },
  });

  function onSubmit(data: SelectPlacesSchema) {
    console.log(data);
    updateTravel(data);
    goToNextStep();
  }

  if (currentStep !== 2) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <CardContent className="space-y-3 w-full">
          <PlacesSortable />
        </CardContent>

        <CardFooter>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={goToPrevStep}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button className="ml-auto">Avançar</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
