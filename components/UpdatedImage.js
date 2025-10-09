// components/UpdateImage.js
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { signedUrlService } from '../services/SignedUrlService';

const UpdateImage = ({ filePath, style }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await signedUrlService.getSignedUrl(filePath);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [filePath]);

  if (!imageUrl) return null;

  return (
    <Image 
      source={{ uri: imageUrl }} 
      style={style}
      onError={() => console.log('Failed to load image')}
    />
  );
};

export default UpdateImage;