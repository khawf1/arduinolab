# ArduinoLab — Setup Guide

This is a beginner-friendly walkthrough to get your site running locally and online.

## 1. Create your Supabase project

1. Go to https://supabase.com and sign up (free).
2. Click **New project**. Pick any name (e.g. "arduinolab"), set a database password (save it somewhere), choose a region close to you, and create it. Wait ~1 minute for it to spin up.
3. In your project, go to **Project Settings → API**. You'll need two values:
   - **Project URL**
   - **anon public** key

## 2. Configure environment variables

1. In this project folder, copy `.env.local.example` to a new file named `.env.local`.
2. Paste in your Project URL and anon key:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
3. Save the file. (`.env.local` is already git-ignored, so your keys stay private.)

## 3. Set up the database

1. In Supabase, open **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this project, copy all of it, paste it into the SQL editor, and click **Run**. This creates all the tables, security rules, and the image storage bucket.
3. (Optional, recommended) Do the same with `supabase/seed.sql` to pre-fill the library with a few starter components so it's not empty.

## 4. Run the site locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## 5. Make yourself the admin

1. On the running site, click **Sign up** and create an account with your own email.
2. Check your email and click the confirmation link (Supabase sends this automatically).
3. Back in Supabase, go to **SQL Editor** and run (replacing the email):
   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```
4. Log out and back in on the site. You should now see an **Admin** link in the navbar — that's your control panel to add/edit/delete components and categories.

## 6. Deploying online (when you're ready)

1. Push this project to a GitHub repository.
2. Go to https://vercel.com, sign up, and click **New Project** → import your GitHub repo.
3. In the Vercel project settings, add the environment variables from your `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_COMPILE_SERVER_URL` once you've deployed the compile server in step 7).
4. Deploy. Vercel gives you a live URL.

## 7. Coding Zone / Simulation Zone: deploying the compile server

The Coding Zone lets students write real Arduino C++. To actually compile it, a
small separate service (in the `compile-server/` folder) runs the real Arduino
compiler. This can't run on Vercel — it needs its own host.

1. Make sure `compile-server/` is pushed to the same GitHub repo.
2. Go to https://render.com, sign up (free tier works), click **New → Web Service**, and connect your repo.
3. Set **Root Directory** to `compile-server`. Render will detect the `Dockerfile` automatically.
4. Add an environment variable `ALLOWED_ORIGIN` set to your site's URL (e.g. `https://your-site.vercel.app`).
5. Deploy. Copy the public URL Render gives you (e.g. `https://arduinolab-compile.onrender.com`).
6. Add that URL as `NEXT_PUBLIC_COMPILE_SERVER_URL` in both your local `.env.local` and your Vercel project's environment variables, then redeploy the Vercel app so it picks up the new variable.

Note: Render's free tier spins down when idle, so the first compile after a
period of inactivity can take 30-60 seconds while it wakes up — this is normal.

See `compile-server/README.md` for local testing instructions.

## What's built so far

- Student sign-up / login (Supabase Auth)
- Component Library: browse, search, filter by category
- Admin Panel: add/edit/delete components and categories, with image upload
- **Coding Zone**: students write and save real Arduino C++ sketches (saved per-student in the `sketches` table)
- **Simulation Zone**: sketches are compiled by the real Arduino toolchain (via `compile-server/`) and run on a simulated ATmega328p (via `avr8js`) against a fixed circuit — an LED on pin 13 and a pushbutton on pin 2. A free-form drag-and-drop circuit builder with swappable components is a future phase.
