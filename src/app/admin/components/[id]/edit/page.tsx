import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ComponentForm from "@/components/ComponentForm";
import type { Category, Component } from "@/lib/types";
import { updateComponent } from "../../../actions";

export default async function EditComponentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: component }, { data: categories }] = await Promise.all([
    supabase.from("components").select("*").eq("id", id).single(),
    supabase.from("categories").select("id, name, slug, sort_order").order("sort_order"),
  ]);

  if (!component) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateComponent(id, formData);
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-100">Edit component</h1>
      <ComponentForm
        categories={(categories as Category[]) || []}
        component={component as Component}
        action={action}
      />
    </main>
  );
}
