export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type Component = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  best_use_case: string | null;
  specs: Record<string, string>;
  image_url: string | null;
};

export type Profile = {
  id: string;
  email: string;
  role: "student" | "admin";
};

export type Sketch = {
  id: string;
  user_id: string;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
};
