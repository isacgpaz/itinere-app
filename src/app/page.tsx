import { CollaboratorsBanner } from "@/components/collaborators-banner";
import { Header } from "@/components/header";
import { Travels } from "@/components/travels";

export default function Home() {
  return (
    <main>
      <Header />

      <div className="flex flex-col gap-6 my-12 max-w-lg mx-auto">
        <Travels className="mx-8 sm:mx-0" />

        <hr className="mx-8 sm:mx-0" />

        <CollaboratorsBanner className="mx-8 sm:mx-0" />
      </div>
    </main>
  );
}
