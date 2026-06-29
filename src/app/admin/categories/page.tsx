import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";
import { createCategory, deleteCategory } from "../actions";

export default async function CategoriesAdminPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, sort_order")
    .order("sort_order");

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/admin" className="mb-6 inline-block text-sm text-emerald-400 hover:underline">
        ← Back to components
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-zinc-100">Categories</h1>

      <ul className="mb-8 divide-y divide-zinc-800 rounded-xl border border-zinc-800">
        {(categories as Category[] | null)?.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-zinc-100">{c.name}</span>
            <form
              action={async () => {
                "use server";
                await deleteCategory(c.id);
              }}
            >
              <button className="text-sm text-red-400 hover:underline">Delete</button>
            </form>
          </li>
        ))}
        {(!categories || categories.length === 0) && (
          <li className="px-4 py-6 text-center text-zinc-500">No categories yet.</li>
        )}
      </ul>

      <form action={createCategory} className="flex gap-3">
        <input
          name="name"
          required
          placeholder="Category name (e.g. Sensors)"
          className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
        />
        <input
          name="sort_order"
          type="number"
          defaultValue={0}
          className="w-24 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
        />
        <button className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-zinc-950 hover:bg-emerald-500">
          Add
        </button>
      </form>
    </main>
  );
}
