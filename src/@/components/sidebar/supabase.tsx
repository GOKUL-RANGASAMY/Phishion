import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ztonsmkjlrncvrhaqzlm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0b25zbWtqbHJuY3ZyaGFxemxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2OTg4ODEsImV4cCI6MjAyMjI3NDg4MX0.Zb9W7ZGQpUznstcm3rOfCCdn_1vKyfV3fcTyglkUIkE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
