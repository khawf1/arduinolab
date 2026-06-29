import Link from "next/link";
import type { Component } from "@/lib/types";

export default function ComponentCard({ component }: { component: Component }) {
  return (
    <Link
      href={`/library/${component.slug}`}
      className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-emerald-600/60"
    >
      <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-zinc-950">
        {component.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={component.image_url}
            alt={component.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="font-mono text-xs text-zinc-600">no image</span>
        )}
      </div>
      <h3 className="font-medium text-zinc-100 group-hover:text-emerald-400">
        {component.name}
      </h3>
      {component.description && (
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{component.description}</p>
      )}
    </Link>
  );
}
