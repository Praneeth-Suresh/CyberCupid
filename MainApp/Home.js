import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Oops! Magic is happening with the home page</Text>
      <Image 
        source={{ uri: 'https://marketplace.canva.com/EADaopqOIOo/1/0/1600w/canva-pink-and-blue-floral-apology-card-3WqoT_W5JMw.jpg' }} 
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
    marginLeft: '10%',
    marginRight: '10%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Home;