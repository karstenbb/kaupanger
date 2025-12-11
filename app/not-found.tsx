import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-6xl mb-4">⚽</div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Sida finst ikkje
      </h1>
      <p className="text-text-secondary mb-6">
        Beklagar, men sida du leitar etter finst ikkje.
      </p>
      <Link href="/">
        <Button>Tilbake til forsida</Button>
      </Link>
    </div>
  );
}
