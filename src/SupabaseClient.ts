import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://zoisqpjdagwrmfzniotl.supabase.co';

// Create a client with error handling
export const supabase = createClient(
  supabaseUrl,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvaXNxcGpkYWd3cm1mem5pb3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjEwNDAsImV4cCI6MjA0OTEzNzA0MH0.dd3KKwdRP8d4obLriFMrM2sfkxuV_P_Sx2Vei7CiWTs'
);

// Helper function to check if Supabase connection is valid
export const isSupabaseConnected = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('category').select('count');
    console.log('connection done');
    return !error;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};
