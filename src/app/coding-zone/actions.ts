"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireUserId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, userId: user.id };
}

export async function listSketches() {
  const { supabase, userId } = await requireUserId();
  const { data, error } = await supabase
    .from("sketches")
    .select("id, title, code, created_at, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function saveSketch(id: string | null, title: string, code: string) {
  const { supabase, userId } = await requireUserId();

  if (id) {
    const { error } = await supabase
      .from("sketches")
      .update({ title, code, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    revalidatePath("/coding-zone");
    return id;
  }

  const { data, error } = await supabase
    .from("sketches")
    .insert({ user_id: userId, title, code })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/coding-zone");
  return data.id as string;
}

export async function deleteSketch(id: string) {
  const { supabase, userId } = await requireUserId();
  const { error } = await supabase.from("sketches").delete().eq("id", id).eq("user_id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/coding-zone");
}
