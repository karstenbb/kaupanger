import { StaffDetailContent } from "./staff-detail-content";

interface StaffPageProps {
  params: Promise<{ id: string }>;
}

export default async function StaffPage({ params }: StaffPageProps) {
  const { id } = await params;
  return (
    <div className="page-container">
      <StaffDetailContent staffId={id} />
    </div>
  );
}
