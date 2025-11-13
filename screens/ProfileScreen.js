// screens/ProfileScreen.js
import * as ImagePicker from "expo-image-picker";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db, storage } from "../config/firebase";
import { ProfileScreenStyles as styles } from "../styles/ProfileScreen.styles";

export default function ProfileScreen() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || null);
  const [friends, setFriends] = useState([]);
  const [friendCodeInput, setFriendCodeInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setFriends(data.friends || []);
        if (data.photoURL) setPhotoURL(data.photoURL);
      } else {
        await setDoc(doc(db, "users", user.uid), { friends: [] });
      }
    };
    fetchProfile();
  }, []);

  const handleSaveDisplayName = async () => {
    await updateDoc(doc(db, "users", user.uid), { displayName });
    await user.updateProfile({ displayName });
    Alert.alert("Updated!", "Your display name has been changed.");
  };

  const handleAddFriend = async () => {
    if (!friendCodeInput.trim()) return;
    const friendRef = doc(db, "users", friendCodeInput.trim());
    const friendSnap = await getDoc(friendRef);
    if (!friendSnap.exists()) {
      Alert.alert("Error", "No user found with that friend code.");
      return;
    }

    await updateDoc(doc(db, "users", user.uid), {
      friends: arrayUnion(friendCodeInput.trim()),
    });
    await updateDoc(friendRef, {
      friends: arrayUnion(user.uid),
    });

    setFriends((prev) => [...prev, friendCodeInput.trim()]);
    setFriendCodeInput("");
    Alert.alert("Success!", "Friend added!");
  };

  const pickProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePics/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", user.uid), { photoURL: downloadURL });
      await user.updateProfile({ photoURL: downloadURL });
      setPhotoURL(downloadURL);
      Alert.alert("Updated!", "Profile picture changed!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickProfilePic}>
        <Image
          source={photoURL ? { uri: photoURL } : require("../assets/images/blob.png")}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Change photo</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Display Name</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveDisplayName}>
        <Text style={styles.buttonText}>Save Name</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Your Friend Code</Text>
      <Text selectable style={styles.friendCode}>{user.uid}</Text>

      <Text style={styles.label}>Add Friend</Text>
      <View style={styles.addFriendRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter friend code"
          value={friendCodeInput}
          onChangeText={setFriendCodeInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.friendItem}>{item}</Text>
        )}
      />
    </View>
  );
}
