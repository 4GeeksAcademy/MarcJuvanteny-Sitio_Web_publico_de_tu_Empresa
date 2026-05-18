import { Suspense } from "react";
import { CandidatesListPage } from "./components/CandidatesListPage";

export default function Home() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-5xl px-4 py-8">Cargando...</main>}>
      <CandidatesListPage />
    </Suspense>
  );
}
