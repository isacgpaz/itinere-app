import { CollaboratorsBanner } from "@/components/collaborators-banner";
import { Travels } from "@/components/travels";
import { HeaderSearch } from "./components/header-search";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HeaderSearch />

      <main className="flex flex-col gap-6 my-12 max-w-lg mx-auto">
        <Travels className="mx-8 sm:mx-0" />

        <hr className="mx-8 sm:mx-0" />

        <CollaboratorsBanner className="mx-8 sm:mx-0" />
      </main>
    </Suspense>
  );
}
