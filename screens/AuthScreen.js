import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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

import { auth, db } from "../config/firebase";
import { AuthScreenStyles as styles } from "../styles/AuthScreen.styles";
import { generateUniqueFriendCode } from "../utils/friendCodeGenerator";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");

  const animationRef = useRef(null);

  const handleAuth = async () => {
    setError("");
    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        if (!user.emailVerified) {
          navigation.replace("VerifyEmail", { email: user.email });
          return;
        }

        navigation.replace("Home");
      } else {
        // --- SIGNUP FLOW ---
        if (password !== confirmPassword) {
          setError("Passwords do not match 😭");
          return;
        }

        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        // set display name on Firebase Auth profile
        await updateProfile(user, { displayName });

        // generate funny + unique friend code
        const friendCode = await generateUniqueFriendCode();

        // create Firestore user doc
        await setDoc(doc(db, "users", user.uid), {
          displayName,
          email,
          friendCode,
          photoURL: null,
          friends: [],
          createdAt: new Date().toISOString(),
        });

        // send verification
        await sendEmailVerification(user);
        navigation.replace("VerifyEmail", { email: user.email });
      }
    } catch (err) {
      console.error("Auth error:", err);
      const message = err.message?.replace("Firebase: ", "") || "Unknown error";
      setError("Oops! " + message);
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
      {/* background animation */}
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

      {/* main auth card */}
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

        {/* Confirm Password */}
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

        {/* Switch login/signup */}
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
