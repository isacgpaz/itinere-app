import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ContributeHeader() {
  return (
    <Header className="pb-24">
      <div className="flex items-center w-full gap-2 text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>

        <span className="font-bold text-x">Seja um contribuidor</span>
      </div>

      <span className="text-muted max-w-lg">
        Ajude outras pessoas a encontrar viagens com transporte alternativo
        adicionando novas rotas e pontos de embarque.
      </span>
    </Header>
  );
}
