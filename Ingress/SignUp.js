import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Oops! The sign up page is not here.</Text>
      <Image 
        source={{ uri: 'https://i.ytimg.com/vi/g8RrrlSzCU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBWlCxYmg1awj0kMu6rapfVWNK0Vg' }} 
        style={styles.image}
      />
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
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SignUpPage;