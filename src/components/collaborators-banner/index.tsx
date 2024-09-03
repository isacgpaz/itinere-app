import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export function CollaboratorsBanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      {...props}
      className={cn(className, "p-4 flex justify-between gap-6 bg-muted")}
    >
      <CardHeader className="p-0">
        <CardTitle className="text-xl">Contribua com este projeto</CardTitle>
        <CardDescription>
          Adicione novas rotas e pontos de embarque.
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-0">
        <Link href="/contribute">
          <Button size="sm" variant="dark">
            Quero contribuir
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
