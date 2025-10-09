// services/hybridService.js
import { getAuthenticatedSupabase } from '../config/supabase-storage';

// Use Supabase for file storage with proper auth
export const storageService = {
  uploadImage: async (uri, folder, userId, fileName) => {
    try {
      // Get authenticated Supabase client
      const supabase = await getAuthenticatedSupabase();
      
      // Convert URI to blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Upload to Supabase Storage
      const filePath = `${folder}/${userId}/${Date.now()}_${fileName}`;
      const { data, error } = await supabase.storage
        .from('clingy-friend-files')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL (this will work due to our SELECT policies)
      const { data: urlData } = supabase.storage
        .from('clingy-friend-files')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading to Supabase:', error);
      throw error;
    }
  },

  uploadAvatar: async (uri, userId) => {
    const fileName = `avatar.jpg`;
    return await storageService.uploadImage(uri, 'avatars', userId, fileName);
  },

  uploadUpdateImage: async (uri, userId) => {
    const fileName = `update.jpg`;
    return await storageService.uploadImage(uri, 'updates', userId, fileName);
  },

  // Function to check if user can access a file
  canAccessFile: async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};