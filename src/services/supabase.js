import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dcsupusieeeicxfqgkwc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjc3VwdXNpZWVlaWN4ZnFna3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3MjM5MTksImV4cCI6MjAyMDI5OTkxOX0.YisenuzreHYc42pKiHz8DpkGU7ROv0IfkWkQUw0WeEE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
