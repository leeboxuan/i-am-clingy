// App.js
import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, reload } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../config/firebase";

import AuthScreen from "../screens/AuthScreen";
import CameraScreen from "../screens/CameraScreen";
import FriendsScreen from "../screens/FriendsScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = useRef(null);
  const [initialRoute, setInitialRoute] = useState("Auth");
  const [navReady, setNavReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      let target = "Auth";

      if (currentUser) {
        try {
          await reload(currentUser); // ensure fresh emailVerified
        } catch (e) {
          console.log("reload failed:", e);
        }
        target = currentUser.emailVerified ? "Home" : "VerifyEmail";
      }

      // If nav isn't ready yet, set initial route (first render).
      if (!navReady) {
        setInitialRoute(target);
        setChecking(false);
        return;
      }

      // Once ready, only replace if target differs from current.
      const current = navigationRef.current?.getCurrentRoute()?.name;
      if (current && current !== target) {
        navigationRef.current?.dispatch(StackActions.replace(target));
      }
      setChecking(false);
    });

    return unsub;
  }, [navReady]);

  if (checking) return null; // (optional) show a splash/Lottie here

  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: "#FFF" } }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  </>
  );
}
