import { createClient } from "@/lib/supabase/server";
import SimulatorClient from "@/components/SimulatorClient";
import { STARTER_SKETCH } from "@/lib/starterSketch";

export default async function SimulationZonePage({
  searchParams,
}: {
  searchParams: Promise<{ sketch?: string }>;
}) {
  const { sketch: sketchId } = await searchParams;
  let code = STARTER_SKETCH;

  if (sketchId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("sketches")
      .select("code")
      .eq("id", sketchId)
      .single();
    if (data?.code) code = data.code;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-semibold text-zinc-100">Simulation Zone</h1>
      <p className="mb-6 text-zinc-400">
        Compile your sketch on a real Arduino toolchain and watch it run on a simulated
        Uno: an LED on pin 13, a pushbutton on pin 2.
      </p>
      <SimulatorClient initialCode={code} />
    </main>
  );
}
