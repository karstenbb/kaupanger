import { PlayerDetailContent } from "./player-detail-content";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  return <PlayerDetailContent playerId={id} />;
}
