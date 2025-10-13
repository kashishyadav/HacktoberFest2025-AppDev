import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { colors } from '../common/colors'
import { toggleTheme } from '../redux/Action'
import { MaterialIcons } from '@expo/vector-icons'


const SettingsScreen = () => {
  const { isDarkMode } = useSelector(state => state.theme)
  const theme = isDarkMode ? colors.dark : colors.light
  const dispatch = useDispatch()

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled)
  }

  const showAbout = () => {
    Alert.alert(
      'About JustDoIt',
      'JustDoIt v1.0.0\n\nA simple and beautiful task management app to help you stay organized and productive.\n\nDeveloped with ❤️ using React Native',
      [{ text: 'OK', style: 'default' }]
    )
  }

  const showHelp = () => {
    Alert.alert(
      'Help & Support',
      'Need help using JustDoIt?\n\n• Tap + to create a new task\n• Swipe left on tasks to delete\n• Tap on tasks to mark as complete\n• Use the theme toggle for dark/light mode\n\nFor more support, contact us at support@justdoit.com',
      [{ text: 'Got it!', style: 'default' }]
    )
  }

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, showArrow = true }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
          <MaterialIcons name={icon} size={24} color={theme.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: theme.textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightComponent}
        {showArrow && !rightComponent && (
          <MaterialIcons name="chevron-right" size={24} color={theme.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Settings</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Customize your JustDoIt experience
        </Text>
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Appearance</Text>

        <SettingItem
          icon="palette"
          title="Dark Mode"
          subtitle={isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: isDarkMode ? '#4a4a4a' : '#e0e0e0',
                true: theme.primary + '80'
              }}
              thumbColor={isDarkMode ? theme.primary : '#ffffff'}
              ios_backgroundColor={isDarkMode ? '#4a4a4a' : '#e0e0e0'}
            />
          }
          showArrow={false}
        />
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Notifications</Text>

        <SettingItem
          icon="notifications"
          title="Push Notifications"
          subtitle="Get reminded about your tasks"
          rightComponent={
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{
                false: isDarkMode ? '#4a4a4a' : '#e0e0e0',
                true: theme.primary + '80'
              }}
              thumbColor={notificationsEnabled ? theme.primary : '#ffffff'}
              ios_backgroundColor={isDarkMode ? '#4a4a4a' : '#e0e0e0'}
            />
          }
          showArrow={false}
        />

        <SettingItem
          icon="volume-up"
          title="Sound"
          subtitle="Enable notification sounds"
          rightComponent={
            <Switch
              value={soundEnabled}
              onValueChange={handleSoundToggle}
              trackColor={{
                false: isDarkMode ? '#4a4a4a' : '#e0e0e0',
                true: theme.primary + '80'
              }}
              thumbColor={soundEnabled ? theme.primary : '#ffffff'}
              ios_backgroundColor={isDarkMode ? '#4a4a4a' : '#e0e0e0'}
            />
          }
          showArrow={false}
        />
      </View>

      {/* General Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>General</Text>

        <SettingItem
          icon="help"
          title="Help & Support"
          subtitle="Get help using the app"
          onPress={showHelp}
        />

        <SettingItem
          icon="info"
          title="About"
          subtitle="App version and info"
          onPress={showAbout}
        />

        <SettingItem
          icon="star"
          title="Rate App"
          subtitle="Rate us on the app store"
          onPress={() => Alert.alert('Thank you!', 'Redirecting to app store...')}
        />

        <SettingItem
          icon="share"
          title="Share App"
          subtitle="Tell your friends about JustDoIt"
          onPress={() => Alert.alert('Share', 'Share functionality coming soon!')}
        />
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Account</Text>

        <SettingItem
          icon="cloud-upload"
          title="Backup Data"
          subtitle="Save your tasks to cloud"
          onPress={() => Alert.alert('Backup', 'Cloud backup feature coming soon!')}
        />

        <SettingItem
          icon="restore"
          title="Restore Data"
          subtitle="Restore from backup"
          onPress={() => Alert.alert('Restore', 'Restore feature coming soon!')}
        />

        <SettingItem
          icon="delete-forever"
          title="Clear All Data"
          subtitle="Delete all tasks and settings"
          onPress={() =>
            Alert.alert(
              'Clear All Data',
              'This will permanently delete all your tasks and settings. Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Cleared!', 'All data has been cleared.') }
              ]
            )
          }
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          JustDoIt v1.0.0
        </Text>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Made with ❤️ for productivity
        </Text>
      </View>
    </ScrollView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    opacity: 0.6,
  },
})