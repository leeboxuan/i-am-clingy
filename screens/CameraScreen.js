// screens/CameraScreen.js
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { mediaService } from '../services/HybridService';
import { CameraScreenStyles as styles } from '../styles/CameraScreen.styles';

import { auth } from '../config/firebase';
export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
        });
        setCapturedImage(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
      setIsLoading(false);
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

const sendPicture = async () => {
  if (capturedImage) {
    try {
      setIsLoading(true);
      
      // This uses the hybrid service
      await mediaService.createImageUpdate(
        capturedImage,
        'Thinking of you! 💕', // Optional caption
        auth.currentUser.uid
      );

      Alert.alert('Sent!', 'Your clingy update has been sent! 💕');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to send update');
    } finally {
      setIsLoading(false);
    }
  }
};

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need access to your camera to take clingy photos! 📸
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.permissionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (capturedImage) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        <View style={styles.previewControls}>
          <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendPicture}>
            <Text>📤</Text>
            <Text style={styles.sendText}>Send to Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
      >
        <View style={styles.cameraPreview}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
              <Text style={styles.flashIcon}>
                {flashMode === Camera.Constants.FlashMode.on ? '⚡' : '⚡️'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.galleryButton}
              onPress={pickFromGallery}
            >
              <Text style={{ color: '#FFF', fontSize: 20 }}>🖼️</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <Text style={styles.flipIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}