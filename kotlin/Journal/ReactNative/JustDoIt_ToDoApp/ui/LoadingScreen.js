//Loading Screen

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { colors } from '../common/colors'

const { width, height } = Dimensions.get('window')

const LoadingScreen = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.theme)
  const theme = isDarkMode ? colors.dark : colors.light
  
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  
  const dot1Anim = useRef(new Animated.Value(0)).current
  const dot2Anim = useRef(new Animated.Value(0)).current
  const dot3Anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()

    // Loading dots animation
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Anim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot2Anim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot3Anim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot1Anim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(dot2Anim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(dot3Anim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => animateDots())
    }
    
    const dotTimer = setTimeout(animateDots, 500)
    // Auto navigate to Home after 3 seconds
    const navigationTimer = setTimeout(() => {
      navigation.navigate('MainApp')
    }, 3000)

    return () => {
      clearTimeout(dotTimer)
      clearTimeout(navigationTimer)
    }
  }, [navigation, fadeAnim, scaleAnim, dot1Anim, dot2Anim, dot3Anim])

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* App Logo/Image */}
      <Animated.View 
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image 
          source={require('../assets/android-logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* App Name */}
      <Animated.View 
        style={[
          styles.textContainer,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={[styles.appName, { color: theme.textColor }]}>
          JustDoIt
        </Text>
        <Text style={[styles.tagline, { color: theme.textSecondary }]}>
          Turn your ideas into actions
        </Text>
      </Animated.View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingDots}>
          <Animated.View 
            style={[
              styles.dot, 
              { 
                backgroundColor: theme.primary,
                opacity: dot1Anim,
                transform: [{ scale: dot1Anim }]
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.dot, 
              { 
                backgroundColor: theme.primary,
                opacity: dot2Anim,
                transform: [{ scale: dot2Anim }]
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.dot, 
              { 
                backgroundColor: theme.primary,
                opacity: dot3Anim,
                transform: [{ scale: dot3Anim }]
              }
            ]} 
          />
        </View>
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Loading...
        </Text>
      </View>

      {/* Decorative Elements */}
      <View style={[styles.decorativeCircle1, { backgroundColor: theme.primary + '10' }]} />
      <View style={[styles.decorativeCircle2, { backgroundColor: theme.primary + '15' }]} />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  loadingText: {
    fontSize: 16,
    letterSpacing: 1,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -100,
    right: -100,
    opacity: 0.3,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    bottom: -75,
    left: -75,
    opacity: 0.2,
  },
})
