import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import alert from "../assets/alert";

export default function PhotoVerification({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Take picture handler (CameraView does not expose takePictureAsync directly, so you may need to use ref with imperative handle)
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        alert(
          "Photo Captured",
          "Identity verification photo taken successfully!",
          [{ text: "OK", onPress: () => navigation.navigate("PrivacyNotice") }]
        );
      } catch (error) {
        alert("Error", "Failed to take photo. Please try again.");
      }
    }
  };

  const GuidelineItem = ({ icon, text, color }) => (
    <View style={styles.guidelineItem}>
      <View style={[styles.guidelineIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#ffffff" />
      </View>
      <Text style={styles.guidelineText}>{text}</Text>
    </View>
  );

  if (!cameraPermission) {
    // Permissions are still loading
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Permissions not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>
            Camera access is required for identity verification
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        <Text style={styles.title}>Verify your Identity</Text>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            enableTorch={false}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.captureCircle} />
            </View>
          </CameraView>
        </View>
        <View style={styles.guidelinesContainer}>
          <View style={styles.guidelines}>
            <GuidelineItem icon="person" text="Clear face" color="#10B981" />
            <GuidelineItem
              icon="glasses"
              text="No sunglasses"
              color="#EF4444"
            />
            <GuidelineItem icon="people" text="No group" color="#EF4444" />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <LinearGradient
            colors={["#8B5CF6", "#A855F7"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>CLICK PHOTO</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 40,
  },
  cameraContainer: {
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 40,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  captureCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#8B5CF6",
    borderStyle: "dashed",
  },
  guidelinesContainer: {
    marginTop: 20,
  },
  guidelines: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  guidelineItem: {
    alignItems: "center",
    gap: 8,
  },
  guidelineIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  guidelineText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
});
