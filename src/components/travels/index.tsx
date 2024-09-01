import { cn } from "@/lib/utils";
import { TravelsList } from "./travels-list";

export function Travels({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section {...props} className={cn(className, "mt-4")}>
      <TravelsList />
    </section>
  );
}
