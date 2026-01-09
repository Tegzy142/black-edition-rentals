import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ikdafmqoahpfdtsztytc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZGFmbXFvYWhwZmR0c3p0eXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NDg2NjYsImV4cCI6MjA4MzEyNDY2Nn0.3dvdTPKWdtaYtK5RjxGaxLReW7q9BiyuonqrqxT-9bg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
