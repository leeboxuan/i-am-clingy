import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import LottieView from "lottie-react-native";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useRef, useState } from "react";

import { auth } from "../config/firebase";
import { AuthScreenStyles as styles } from "../styles/AuthScreen.styles";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const animationRef = useRef(null);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigation.replace("Home");
    } catch (err) {
      setError("Oops! " + err.message.replace("Firebase: ", ""));
    }
  };

  // optional: replay droplet animation when switching modes
  const handleSwitch = () => {
    setIsLogin(!isLogin);
    animationRef.current?.reset();
    animationRef.current?.play();
  };

  return (
<KeyboardAvoidingView
  style={styles.screen}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
  {/* background animation (droplets) */}
  <LottieView
    source={require("../assets/animations/abstract.json")}
    autoPlay
    loop
    style={styles.backgroundAnimation}
  />

  {/* mascot container */}
  <View style={styles.mascotContainer}>
    <Image
      source={require("../assets/images/blob.png")}
      style={styles.mascot}
      resizeMode="contain"
    />
  </View>

  {/* main card */}
  <View style={styles.authCard}>
    <Text style={styles.title}>
      {isLogin ? "home is where you tap login" : "join the clingdom"}
    </Text>

    <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="#7b6a5c"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
    />

    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#7b6a5c"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />

    {error ? <Text style={styles.error}>{error}</Text> : null}

    <TouchableOpacity style={styles.button} onPress={handleAuth}>
      <Text style={styles.buttonText}>
        {isLogin ? "Login" : "Sign Up"}
      </Text>
    </TouchableOpacity>

<TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
  <Text style={styles.switchText}>
    {isLogin ? (
      <>
        Need an account?{" "}
        <Text style={styles.highlightLink}>Register</Text>
      </>
    ) : (
      <>
        Already have an account?{" "}
        <Text style={styles.highlightLink}>Login</Text>
      </>
    )}
  </Text>
</TouchableOpacity>
  </View>
</KeyboardAvoidingView>
  );
}
