"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { SchedulesStepForm } from "./steps/schedules-step-form";

const maxSteps = 4;

export function ContributeForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [travel, setTravel] = useState<any | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(1);

  const updateTravel = useCallback(
    (travel: Partial<any>) => {
      setTravel((prevTravel: any) => ({
        ...prevTravel,
        ...travel,
      }));
    },
    [setTravel]
  );

  function goToPrevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function goToNextStep() {
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  }

  return (
    <Card {...props} className={cn(className, "shadow-none")}>
      <CardHeader>
        <CardTitle className="text-xl">Adicionar viagem</CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          Definição de horários ({currentStep}/{maxSteps})
        </CardDescription>
      </CardHeader>

      <SchedulesStepForm
        currentStep={currentStep}
        goToNextStep={goToNextStep}
        updateTravel={updateTravel}
      />
    </Card>
  );
}
