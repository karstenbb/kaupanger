import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButikkPage() {
  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Butikk kommer snart
      </h1>
      <p className="text-text-secondary mb-6 max-w-xs">
        Vi jobbar med å få butikken vår klar. Kom tilbake snart for å kjøpe
        supporterutstyr!
      </p>
      <Link href="/">
        <Button>Tilbake til forsida</Button>
      </Link>
    </div>
  );
}
