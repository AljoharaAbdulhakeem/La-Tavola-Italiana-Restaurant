import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  // Create animated values
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const slideAnim = useRef(new Animated.Value(100)).current; // Initial position off screen

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Target opacity
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Target position
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ImageBackground source={require('./assets/backgroundWelcome.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.title}>Priority Planner</Text>
          <Text style={styles.text}>Plan your future now</Text>
        </Animated.View>
        
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 200,
    paddingHorizontal: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Adding transparency over the background image
  },
  title: {
    fontSize: 40,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    justifyContent: 'center',
    fontWeight: 'normal',
    color: '#fff',
    marginBottom: 35,
    textAlign: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#513460',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
