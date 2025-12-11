import { Header } from "@/components/layout/header";
import { KamperContent } from "./kamper-content";

export default function KamperPage() {
  return (
    <div className="page-container">
      <Header title="K.I.L" subtitle="FOTBALLKLUBB" />
      <KamperContent />
    </div>
  );
}
