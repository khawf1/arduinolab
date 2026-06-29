export default function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <span className="mb-4 rounded-full bg-emerald-900/40 px-3 py-1 text-xs text-emerald-400">
        Coming soon
      </span>
      <h1 className="text-3xl font-semibold text-zinc-100">{title}</h1>
      <p className="mt-3 text-zinc-400">{blurb}</p>
    </main>
  );
}
