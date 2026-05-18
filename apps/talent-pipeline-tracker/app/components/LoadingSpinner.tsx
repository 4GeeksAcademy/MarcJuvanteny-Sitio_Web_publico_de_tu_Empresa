export function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600" role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#e8640c]" />
      <span>{label}</span>
    </div>
  );
}
