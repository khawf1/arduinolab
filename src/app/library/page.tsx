import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ComponentCard from "@/components/ComponentCard";
import type { Category, Component } from "@/lib/types";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, sort_order")
    .order("sort_order");

  let query = supabase.from("components").select("*").order("name");

  if (category) {
    const cat = (categories as Category[] | null)?.find((c) => c.slug === category);
    if (cat) query = query.eq("category_id", cat.id);
  }
  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  const { data: components } = await query;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-zinc-100">Component Library</h1>

      <form className="mb-6 flex gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search components..."
          className="w-full max-w-sm rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-500"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-emerald-500">
          Search
        </button>
      </form>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/library"
          className={`rounded-full px-3 py-1.5 text-sm ${
            !category
              ? "bg-emerald-600 text-zinc-950"
              : "border border-zinc-700 text-zinc-300 hover:border-emerald-500"
          }`}
        >
          All
        </Link>
        {(categories as Category[] | null)?.map((c) => (
          <Link
            key={c.id}
            href={`/library?category=${c.slug}`}
            className={`rounded-full px-3 py-1.5 text-sm ${
              category === c.slug
                ? "bg-emerald-600 text-zinc-950"
                : "border border-zinc-700 text-zinc-300 hover:border-emerald-500"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {!components || components.length === 0 ? (
        <p className="text-zinc-500">No components found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(components as Component[]).map((c) => (
            <ComponentCard key={c.id} component={c} />
          ))}
        </div>
      )}
    </main>
  );
}
