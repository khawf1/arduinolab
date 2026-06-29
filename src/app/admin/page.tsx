import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Component } from "@/lib/types";
import { deleteComponent } from "./actions";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: components } = await supabase
    .from("components")
    .select("*")
    .order("name");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-100">Admin · Components</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/categories"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-emerald-500"
          >
            Manage categories
          </Link>
          <Link
            href="/admin/components/new"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-500"
          >
            + Add component
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(components as Component[] | null)?.map((c) => (
              <tr key={c.id} className="border-t border-zinc-800">
                <td className="px-4 py-3 text-zinc-100">{c.name}</td>
                <td className="px-4 py-3 text-zinc-500">{c.slug}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/components/${c.id}/edit`}
                    className="mr-3 text-emerald-400 hover:underline"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteComponent(c.id);
                    }}
                    className="inline"
                  >
                    <button className="text-red-400 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {(!components || components.length === 0) && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-zinc-500">
                  No components yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
