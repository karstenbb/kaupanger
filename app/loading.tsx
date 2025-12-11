export default function Loading() {
  return (
    <div className="page-container flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-text-secondary">Lastar...</p>
      </div>
    </div>
  );
}
