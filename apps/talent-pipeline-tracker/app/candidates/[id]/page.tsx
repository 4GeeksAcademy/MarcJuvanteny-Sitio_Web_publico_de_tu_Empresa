import { CandidateDetailPage } from "../../components/CandidateDetailPage";

export default async function CandidatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const isCreated = query.created === "1";

  return <CandidateDetailPage id={id} isCreated={isCreated} />;
}
