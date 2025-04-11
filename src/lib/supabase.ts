
import { createClient } from '@supabase/supabase-js';

// These are fallback values - public URL is typically fine to expose
// For actual API keys, the user should connect their Supabase account
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
};

export type Collection = {
  id?: string;
  title: string;
  videos: VideoItem[];
  created_at?: string;
};
