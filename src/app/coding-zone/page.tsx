import { createClient } from "@/lib/supabase/server";
import CodingZoneEditor from "@/components/CodingZoneEditor";
import type { Sketch } from "@/lib/types";

export default async function CodingZonePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: sketches } = await supabase
    .from("sketches")
    .select("id, title, code, created_at, updated_at")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-semibold text-zinc-100">Coding Zone</h1>
      <p className="mb-6 text-zinc-400">
        Write a real Arduino sketch, save it, then run it in the Simulation Zone.
      </p>
      <CodingZoneEditor initialSketches={(sketches as Sketch[]) || []} />
    </main>
  );
}
