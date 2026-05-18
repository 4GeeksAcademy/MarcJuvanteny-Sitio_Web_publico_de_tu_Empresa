import { CandidateDetailPage } from "../../components/CandidateDetailPage";

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CandidateDetailPage id={id} />;
}
