"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSpecs(raw: string): Record<string, string> {
  const specs: Record<string, string> = {};
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (key) specs[key] = value;
    });
  return specs;
}

async function uploadImageIfPresent(supabase: Awaited<ReturnType<typeof createClient>>, file: File | null) {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("component-images").upload(path, file);
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("component-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function createComponent(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "");
  const categoryId = String(formData.get("category_id") || "") || null;
  const description = String(formData.get("description") || "");
  const bestUseCase = String(formData.get("best_use_case") || "");
  const specsRaw = String(formData.get("specs") || "");
  const image = formData.get("image") as File | null;
  const imageUrlField = String(formData.get("image_url") || "").trim();

  const uploadedUrl = await uploadImageIfPresent(supabase, image);
  const imageUrl = uploadedUrl || imageUrlField || null;

  const { error } = await supabase.from("components").insert({
    name,
    slug: slugify(name),
    category_id: categoryId,
    description,
    best_use_case: bestUseCase,
    specs: parseSpecs(specsRaw),
    image_url: imageUrl,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/library");
  redirect("/admin");
}

export async function updateComponent(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "");
  const categoryId = String(formData.get("category_id") || "") || null;
  const description = String(formData.get("description") || "");
  const bestUseCase = String(formData.get("best_use_case") || "");
  const specsRaw = String(formData.get("specs") || "");
  const image = formData.get("image") as File | null;
  const imageUrlField = String(formData.get("image_url") || "").trim();

  const uploadedUrl = await uploadImageIfPresent(supabase, image);
  const imageUrl = uploadedUrl || imageUrlField || null;

  const update: Record<string, unknown> = {
    name,
    slug: slugify(name),
    category_id: categoryId,
    description,
    best_use_case: bestUseCase,
    specs: parseSpecs(specsRaw),
  };
  if (imageUrl) update.image_url = imageUrl;

  const { error } = await supabase.from("components").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/library");
  redirect("/admin");
}

export async function deleteComponent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("components").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/library");
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") || "");

  const { error } = await supabase.from("categories").insert({
    name,
    slug: slugify(name),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/library");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/library");
}
