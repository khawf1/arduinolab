import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { logout } from "@/app/actions";

export default async function Navbar() {
  const profile = await getCurrentProfile();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/30 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-mono text-lg font-semibold text-emerald-400">
          {"<"}ArduinoLab{"/>"}
        </Link>
        <div className="flex items-center gap-5 text-sm text-zinc-300">
          <Link href="/library" className="hover:text-emerald-400">
            Library
          </Link>
          <Link href="/coding-zone" className="hover:text-emerald-400">
            Coding Zone
          </Link>
          <Link href="/simulation-zone" className="hover:text-emerald-400">
            Simulation Zone
          </Link>
          {profile?.role === "admin" && (
            <Link href="/admin" className="hover:text-emerald-400">
              Admin
            </Link>
          )}
          {profile ? (
            <form action={logout}>
              <button className="rounded-md border border-zinc-700 px-3 py-1.5 hover:border-emerald-500 hover:text-emerald-400">
                Log out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-emerald-700 px-3 py-1.5 text-emerald-400 hover:bg-emerald-900/30"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
