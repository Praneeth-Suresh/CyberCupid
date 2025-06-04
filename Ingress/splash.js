import React, { useEffect, useRef } from 'react'; // Import React, useEffect and useRef
import { Animated, View, Text, TouchableOpacity, StyleSheet, StatusBar as NativeStatusBar, Platform, Image } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient'; // Or from 'react-native-linear-gradient'
import LoginScreen from './loginOptions';

const colors = {
  primaryDark: '#7512b2',
  primaryLight: '#bd94d7',
  white: '#ffffff',
  black: '#000000',
};

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};



export default function SplashScreen() {
  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primaryLight]}
      style={styles.container}
    >

    <View style={styles.container}>
    <Image
    source={require('../assets/logo.png')} // Reference the local image
    style={styles.image}
    />
    </View>

    <View style={styles.bottomSection}>
      <FadeInView
      style={{
          width: '100%',
          height: 50,
          backgroundColor: 'powderblue',
      }}>
        <LoginScreen/>
      </FadeInView>
    </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // h-screen w-full
    flexDirection: 'column', // flex-col
    alignItems: 'center', // items-center
    justifyContent: 'center', // justify-center
  },
  // Status Bar
  statusBarContainer: {
    position: 'absolute', // absolute
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16, // p-4 (horizontal)
    paddingVertical: 16, // p-4 (vertical)
    paddingTop: (Platform.OS === 'android' ? NativeStatusBar.currentHeight : 44) + 16, // Adjust for system status bar + original padding
    flexDirection: 'row', // flex
    justifyContent: 'space-between', // justify-between
  },
  statusBarText: {
    color: colors.white, // text-white
    fontSize: 16, // Example size, adjust as needed
  },
  statusBarIconsContainer: {
    flexDirection: 'row', // flex
    alignItems: 'center', // items-center
    gap: 4, // gap-1 (4px). Requires RN 0.71+. Use margins for older versions.
  },
  iconWrapperSmall: {
    height: 12, // h-3
    width: 16,  // w-4
  },
  batteryIconOuter: {
    height: 12, // h-3
    width: 24,  // w-6
    borderWidth: 1, // border
    borderColor: colors.white, // border-white
    borderRadius: 2, // rounded-sm (0.125rem ~ 2px)
    position: 'relative', // relative
  },
  batteryIconInner: {
    position: 'absolute', // absolute
    top: 2, // top-0.5 (0.5 * 4px = 2px)
    bottom: 2, // bottom-0.5
    left: 2, // left-0.5
    right: 4, // right-1 (1 * 4px = 4px)
    backgroundColor: colors.white, // bg-white
  },
  image: {
    width: 200,  // Adjust as needed
    height: 200, // Adjust as needed
    position: 'absolute',
    top: '75%', // Position image in the top 1/3 of the screen
  },
  bottomSection: {
    flex: 2, // h-screen w-full
    flexDirection: 'column', // flex-col
    alignItems: 'center', // items-center
    justifyContent: 'flex-start', // Align content to the top of this section
    paddingTop: '50%', // Add some padding from the top of this section
  },


});
