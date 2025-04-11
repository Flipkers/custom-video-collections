
// Import the already configured Supabase client
import { supabase } from '@/integrations/supabase/client';

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

// Re-export the supabase client
export { supabase };
