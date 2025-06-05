import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Preferences({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("PhotoUpload")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to CyberCupid</Text>

        <View style={styles.textContainer}>
          <Text style={styles.description}>
            Choosing CyberCupid is not just about connecting, it is connecting safely.
          </Text>

          <Text style={styles.description}>
            Our goal is to make you more aware about dating securely and avoiding threats and scams.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <LinearGradient
            colors={["#8B5CF6", "#A855F7"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 40,
  },
  textContainer: {
    gap: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})
