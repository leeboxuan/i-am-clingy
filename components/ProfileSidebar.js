import * as ImagePicker from "expo-image-picker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db, storage } from "../config/firebase";
import { SidebarStyles as styles } from "../styles/ProfileSidebar.styles";

export default function ProfileSidebar({ closeSidebar }) {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setFriends(data.friends || []);
        if (data.photoURL) setPhotoURL(data.photoURL);
      }
    };
    fetchData();
  }, []);

  const pickImage = async () => {
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
      setPhotoURL(downloadURL);
    }
  };

  const saveName = async () => {
    await updateDoc(doc(db, "users", user.uid), { displayName });
  };
const shortCode = user.uid.slice(0, 6).toUpperCase();

  return (
    <View style={styles.sidebar}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Profile image */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        <View style={styles.avatarBorder}>
          <Image
            source={
              photoURL
                ? { uri: photoURL }
                : require("../assets/images/blob.png")
            }
            style={styles.avatar}
          />
        </View>
        <Text style={styles.changePhoto}>Change photo</Text>
      </TouchableOpacity>

      {/* Display name */}
      <Text style={styles.label}>Display Name</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
        onBlur={saveName}
        placeholder="Enter name"
        placeholderTextColor="#9C9185"
      />

      {/* Friend code */}
      <Text style={styles.label}>Friend Code</Text>
      <Text selectable style={styles.friendCode}>{shortCode}</Text>
<Text style={styles.friendCodeHint}>tap to copy full code</Text>

      {/* Friend list */}
      <Text style={styles.label}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.friendItem}>💞 {item.slice(0, 6)}...</Text>
        )}
        ListEmptyComponent={
          <Text style={styles.noFriends}>no clingy friends yet 😭</Text>
        }
      />
    </View>
  );
}
