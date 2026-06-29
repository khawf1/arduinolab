"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { EditorView } from "@codemirror/view";
import type { Sketch } from "@/lib/types";
import { STARTER_SKETCH } from "@/lib/starterSketch";
import { deleteSketch, saveSketch } from "@/app/coding-zone/actions";

export default function CodingZoneEditor({ initialSketches }: { initialSketches: Sketch[] }) {
  const router = useRouter();
  const [sketches, setSketches] = useState(initialSketches);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("Untitled sketch");
  const [code, setCode] = useState(initialSketches[0]?.code || STARTER_SKETCH);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function loadSketch(s: Sketch) {
    setCurrentId(s.id);
    setTitle(s.title);
    setCode(s.code);
    setStatus(null);
  }

  function newSketch() {
    setCurrentId(null);
    setTitle("Untitled sketch");
    setCode(STARTER_SKETCH);
    setStatus(null);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const id = await saveSketch(currentId, title, code);
      setCurrentId(id);
      setSketches((prev) => {
        const existing = prev.find((s) => s.id === id);
        const updated: Sketch = {
          id,
          user_id: existing?.user_id || "",
          title,
          code,
          created_at: existing?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        return [updated, ...prev.filter((s) => s.id !== id)];
      });
      setStatus("Saved.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteSketch(id);
    setSketches((prev) => prev.filter((s) => s.id !== id));
    if (currentId === id) newSketch();
  }

  async function handleRun() {
    setSaving(true);
    try {
      const id = await saveSketch(currentId, title, code);
      router.push(`/simulation-zone?sketch=${id}`);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to save before running.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-2">
        <button
          onClick={newSketch}
          className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-emerald-500"
        >
          + New sketch
        </button>
        <ul className="space-y-1">
          {sketches.map((s) => (
            <li key={s.id} className="flex items-center gap-1">
              <button
                onClick={() => loadSketch(s)}
                className={`flex-1 truncate rounded-md px-3 py-2 text-left text-sm ${
                  currentId === s.id
                    ? "bg-emerald-900/40 text-emerald-300"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                {s.title}
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="px-2 text-xs text-red-400 hover:underline"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <div className="mb-3 flex items-center gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-emerald-500 disabled:opacity-60"
          >
            Save
          </button>
          <button
            onClick={handleRun}
            disabled={saving}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-500 disabled:opacity-60"
          >
            Run in Simulator →
          </button>
        </div>
        {status && <p className="mb-3 text-sm text-zinc-400">{status}</p>}

        <div className="overflow-hidden rounded-md border border-zinc-800">
          <CodeMirror
            value={code}
            height="500px"
            theme="dark"
            extensions={[cpp(), EditorView.lineWrapping]}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>
    </div>
  );
}
