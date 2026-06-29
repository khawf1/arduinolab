const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");

const app = express();
app.use(express.json({ limit: "256kb" }));

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

const MAX_CODE_LENGTH = 20000;
const COMPILE_TIMEOUT_MS = 30000;
const FQBN = "arduino:avr:uno";

function run(command, options) {
  return new Promise((resolve, reject) => {
    exec(command, { timeout: COMPILE_TIMEOUT_MS, ...options }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || stdout || error.message));
        return;
      }
      resolve(stdout);
    });
  });
}

app.post("/compile", async (req, res) => {
  const code = req.body?.code;

  if (typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ error: "Missing 'code' in request body." });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return res.status(400).json({ error: "Sketch is too large." });
  }

  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), "sketch-"));
  const sketchName = "sketch";
  const sketchDir = path.join(workDir, sketchName);
  const outDir = path.join(workDir, "build");

  try {
    await fs.mkdir(sketchDir);
    await fs.writeFile(path.join(sketchDir, `${sketchName}.ino`), code, "utf-8");

    await run(
      `arduino-cli compile --fqbn ${FQBN} --output-dir "${outDir}" "${sketchDir}"`
    );

    const hexPath = path.join(outDir, `${sketchName}.ino.hex`);
    const hex = await fs.readFile(hexPath, "utf-8");

    res.json({ hex });
  } catch (err) {
    res.status(400).json({ error: err.message });
  } finally {
    await fs.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Compile server listening on port ${port}`));
