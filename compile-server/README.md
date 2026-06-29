# ArduinoLab Compile Server

A tiny service that compiles real Arduino sketches to a `.hex` file using the
official `arduino-cli`. The main Next.js site posts sketch code here and gets
back machine code to run in the browser-side AVR emulator.

## Endpoints

- `POST /compile` — body `{ "code": "...arduino sketch..." }` → `{ "hex": "..." }` or `{ "error": "..." }`
- `GET /health` — returns `{ "ok": true }`

## Run locally

```bash
docker build -t arduinolab-compile-server .
docker run -p 8080:8080 arduinolab-compile-server
```

Test it:

```bash
curl -X POST http://localhost:8080/compile \
  -H "Content-Type: application/json" \
  -d '{"code":"void setup(){pinMode(13,OUTPUT);} void loop(){digitalWrite(13,HIGH);delay(500);digitalWrite(13,LOW);delay(500);}"}'
```

## Deploy to Render (free tier)

1. Push this repo to GitHub (the `compile-server` folder included).
2. On https://render.com, click **New → Web Service**, connect the repo.
3. Set **Root Directory** to `compile-server`. Render auto-detects the Dockerfile.
4. Add an environment variable `ALLOWED_ORIGIN` set to your site's URL (e.g. `https://your-site.vercel.app`) so only your site can call it.
5. Deploy. Copy the resulting public URL (e.g. `https://arduinolab-compile.onrender.com`).
6. Put that URL in the main site's `NEXT_PUBLIC_COMPILE_SERVER_URL` environment variable.

Note: Render's free tier spins down when idle, so the first compile request
after inactivity may take ~30-60 seconds while it wakes up.
