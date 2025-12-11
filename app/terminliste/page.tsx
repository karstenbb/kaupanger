import Link from "next/link";

export default function TerminlistePage() {
  return (
    <div className="page-container px-4">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Terminliste</h1>
        <p className="text-text-secondary">Kjem snart</p>
        <Link href="/kamper" className="text-primary underline mt-4 inline-block">
          Sjå kommande kampar
        </Link>
      </div>
    </div>
  );
}
