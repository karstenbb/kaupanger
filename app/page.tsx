import { Header } from "@/components/layout/header";
import { HomeContent } from "./home-content";

export default function HomePage() {
  return (
    <div className="page-container">
      <Header title="K.I.L" subtitle="FOTBALLKLUBB" />
      <HomeContent />
    </div>
  );
}
