import type { Category, Component } from "@/lib/types";

export default function ComponentForm({
  categories,
  component,
  action,
}: {
  categories: Category[];
  component?: Component;
  action: (formData: FormData) => void;
}) {
  const specsText = component
    ? Object.entries(component.specs || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    : "";

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm text-zinc-400">Name</label>
        <input
          name="name"
          required
          defaultValue={component?.name}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">Category</label>
        <select
          name="category_id"
          defaultValue={component?.category_id || ""}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
        >
          <option value="">— none —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={component?.description || ""}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">Best use case</label>
        <textarea
          name="best_use_case"
          rows={2}
          defaultValue={component?.best_use_case || ""}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">
          Key specs (one per line, format <code>key: value</code>)
        </label>
        <textarea
          name="specs"
          rows={4}
          placeholder={"Logic voltage: 5V\nPins: 14 digital, 6 analog"}
          defaultValue={specsText}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">
          Image upload {component?.image_url && "(leave empty to keep current image)"}
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-300"
        />
        {component?.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={component.image_url} alt="" className="mt-2 h-20 rounded-md object-contain" />
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm text-zinc-400">
          Or image URL (used only if no file is uploaded above)
        </label>
        <input
          type="url"
          name="image_url"
          placeholder="https://..."
          defaultValue={component?.image_url && !component.image_url.includes("supabase") ? component.image_url : ""}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-500"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-zinc-950 hover:bg-emerald-500"
      >
        Save
      </button>
    </form>
  );
}
