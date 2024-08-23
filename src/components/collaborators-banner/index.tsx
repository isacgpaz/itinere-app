import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

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
        <CardTitle className="text-xl ">Contribua com este projeto</CardTitle>
        <CardDescription className="">
          Adicione novas rotas e pontos de embarque.
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-0">
        <Button size="sm">Quero contribuir</Button>
      </CardFooter>
    </Card>
  );
}
