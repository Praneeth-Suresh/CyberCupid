"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"

export default function PhotoUpload({ navigation }) {
  const [photos, setPhotos] = useState(Array(6).fill(null))

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert("Permission needed", "Camera and photo library access is required to upload photos.")
      return false
    }
    return true
  }

  const showImagePicker = async (index) => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    Alert.alert("Select Photo", "Choose how you want to add your photo", [
      { text: "Camera", onPress: () => openCamera(index) },
      { text: "Gallery", onPress: () => openGallery(index) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const openCamera = async (index) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      const newPhotos = [...photos]
      newPhotos[index] = result.assets[0].uri
      setPhotos(newPhotos)
    }
  }

  const openGallery = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      const newPhotos = [...photos]
      newPhotos[index] = result.assets[0].uri
      setPhotos(newPhotos)
    }
  }

  const handleAdd = () => {
    navigation.navigate("PhotoVerification")
  }

  const GuidelineItem = ({ icon, text, color }) => (
    <View style={styles.guidelineItem}>
      <View style={[styles.guidelineIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#ffffff" />
      </View>
      <Text style={styles.guidelineText}>{text}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.content}>
        <Text style={styles.title}>Add your photos</Text>

        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <TouchableOpacity key={index} style={styles.photoSlot} onPress={() => showImagePicker(index)}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <Ionicons name="camera" size={40} color="#cccccc" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.guidelinesContainer}>
          <Text style={styles.guidelinesTitle}>Photo Guidelines</Text>
          <View style={styles.guidelines}>
            <GuidelineItem icon="person" text="Clear face" color="#10B981" />
            <GuidelineItem icon="glasses" text="No sunglasses" color="#EF4444" />
            <GuidelineItem icon="people" text="No group" color="#EF4444" />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <LinearGradient
            colors={["#8B5CF6", "#A855F7"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>ADD</Text>
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
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  photoSlot: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderStyle: "dashed",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  guidelinesContainer: {
    marginTop: 20,
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
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
