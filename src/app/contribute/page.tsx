import { Info } from "lucide-react";
import { ContributeForm } from "./components/contribute-form";
import { ContributeHeader } from "./components/contribute-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContributePage() {
  return (
    <>
      <ContributeHeader />

      <main className="flex flex-col gap-6 max-w-lg mx-auto -mt-16 mb-16 px-8 sm:px-0">
        <ContributeForm />

        <Alert className="bg-sky-50">
          <Info className="h-4 w-4" />

          <AlertTitle>Aviso importante</AlertTitle>
          <AlertDescription>
            A viagem cadastrada será avaliada para assegurar a integridade dos
            dados submetidos e, uma vez aprovada, estará disponível em nossa
            base de viagens para todos os usuários.
          </AlertDescription>
        </Alert>
      </main>
    </>
  );
}
