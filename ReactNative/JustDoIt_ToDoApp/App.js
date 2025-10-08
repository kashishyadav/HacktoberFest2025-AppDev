import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View, useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from './redux/Action';
import { colors } from './common/colors';

// Import your existing navigation
import StackNavigator from './navigation/stackNavigaton';

export default function App() {
  const systemColorScheme = useColorScheme();
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const theme = isDarkMode ? colors.dark : colors.light;

  useEffect(() => {
    if (systemColorScheme) {
      dispatch(setTheme(systemColorScheme === 'dark'));
    }
  }, [systemColorScheme, dispatch]);

  return (
    <SafeAreaProvider>
      <View style={{ 
        flex: 1, 
        backgroundColor: theme.backgroundColor,
        paddingTop: Platform.OS === 'android' ? 25 : 0 
      }}>
        <StatusBar 
          style={isDarkMode ? "light" : "dark"} 
        />
        <StackNavigator />
      </View>
    </SafeAreaProvider>
  );
}
