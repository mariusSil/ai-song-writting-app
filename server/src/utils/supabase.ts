import { createClient } from '@supabase/supabase-js';
import env from '../config/env';

// Create a single supabase client for the server
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper function to check if a user exists
export const getUserById = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return null;
  }

  return data;
};

// Helper function to create or update a user
export const upsertUser = async (userData: {
  id: string;
  email: string;
  full_name?: string;
  language_preference?: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(
      {
        ...userData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
