// screens/HomeScreen.js
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import ProfileSidebar from "../components/ProfileSidebar";
import { auth, db } from "../config/firebase";
import { HomeScreenStyles as styles } from "../styles/HomeScreen.styles";
import { Theme } from "../styles/Theme";

export default function HomeScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    const unsubGroups = loadGroups();
    return () => unsubGroups && unsubGroups();
  }, []);

  const loadGroups = () => {
    const q = query(
      collection(db, "groups"),
      where("members", "array-contains", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGroups(list);
      loadGroupUpdates(list);
      setLoading(false);
    });
    return unsub;
  };

  const loadGroupUpdates = (groupsList) => {
    const ids = groupsList.map((g) => g.id);
    if (ids.length === 0) return;
    const q = query(
      collection(db, "updates"),
      where("groupId", "in", ids),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUpdates(list);
    });
    return unsub;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setGroups([]);
    setUpdates([]);
    await loadGroups();
    setRefreshing(false);
  };

  const name = auth.currentUser?.displayName;
  const possessive = name
    ? name.endsWith("s")
      ? `${name}'`
      : `${name}'s`
    : "your";

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>downloading attachment issues</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <LottieView
        source={require("../assets/animations/geometry.json")}
        autoPlay
        loop
        style={styles.backgroundAnimation}
        resizeMode="cover"
      />
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {possessive} <Text style={styles.greetingHighlight}>audiences</Text>
          </Text>
          <TouchableOpacity onPress={() => setProfileVisible(true)}>
            <Image
              source={require("../assets/images/blob.png")}
              style={styles.memberAvatar}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* groups section */}
        <Text style={styles.sectionTitle}>groups</Text>
        {groups.length === 0 ? (
          <View style={styles.emptyGroupContainer}>
            <Image
              source={require("../assets/images/emptyblob.png")}
              style={styles.emptyGroupImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyGroupTitle}>no blobs yet</Text>
            <TouchableOpacity
              style={styles.createGroupButton}
              onPress={() => navigation.navigate("AddGroup")}
            >
              <Text style={styles.createGroupText}>create group</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            horizontal
            data={groups}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.groupList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.groupCard}
                onPress={() =>
                  navigation.navigate("GroupDetails", { groupId: item.id })
                }
              >
                <Text style={styles.groupName}>{item.name}</Text>
                <View style={styles.memberRow}>
                  {item.members?.slice(0, 3).map((_, idx) => (
                    <Image
                      key={idx}
                      source={require("../assets/images/blob.png")}
                      style={[
                        styles.memberAvatar,
                        { marginLeft: idx === 0 ? 0 : -8 },
                      ]}
                    />
                  ))}
                  {item.members.length > 3 && (
                    <Text style={styles.memberCount}>
                      +{item.members.length - 3}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        {/* feed */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          recent moments
        </Text>
        {updates.length === 0 ? (
          <View style={styles.emptyMoments}>
            <Text style={styles.emptyMomentsTitle}>no moments yet 💤</Text>
            <Text style={styles.emptyMomentsSubtitle}>
              share something clingy 💞
            </Text>
          </View>
        ) : (
          <FlatList
            data={updates}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Theme.colors.primary]}
                tintColor={Theme.colors.primary}
              />
            }
            renderItem={({ item }) => (
              <View style={styles.updateCard}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.updateText}>{item.content}</Text>
              </View>
            )}
          />
        )}
      </View>

 <Modal
  isVisible={isProfileVisible}
  animationIn="slideInRight"
  animationOut="slideOutRight"
  backdropOpacity={0.4}
  onBackdropPress={() => setProfileVisible(false)}
  style={{ margin: 0, justifyContent: "flex-end", alignItems: "flex-end" }}
>
  <ProfileSidebar closeSidebar={() => setProfileVisible(false)} />
</Modal>
    </View>
  );
}
