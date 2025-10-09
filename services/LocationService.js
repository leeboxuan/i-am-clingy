// services/locationService.js
import * as Location from 'expo-location';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const startLocationTracking = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return;
  }

  // Get initial location
  let location = await Location.getCurrentPositionAsync({});
  await updateUserLocation(location.coords);

  // Track location changes
  Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 30000, // 30 seconds
      distanceInterval: 50, // 50 meters
    },
    async (location) => {
      await updateUserLocation(location.coords);
    }
  );
};

const updateUserLocation = async (coords) => {
  if (!auth.currentUser) return;

  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userRef, {
      location: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: new Date()
      },
      lastSeen: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating location:', error);
  }
};