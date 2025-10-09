// screens/FriendsScreen.js
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { FriendsScreenStyles as styles } from '../styles/FriendsScreen.styles';
import { Theme } from '../styles/Theme';

export default function FriendsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([
    {
      id: '1',
      name: 'Alex Johnson',
      status: 'Online',
      lastSeen: new Date(),
      avatar: 'AJ'
    },
    {
      id: '2', 
      name: 'Sam Smith',
      status: 'Away',
      lastSeen: new Date(Date.now() - 300000),
      avatar: 'SS'
    },
    {
      id: '3',
      name: 'Jordan Lee',
      status: 'Online', 
      lastSeen: new Date(),
      avatar: 'JL'
    },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: '4',
      name: 'Taylor Swift',
      status: 'Pending',
      avatar: 'TS'
    }
  ]);

  const handleAddFriend = () => {
    Alert.alert('Add Friend', 'This feature is coming soon! 👥');
  };

  const handleFriendAction = (friendId, action) => {
    Alert.alert(action === 'message' ? 'Message' : 'Call', 
      `${action === 'message' ? 'Message' : 'Call'} feature coming soon!`);
  };

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendAvatar}>
        <Text style={styles.friendAvatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <View style={styles.friendStatus}>
          <View style={[
            styles.statusIndicator,
            { 
              backgroundColor: item.status === 'Online' 
                ? Theme.colors.status.online 
                : item.status === 'Away'
                ? Theme.colors.status.away
                : Theme.colors.status.offline
            }
          ]} />
          <Text style={styles.statusText}>
            {item.status} • 
            <Text style={styles.lastSeen}>
              {item.status === 'Online' ? ' Now' : ' 5m ago'}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.friendActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleFriendAction(item.id, 'message')}
        >
          <Text>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleFriendAction(item.id, 'call')}
        >
          <Text>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPendingItem = ({ item }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendAvatar}>
        <Text style={styles.friendAvatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={[styles.statusText, { color: Theme.colors.accent }]}>
          Waiting for acceptance
        </Text>
      </View>
      <View style={styles.friendActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>✅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor={Theme.colors.text.light}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Add Friend Button */}
      <View style={styles.addFriendSection}>
        <TouchableOpacity 
          style={styles.addFriendButton}
          onPress={handleAddFriend}
        >
          <Text>👥</Text>
          <Text style={styles.addFriendText}>Add New Friend</Text>
        </TouchableOpacity>
      </View>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <View style={styles.pendingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Pending Requests
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>{pendingRequests.length}</Text>
              </View>
            </Text>
          </View>
          <FlatList
            data={pendingRequests}
            keyExtractor={(item) => item.id}
            renderItem={renderPendingItem}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Friends List */}
      <View style={styles.friendsList}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Friends</Text>
        </View>
        {friends.length > 0 ? (
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={renderFriendItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>👥</Text>
            <Text style={styles.emptyStateText}>No friends yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add some friends to start being clingy! 💕
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}