import { CandidateForm } from "../../../components/CandidateForm";

export default async function EditCandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-5 px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-[#003049]">Editar candidatura</h1>
        <p className="text-sm text-slate-600">Actualiza la información actual del candidato.</p>
      </header>

      <CandidateForm mode="edit" candidateId={id} />
    </main>
  );
}
