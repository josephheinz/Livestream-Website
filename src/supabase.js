import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://dpzcqecvdfgdllccsrjx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwemNxZWN2ZGZnZGxsY2Nzcmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxOTcwNTgsImV4cCI6MjA0Nzc3MzA1OH0.b9fm87mtEmebVDjiC-VGQzfbQju81mhprydANVSm8J4",
  {
    auth: {
      persistSession: true, // Ensure session is persisted in localStorage
      detectSessionInUrl: true, // Detect session in URL (e.g., for magic links)
    },
  }
);
