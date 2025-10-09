import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../config/firebase";

import AuthScreen from "../screens/AuthScreen";
import CameraScreen from "../screens/CameraScreen";
import FriendsScreen from "../screens/FriendsScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Theme } from "../styles/Theme";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  

  return (
    <>
      <StatusBar style="dark" backgroundColor={Theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Theme.colors.background },
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </>
  );
}
