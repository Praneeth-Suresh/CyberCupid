import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function PrivacyNotice({ navigation }) {
  const handleAccept = () => {
    // Navigate to main app or complete signup
    console.log("User accepted privacy notice")
    // navigation.navigate('MainApp'); // Uncomment when you have main app
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to CyberCupid</Text>

        <View style={styles.textContainer}>
          <Text style={styles.description}>
            Cybersecurity is a skill—just like any other—that improves with practice. To help you stay sharp, CyberCupid
            will occasionally run realistic cyber threat simulations in dating scenarios to test your readiness.
          </Text>

          <Text style={styles.description}>
            The best part? You're in control. We'll only proceed if you choose to participate.
          </Text>

          <Text style={styles.highlightText}>
            Ready to put your skills to the test? Let's strengthen your defences together and make connecting a safe
            space for all !
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <LinearGradient
            colors={["#8B5CF6", "#A855F7"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>I ACCEPT</Text>
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
  highlightText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    fontWeight: "500",
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
