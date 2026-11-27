export function SetupBanner() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <p className="font-medium">Supabase is not connected</p>
      <p className="mt-1 leading-relaxed text-amber-900/90">
        You are looking at a fictional sample book, and new records will not be
        saved. Copy <code className="font-mono text-xs">.env.example</code> to{" "}
        <code className="font-mono text-xs">.env.local</code>, add{" "}
        <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
        then run <code className="font-mono text-xs">supabase/schema.sql</code> in
        the Supabase SQL editor.
      </p>
    </div>
  );
}
