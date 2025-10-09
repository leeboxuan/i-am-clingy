// screens/HomeScreen.js
import * as Notifications from 'expo-notifications';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { auth, db } from '../config/firebase';
import { startLocationTracking } from '../services/LocationService';

// Import styles
import { HomeScreenStyles as styles } from '../styles/HomeScreen.styles';
import { Theme } from '../styles/Theme';

export default function HomeScreen({ navigation }) {
  const [updates, setUpdates] = useState([]);
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeApp();
    setupNotifications();
  }, []);

  const initializeApp = async () => {
    await loadUpdates();
    await loadFriends();
    await startLocationTracking();
    setLoading(false);
  };

  const loadUpdates = () => {
    const q = query(collection(db, 'updates'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUpdates(updatesList);
    });
    return unsubscribe;
  };

  const loadFriends = async () => {
    const mockFriends = [
      { id: '1', name: 'Alex', status: 'Online', lastSeen: new Date() },
      { id: '2', name: 'Sam', status: 'Away', lastSeen: new Date(Date.now() - 300000) },
      { id: '3', name: 'Jordan', status: 'Online', lastSeen: new Date() },
    ];
    setFriends(mockFriends);
  };

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No notification permissions');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFriends();
    setRefreshing(false);
  };

  const sendClingyAlert = async () => {
    try {
      await addDoc(collection(db, 'notifications'), {
        type: 'clingy_alert',
        message: 'I miss you! 🥺',
        fromUserId: auth.currentUser.uid,
        fromUserName: auth.currentUser.displayName || 'Your friend',
        timestamp: new Date(),
        read: false
      });

      Alert.alert('Sent!', 'Your friends know you miss them! 💕');
    } catch (error) {
      console.error('Error sending clingy alert:', error);
      Alert.alert('Error', 'Failed to send alert');
    }
  };

  const sendQuickMessage = async (message) => {
    try {
      await addDoc(collection(db, 'updates'), {
        userId: auth.currentUser.uid,
        content: message,
        type: 'text',
        timestamp: new Date(),
        user: auth.currentUser.displayName || 'Friend',
        isQuickMessage: true
      });
    } catch (error) {
      console.error('Error sending quick message:', error);
    }
  };

  const quickMessages = [
    { id: 1, text: "What are you doing? 🥺", emoji: "👀" },
    { id: 2, text: "I miss you! 💔", emoji: "💕" },
    { id: 3, text: "Send me a selfie! 📸", emoji: "🤳" },
    { id: 4, text: "Where are you? 🗺️", emoji: "📍" },
    { id: 5, text: "Thinking of you! 💭", emoji: "😊" },
    { id: 6, text: "Are you busy? 🕐", emoji: "⏰" }
  ];

  const renderUpdateItem = ({ item }) => (
    <View style={styles.updateItem}>
      <View style={styles.updateHeader}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp?.toDate()).toLocaleTimeString()}
        </Text>
      </View>
      
      {item.type === 'image' ? (
        <Image source={{ uri: item.content }} style={styles.updateImage} />
      ) : (
        <Text style={styles.updateText}>{item.content}</Text>
      )}
      
      <View style={styles.updateActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>😆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>🔥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <View style={[
          styles.statusIndicator, 
          { 
            backgroundColor: item.status === 'Online' 
              ? Theme.colors.status.online 
              : Theme.colors.status.away 
          }
        ]} />
        <Text style={styles.friendName}>{item.name}</Text>
      </View>
      <Text style={styles.lastSeen}>
        {item.status === 'Online' ? 'Now' : '5m ago'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>Getting things ready... 💕</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clingy Friend 💕</Text>
        <TouchableOpacity 
          style={styles.friendsButton}
          onPress={() => navigation.navigate('Friends')}
        >
          <Text>👥</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.mainAction}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.mainActionText}>📸 Send Update</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.clingyAction}
          onPress={sendClingyAlert}
        >
          <Text style={styles.clingyActionText}>I Miss You! 🥺</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Messages */}
      <View style={styles.quickMessagesSection}>
        <Text style={styles.sectionTitle}>Quick Messages</Text>
        <FlatList
          horizontal
          data={quickMessages}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.quickMessageButton}
              onPress={() => sendQuickMessage(item.text)}
            >
              <Text style={styles.quickMessageEmoji}>{item.emoji}</Text>
              <Text style={styles.quickMessageText}>
                {item.text.split(' ')[0]}...
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Friends List */}
      <View style={styles.friendsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
        <FlatList
          horizontal
          data={friends}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={renderFriendItem}
        />
      </View>

      {/* Updates Feed */}
      <View style={styles.updatesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <Text style={styles.updateCount}>{updates.length} updates</Text>
        </View>
        <FlatList
          data={updates}
          keyExtractor={(item) => item.id}
          renderItem={renderUpdateItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Theme.colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No updates yet! 📸</Text>
              <Text style={styles.emptyStateSubtext}>
                Send your first update to get started!
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}