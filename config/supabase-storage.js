// config/supabase-storage.js
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { auth } from './firebase'; // Your Firebase auth

const supabaseUrl = 'https://bjsxthapqgzhehxougfs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqc3h0aGFwcWd6aGVoeG91Z2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTc1OTgsImV4cCI6MjA3NTQ5MzU5OH0._tI6g-e2de-6NIki9pOmGw8iwD1Pu2W87LpmLU_a5lk'

// Create Supabase client
export const supabaseStorage = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

// Function to get authenticated Supabase client
export const getAuthenticatedSupabase = async () => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('No authenticated user');
  }

  // Get Firebase ID token
  const idToken = await currentUser.getIdToken();
  
  // Create Supabase client with Firebase token
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
    auth: {
      persistSession: false,
    },
  })
}