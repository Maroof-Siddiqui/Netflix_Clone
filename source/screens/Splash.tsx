import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const SplashScreen = () => {
  const translateYAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Configure the fade-in animation
    const fadeInAnimation = Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1500, // Adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 2000, // Adjust the duration as needed
        useNativeDriver: true,
      }),
    ]);

    // Start the fade-in animation
    fadeInAnimation.start();

    // Navigate to HomeScreen after the animation completes
    const navigateToHome = setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000); // Adjust the delay as needed

    return () => {
      // Clean up the animation and navigation timeout when the component unmounts
      fadeInAnimation.stop();
      clearTimeout(navigateToHome);
    };
  }, [translateYAnim, opacityAnim, navigation]);

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        style={[
          styles.logo,
          { transform: [{ translateY: translateYAnim }], opacity: opacityAnim },
        ]}
        source={require('../assets/Netflix_Logo.png')}
      />
      <Animated.Text
        style={[
          styles.text,
          { transform: [{ translateY: translateYAnim }], opacity: opacityAnim },
        ]}
      >
        Internship Task
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 400,
    height: 100,
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
    margin: 10,
    padding: 4,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#e50914',
    position:'absolute',
    bottom:20,
  },
});

export default SplashScreen;
