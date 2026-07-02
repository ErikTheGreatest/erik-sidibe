import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactMessage = {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};

export type Project = {
  id?: number;
  slug: string;
  name: string;
  category: string;
  year: string;
  description: string;
  challenge: string;
  features: string[];
  tech: string[];
  image_url: string;
  accent: string;
  sort_order: number;
  created_at?: string;
};
