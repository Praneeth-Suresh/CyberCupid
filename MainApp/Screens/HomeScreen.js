"use client"

import { useState, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  PanGestureHandler,
  Dimensions,
  Modal,
} from "react-native"
import { GestureHandlerRootView, State } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import Slider from "@react-native-community/slider"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const profiles = [
  {
    id: 1,
    name: "Rex",
    age: 27,
    distance: "5 miles",
    image: "/images/profile1.jpg",
  },
  {
    id: 2,
    name: "Alex",
    age: 24,
    distance: "7 miles",
    image: "/images/profile2.jpg",
  },
  {
    id: 3,
    name: "John",
    age: 24,
    distance: "7 miles",
    image: "/images/profile3.jpg",
  },
  {
    id: 4,
    name: "Mike",
    age: 29,
    distance: "3 miles",
    image: "/images/profile4.jpg",
  },
]

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedGender, setSelectedGender] = useState("Male")
  const [ageRange, setAgeRange] = useState([22, 34])
  const [distance, setDistance] = useState("0 km-10 km")

  const translateX = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const rotate = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(1)).current

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX, translationY: translateY } }], {
    useNativeDriver: true,
  })

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent
      const threshold = screenWidth * 0.3

      if (Math.abs(translationX) > threshold) {
        // Swipe animation
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: translationX > 0 ? screenWidth : -screenWidth,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Reset and move to next card
          setCurrentIndex((prev) => (prev + 1) % profiles.length)
          translateX.setValue(0)
          translateY.setValue(0)
          rotate.setValue(0)
          opacity.setValue(1)
        })
      } else {
        // Snap back
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start()
      }
    }
  }

  const handleLike = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length)
      translateX.setValue(0)
      translateY.setValue(0)
      rotate.setValue(0)
      opacity.setValue(1)
    })
  }

  const handleReject = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length)
      translateX.setValue(0)
      translateY.setValue(0)
      rotate.setValue(0)
      opacity.setValue(1)
    })
  }

  const rotateInterpolate = translateX.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  })

  const likeOpacity = translateX.interpolate({
    inputRange: [0, screenWidth / 4],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const rejectOpacity = translateX.interpolate({
    inputRange: [-screenWidth / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  const currentProfile = profiles[currentIndex]

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <LinearGradient colors={["#8B5CF6", "#A855F7"]} style={styles.logoGradient}>
                <Text style={styles.logoSymbol}>{"<>"}</Text>
              </LinearGradient>
            </View>
            <Text style={styles.logoText}>CyberCupid</Text>
          </View>
          <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ translateX }, { translateY }, { rotate: rotateInterpolate }],
                  opacity,
                },
              ]}
            >
              <Image source={{ uri: currentProfile.image }} style={styles.cardImage} />

              {/* Overlay Icons */}
              <Animated.View style={[styles.likeOverlay, { opacity: likeOpacity }]}>
                <View style={styles.likeIcon}>
                  <Ionicons name="heart" size={60} color="#8B5CF6" />
                </View>
              </Animated.View>

              <Animated.View style={[styles.rejectOverlay, { opacity: rejectOpacity }]}>
                <View style={styles.rejectIcon}>
                  <Ionicons name="close" size={60} color="#EF4444" />
                </View>
              </Animated.View>

              {/* Profile Info */}
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.cardGradient}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>
                    {currentProfile.name}, {currentProfile.age}
                  </Text>
                  <Text style={styles.cardDistance}>{currentProfile.distance}</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </PanGestureHandler>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Ionicons name="heart" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter Modal */}
        <Modal visible={showFilter} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <View style={styles.filterHeader}>
                <TouchableOpacity onPress={() => setShowFilter(false)}>
                  <Ionicons name="arrow-back" size={24} color="#666" />
                </TouchableOpacity>
                <Text style={styles.filterTitle}>Filter</Text>
                <TouchableOpacity onPress={() => setShowFilter(false)}>
                  <Ionicons name="checkmark" size={24} color="#8B5CF6" />
                </TouchableOpacity>
              </View>

              <View style={styles.filterContent}>
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Distance</Text>
                  <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{distance}</Text>
                    <Ionicons name="chevron-down" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Gender</Text>
                  <View style={styles.genderButtons}>
                    {["Male", "Female", "Bisexual"].map((gender) => (
                      <TouchableOpacity
                        key={gender}
                        style={[styles.genderButton, selectedGender === gender && styles.genderButtonActive]}
                        onPress={() => setSelectedGender(gender)}
                      >
                        <Text
                          style={[styles.genderButtonText, selectedGender === gender && styles.genderButtonTextActive]}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Age</Text>
                  <View style={styles.ageContainer}>
                    <Text style={styles.ageText}>{ageRange[0]}</Text>
                    <View style={styles.sliderContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={18}
                        maximumValue={50}
                        value={ageRange[0]}
                        onValueChange={(value) => setAgeRange([Math.round(value), ageRange[1]])}
                        minimumTrackTintColor="#8B5CF6"
                        maximumTrackTintColor="#E5E5E5"
                        thumbStyle={styles.sliderThumb}
                      />
                      <Slider
                        style={styles.slider}
                        minimumValue={18}
                        maximumValue={50}
                        value={ageRange[1]}
                        onValueChange={(value) => setAgeRange([ageRange[0], Math.round(value)])}
                        minimumTrackTintColor="#8B5CF6"
                        maximumTrackTintColor="#E5E5E5"
                        thumbStyle={styles.sliderThumb}
                      />
                    </View>
                    <Text style={styles.ageText}>{ageRange[1]}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    marginRight: 8,
  },
  logoGradient: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSymbol: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  filterButton: {
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: screenWidth - 40,
    height: screenHeight * 0.65,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  cardInfo: {
    alignItems: "flex-start",
  },
  cardName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  cardDistance: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  likeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  likeIcon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rejectOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  rejectIcon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 60,
    paddingVertical: 30,
  },
  rejectButton: {
    backgroundColor: "#EF4444",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  likeButton: {
    backgroundColor: "#8B5CF6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  filterModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: screenHeight * 0.8,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  filterContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  genderButtons: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  genderButtonActive: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  genderButtonText: {
    fontSize: 14,
    color: "#666",
  },
  genderButtonTextActive: {
    color: "white",
  },
  ageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  ageText: {
    fontSize: 16,
    color: "#333",
    minWidth: 30,
  },
  sliderContainer: {
    flex: 1,
    position: "relative",
  },
  slider: {
    width: "100%",
    height: 40,
    position: "absolute",
  },
  sliderThumb: {
    backgroundColor: "#8B5CF6",
    width: 20,
    height: 20,
  },
})
