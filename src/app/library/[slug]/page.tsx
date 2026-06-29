import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Component } from "@/lib/types";

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: component } = await supabase
    .from("components")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!component) notFound();

  const c = component as Component;
  const specs = Object.entries(c.specs || {});

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/library" className="mb-6 inline-block text-sm text-emerald-400 hover:underline">
        ← Back to library
      </Link>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
        {c.image_url && (
          <div className="mb-6 flex h-48 items-center justify-center rounded-lg bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image_url} alt={c.name} className="h-full object-contain" />
          </div>
        )}
        <h1 className="text-2xl font-semibold text-zinc-100">{c.name}</h1>
        {c.description && <p className="mt-3 text-zinc-400">{c.description}</p>}

        {c.best_use_case && (
          <div className="mt-6">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-emerald-400">
              Best use case
            </h2>
            <p className="text-zinc-300">{c.best_use_case}</p>
          </div>
        )}

        {specs.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-400">
              Key specs
            </h2>
            <dl className="grid gap-2 sm:grid-cols-2">
              {specs.map(([key, value]) => (
                <div key={key} className="rounded-md bg-zinc-950 px-3 py-2">
                  <dt className="text-xs text-zinc-500">{key}</dt>
                  <dd className="text-sm text-zinc-200">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </main>
  );
}
