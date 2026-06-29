"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { EditorView } from "@codemirror/view";
import { useAvrSimulator } from "@/lib/useAvrSimulator";

export default function SimulatorClient({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [compiling, setCompiling] = useState(false);
  const [compileError, setCompileError] = useState<string | null>(null);
  const { run, running, ledOn, error, setButtonPressed } = useAvrSimulator();

  async function handleCompileAndRun() {
    setCompiling(true);
    setCompileError(null);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_COMPILE_SERVER_URL;
      if (!serverUrl) {
        setCompileError("Compile server is not configured (NEXT_PUBLIC_COMPILE_SERVER_URL).");
        return;
      }

      const res = await fetch(`${serverUrl}/compile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setCompileError(data.error || "Compilation failed.");
        return;
      }

      run(data.hex);
    } catch {
      setCompileError("Could not reach the compile server.");
    } finally {
      setCompiling(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Sketch
          </h2>
          <button
            onClick={handleCompileAndRun}
            disabled={compiling}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-500 disabled:opacity-60"
          >
            {compiling ? "Compiling..." : "Compile & Run"}
          </button>
        </div>
        <div className="overflow-hidden rounded-md border border-zinc-800">
          <CodeMirror
            value={code}
            height="420px"
            theme="dark"
            extensions={[cpp(), EditorView.lineWrapping]}
            onChange={(value) => setCode(value)}
          />
        </div>
        {(compileError || error) && (
          <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-md border border-red-900/50 bg-red-950/30 p-3 text-xs text-red-300">
            {compileError || error}
          </pre>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-400">
          Circuit
        </h2>
        <div className="flex flex-col items-center rounded-md border border-zinc-800 bg-zinc-900/50 p-8">
          <CircuitSvg ledOn={running && ledOn} />
          <button
            onMouseDown={() => setButtonPressed(true)}
            onMouseUp={() => setButtonPressed(false)}
            onMouseLeave={() => setButtonPressed(false)}
            disabled={!running}
            className="mt-6 rounded-md border border-zinc-700 px-6 py-3 text-sm text-zinc-200 hover:border-emerald-500 disabled:opacity-40"
          >
            Hold: Button (pin 2)
          </button>
          <p className="mt-3 text-xs text-zinc-500">
            {running ? "Simulation running" : "Compile & Run to start"}
          </p>
        </div>
      </div>
    </div>
  );
}

function CircuitSvg({ ledOn }: { ledOn: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="h-40 w-48">
      <rect x="20" y="40" width="160" height="90" rx="8" fill="#0a3d2e" stroke="#10b981" />
      <text x="100" y="90" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontFamily="monospace">
        Arduino Uno
      </text>
      <circle
        cx="160"
        cy="20"
        r="14"
        fill={ledOn ? "#facc15" : "#3f3f46"}
        stroke={ledOn ? "#fde047" : "#52525b"}
        strokeWidth="2"
      >
        {ledOn && (
          <animate attributeName="opacity" values="1;0.7;1" dur="0.3s" repeatCount="indefinite" />
        )}
      </circle>
      <text x="160" y="42" textAnchor="middle" fill="#71717a" fontSize="9">
        pin 13
      </text>
    </svg>
  );
}
