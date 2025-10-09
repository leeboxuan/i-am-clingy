// services/signedUrlService.js
import { getAuthenticatedSupabase } from '../config/supabase-storage';

export const signedUrlService = {
  uploadImage: async (uri, folder, userId, fileName) => {
    const supabase = await getAuthenticatedSupabase();
    
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const filePath = `${folder}/${userId}/${Date.now()}_${fileName}`;
    const { data, error } = await supabase.storage
      .from('clingy-friend-files')
      .upload(filePath, blob);

    if (error) throw error;

    // Return the path, not public URL
    return filePath;
  },

  getSignedUrl: async (filePath, expiresIn = 3600) => {
    const supabase = await getAuthenticatedSupabase();
    
    const { data, error } = await supabase.storage
      .from('clingy-friend-files')
      .createSignedUrl(filePath, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  }
};

// Usage in your components:
const loadImageWithSignedUrl = async (filePath) => {
  const signedUrl = await signedUrlService.getSignedUrl(filePath);
  // Use signedUrl in Image component
  return signedUrl;
};