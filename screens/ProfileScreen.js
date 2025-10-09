// screens/ProfileScreen.js
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ProfileScreenStyles as styles } from '../styles/ProfileScreen.styles';
import { Theme } from '../styles/Theme';

export default function ProfileScreen({ navigation }) {
  const [settings, setSettings] = useState({
    notifications: true,
    locationSharing: true,
    showOnlineStatus: true,
    clingyMode: true,
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    description, 
    type = 'toggle', 
    value, 
    onPress,
    isFirst = false,
    isLast = false 
  }) => (
    <TouchableOpacity 
      style={[
        styles.settingItem,
        isFirst && styles.settingFirstItem,
        isLast && styles.settingLastItem
      ]}
      onPress={onPress}
      disabled={type === 'toggle'}
    >
      <View style={styles.settingInfo}>
        <View style={styles.settingIcon}>
          <Text>{icon}</Text>
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      {type === 'toggle' ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#767577', true: Theme.colors.primary }}
          thumbColor={value ? '#FFF' : '#f4f3f4'}
        />
      ) : (
        <Text style={styles.settingValue}>›</Text>
      )}
    </TouchableOpacity>
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
        <Text style={styles.title}>Profile</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={{ color: '#FFF' }}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Your Name</Text>
          <Text style={styles.userBio}>Professional clinger 💕 Always missing you 🥺</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Updates</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Privacy & Sharing</Text>
          <SettingItem
            icon="📍"
            title="Location Sharing"
            description="Let friends see your location"
            type="toggle"
            value={settings.locationSharing}
            onPress={() => toggleSetting('locationSharing')}
            isFirst={true}
          />
          <SettingItem
            icon="🟢"
            title="Online Status"
            description="Show when you're online"
            type="toggle"
            value={settings.showOnlineStatus}
            onPress={() => toggleSetting('showOnlineStatus')}
          />
          <SettingItem
            icon="💕"
            title="Clingy Mode"
            description="Extra clingy notifications"
            type="toggle"
            value={settings.clingyMode}
            onPress={() => toggleSetting('clingyMode')}
            isLast={true}
          />
        </View>

        {/* Notifications */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingItem
            icon="🔔"
            title="Push Notifications"
            description="Receive app notifications"
            type="toggle"
            value={settings.notifications}
            onPress={() => toggleSetting('notifications')}
            isFirst={true}
          />
          <SettingItem
            icon="💬"
            title="Message Sounds"
            description="Play sounds for new messages"
            type="toggle"
            value={true}
            onPress={() => {}}
            isLast={true}
          />
        </View>

        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon="✏️"
            title="Edit Profile"
            type="navigation"
            onPress={() => Alert.alert('Coming soon!')}
            isFirst={true}
          />
          <SettingItem
            icon="🛡️"
            title="Privacy & Security"
            type="navigation"
            onPress={() => Alert.alert('Coming soon!')}
          />
          <SettingItem
            icon="💬"
            title="Support"
            type="navigation"
            onPress={() => Alert.alert('Coming soon!')}
          />
          <SettingItem
            icon="ℹ️"
            title="About"
            type="navigation"
            onPress={() => Alert.alert('Coming soon!')}
            isLast={true}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text>🚪</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}