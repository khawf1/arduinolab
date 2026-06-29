import { createClient } from "@/lib/supabase/server";
import ComponentForm from "@/components/ComponentForm";
import type { Category } from "@/lib/types";
import { createComponent } from "../../actions";

export default async function NewComponentPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, sort_order")
    .order("sort_order");

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-100">Add component</h1>
      <ComponentForm categories={(categories as Category[]) || []} action={createComponent} />
    </main>
  );
}
