import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import alert from "../assets/alert";

const LoginGoogle = () => {
  const showAlert = () => {
    console.log("Pressable triggered function");

    alert(
      "Alert Title",
      "This is an alert message.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Oops! Google OAuth has not been set up yet ;-;
      </Text>
      <Image
        source={{
          uri: "https://i.ytimg.com/vi/g8RrrlSzCU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBWlCxYmg1awj0kMu6rapfVWNK0Vg",
        }}
        style={styles.image}
      />
      <Pressable onPress={showAlert}>
        <Text>This Pressable is used to check whether Alert works or not.</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginLeft: '10%',
    marginRight: '10%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default LoginGoogle;