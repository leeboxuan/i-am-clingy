import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../config/firebase";
import { AuthScreenStyles as styles } from "../styles/AuthScreen.styles";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");

  const animationRef = useRef(null);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (!user.emailVerified) {
          navigation.replace("VerifyEmail", { email: user.email });
          return;
        }
        navigation.replace("Home");
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match 😭");
          return;
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName });
        await sendEmailVerification(user);

        navigation.replace("VerifyEmail", { email: user.email });
      }
    } catch (err) {
      setError("Oops! " + err.message.replace("Firebase: ", ""));
    }
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    animationRef.current?.reset();
    animationRef.current?.play();
    setError("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* background animation (droplets) */}
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/abstract.json")}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* mascot blob */}
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
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Display Name"
            placeholderTextColor="#7b6a5c"
            value={displayName}
            onChangeText={setDisplayName}
          />
        )}
        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7b6a5c"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7b6a5c"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password for Sign Up */}
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#7b6a5c"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}

        {/* Error message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Auth button */}
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
        </TouchableOpacity>

        {/* Switch between Login / Sign Up */}
        <TouchableOpacity onPress={handleSwitch}>
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
