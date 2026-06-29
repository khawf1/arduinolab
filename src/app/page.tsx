import Link from "next/link";

const FEATURES = [
  {
    title: "Component Library",
    desc: "Browse microcontrollers, sensors, actuators, displays, and more — with specs and real-world use cases.",
  },
  {
    title: "Coding Zone",
    desc: "Write and study Arduino sketches in a dedicated practice space.",
    soon: true,
  },
  {
    title: "Simulation Zone",
    desc: "Build circuits and watch your code run on simulated hardware.",
    soon: true,
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <p className="mb-3 font-mono text-sm text-emerald-400">{"// learn by building"}</p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-6xl">
          Learn Arduino, <span className="text-emerald-400">hands-on</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
          A learning hub for students: explore real electronics components, write code,
          and simulate circuits — all in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-emerald-600 px-6 py-3 font-medium text-zinc-950 transition hover:bg-emerald-500"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-zinc-700 px-6 py-3 font-medium text-zinc-200 transition hover:border-emerald-500 hover:text-emerald-400"
          >
            Log in
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              {f.soon && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-900/40 px-2 py-0.5 text-xs text-emerald-400">
                  Coming soon
                </span>
              )}
              <h3 className="mb-2 text-lg font-semibold text-zinc-100">{f.title}</h3>
              <p className="text-sm text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
