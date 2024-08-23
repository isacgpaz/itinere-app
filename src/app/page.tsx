import { CollaboratorsBanner } from "@/components/collaborators-banner";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main>
      <Header />

      <div className="mt-12">
        <CollaboratorsBanner className="mx-8" />
      </div>
    </main>
  );
}
