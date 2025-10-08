import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { colors } from '../common/colors';

// Import Screens
import HomeScreen from "../ui/HomeScreen";
import SettingsScreen from "../ui/SettingsScreen";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  const { isDarkMode } = useSelector(state => state.theme);
  const theme = isDarkMode ? colors.dark : colors.light;

  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          backgroundColor: theme.cardBackground,
          borderTopWidth: 1,
          borderTopColor: theme.borderColor,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          shadowColor: theme.shadow,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          color: theme.textColor,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarBackground: () => (
          <View style={{
            backgroundColor: theme.cardBackground,
            flex: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }} />
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Tasks',
          tabBarLabel: 'Tasks',
          tabBarBadgeStyle: {
            backgroundColor: theme.primary,
            color: '#fff',
          },
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainStack;