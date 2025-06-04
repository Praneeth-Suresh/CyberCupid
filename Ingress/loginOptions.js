import React, { useEffect, useRef } from 'react'; // Import React, useEffect and useRef
import { Modal, Animated, View, Text, Pressable, StyleSheet, StatusBar as NativeStatusBar, Platform, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={login_styles.container}>
      {/* Header Text */}
      <Text style={login_styles.headerText}>
        By clicking Log In, you agree with our{" "}
        <Text style={login_styles.linkText}>Terms</Text>. Learn how we process
        your data in our{" "}
        <Text style={login_styles.linkText}>Privacy Policy</Text> and{" "}
        <Text style={login_styles.linkText}>Cookies Policy</Text>.
      </Text>

      {/* Login Options */}
      <View style={login_styles.loginOptions}>
        {/* Google Login */}
        <Pressable
          onPress={() => navigation.navigate("LoginGoogle")}
          style={login_styles.loginButton}
        >
          <View style={login_styles.buttonContent}>
            <Text style={login_styles.buttonIcon}>G</Text>
            <Text style={login_styles.buttonText}>LOGIN WITH GOOGLE</Text>
          </View>
        </Pressable>

        {/* Email Login */}
        <Pressable
          onPress={() => navigation.navigate("LoginEmail")}
          style={login_styles.loginButton}
        >
          <View style={login_styles.buttonContent}>
            <Text style={login_styles.buttonIcon}>f</Text>
            <Text style={login_styles.buttonText}>LOGIN WITH EMAIL</Text>
          </View>
        </Pressable>

        {/* Phone Login */}
        <Pressable
          onPress={() => navigation.navigate("LoginPhone")}
          style={login_styles.loginButton}
        >
          <View style={login_styles.buttonContent}>
            <Text style={login_styles.buttonIcon}>↔</Text>
            <Text style={login_styles.buttonText}>LOGIN WITH PHONE</Text>
          </View>
        </Pressable>
      </View>

      {/* Signup Footer */}
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={{ alignSelf: "center" }}
      >
        <Text style={login_styles.footerText}>
          Don't have account?{" "}
          <Text style={login_styles.signupLink}>Signup</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const login_styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 5,
    justifyContent: "space-between",
  },
  headerText: {
    textAlign: "center",
    color: "#E0D7F7", // Light lavender
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    width: "75%",
    alignSelf: "center",
  },
  linkText: {
    color: "#FFD700", // Gold for contrast
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  loginOptions: {
    marginVertical: 30,
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    borderWidth: 2,
    borderColor: "#B39DDB", // Lighter purple
    borderRadius: 12,
    paddingVertical: 18,
    marginBottom: 18,
    backgroundColor: "#8F5FE8", // Medium purple
    width: "75%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 14,
    color: "#FFD700", // Gold
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFF", // White for contrast
    letterSpacing: 1,
  },
  footer: {
    marginBottom: 30,
    alignItems: "center",
    width: "75%",
    alignSelf: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#E0D7F7", // Light lavender
  },
  signupLink: {
    color: "#FFD700", // Gold
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;