import { reload, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // for creating Firestore record
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../config/firebase"; // add db here
import { AuthScreenStyles as styles } from "../styles/AuthScreen.styles";

// helper function for friend code
const generateFriendCode = () => {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return "CLY" + random;
};

export default function VerifyEmailScreen({ route, navigation }) {
  const email =
    route?.params?.email || auth.currentUser?.email || "your email";
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("");
  const animationRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await reload(auth.currentUser);

        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
          setStatus("verified");
          setMessage("Email verified! 🎉 Redirecting...");

          // ✨ Create Firestore user profile here
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            displayName: auth.currentUser.email.split("@")[0],
            friendCode: generateFriendCode(),
            createdAt: new Date(),
            friends: [],
          });

          // redirect to Home
          setTimeout(() => navigation.replace("Home"), 1500);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const resendEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email sent again 💌");
      animationRef.current?.play();
    } catch (err) {
      setMessage("Failed to resend email 😭");
    }
  };

  return (
    <View style={styles.screen}>
      {/* background animation */}
      <LottieView
        source={require("../assets/animations/ripple.json")}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* mascot */}
      <View style={styles.mascotContainer}>
        <Image
          source={require("../assets/images/blob.png")}
          style={styles.mascot}
          resizeMode="contain"
        />
      </View>

      {/* main card */}
      <View style={[styles.authCard, { alignItems: "center" }]}>
        <Text style={styles.title}>verify your email</Text>
        <Text style={styles.switchText}>
          a link has been sent to{"\n"}
          <Text style={{ fontWeight: "bold" }}>{email}</Text>
        </Text>

        {/* cute lottie loader */}
        <LottieView
          ref={animationRef}
          source={require("../assets/animations/ripple.json")}
          autoPlay
          loop
          style={{ width: 140, height: 140, marginVertical: 16 }}
        />

        {status === "waiting" && (
          <>
            <Text style={[styles.switchText, { marginBottom: 20 }]}>
              please click the link before i start overthinking
            </Text>
            <TouchableOpacity style={styles.button} onPress={resendEmail}>
              <Text style={styles.buttonText}>resend email</Text>
            </TouchableOpacity>
          </>
        )}

        {message ? <Text style={styles.error}>{message}</Text> : null}
      </View>
    </View>
  );
}
