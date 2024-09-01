import { TravelSearch } from "./travel-search";

export function Header() {
  return (
    <header className="flex flex-col items-center gap-6 px-8 h-1/4 rounded-b-3xl bg-sky-950 pt-10 pb-44">
      <div className="flex items-center gap-4 text-primary-foreground">
        <span className="font-bold text-3xl">Itinere</span>

        <span className="text-sm block mt-1">Planeje a sua viagem</span>
      </div>

      <span className="text-muted text-center max-w-xs">
        Selecione os detalhes da sua viagem e deixe o resto com a gente!
      </span>

      <div className="relative w-full">
        <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 translate-y-1/2 w-full">
          <TravelSearch />
        </div>
      </div>
    </header>
  );
}
