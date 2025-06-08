"use client"

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from "react-native-reanimated";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const profiles = [
  {
    id: 1,
    name: "Rex",
    age: 27,
    distance: "5 miles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHp5a0vcJ0p4yRgrTNdVO3wtf8tX1dXNvPlQ&s",
  },
  {
    id: 2,
    name: "Alex",
    age: 24,
    distance: "7 miles",
    image:
      "https://st2.depositphotos.com/1499736/7026/i/950/depositphotos_70267833-stock-photo-young-man-posing-sideways.jpg",
  },
  {
    id: 3,
    name: "John",
    age: 24,
    distance: "7 miles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26gTRTIBn2hN_l4qGFY6xv07qiol3vx7N5g&s",
  },
  {
    id: 4,
    name: "Mike",
    age: 29,
    distance: "3 miles",
    image:
      "https://st.depositphotos.com/1499736/4967/i/950/depositphotos_49670737-stock-photo-man-posing-with-hands-on.jpg",
  },
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Male");
  const [ageRange, setAgeRange] = useState([22, 34]);
  const [distance, setDistance] = useState("0 km-10 km");

  // Reanimated shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const nextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
    translateX.value = 0;
    translateY.value = 0;
    opacity.value = 1;
  };

  // Gesture handler using new Gesture API
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const threshold = screenWidth * 0.3;
      if (Math.abs(event.translationX) > threshold) {
        // Swipe away
        translateX.value = withSpring(
          event.translationX > 0 ? screenWidth : -screenWidth,
          {},
          () => {
            runOnJS(nextProfile)();
          }
        );
        opacity.value = withSpring(0);
      } else {
        // Snap back
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  // Animated styles for the card
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      {
        rotate: `${(translateX.value / (screenWidth / 2)) * 10}deg`,
      },
    ],
    opacity: opacity.value,
  }));

  // Like/Reject overlay opacities using interpolate from reanimated
  const likeOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, screenWidth / 4],
      [0, 1],
      "clamp"
    ),
  }));

  const rejectOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-screenWidth / 4, 0],
      [1, 0],
      "clamp"
    ),
  }));

  // Handle Like/Reject button presses with reanimated
  const handleLike = () => {
    translateX.value = withSpring(screenWidth, {}, () => {
      runOnJS(nextProfile)();
    });
    opacity.value = withSpring(0);
  };

  const handleReject = () => {
    translateX.value = withSpring(-screenWidth, {}, () => {
      runOnJS(nextProfile)();
    });
    opacity.value = withSpring(0);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo_home.png")} // Reference the local image
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            style={styles.filterButton}
          >
            <Ionicons name="filter" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.card, animatedCardStyle]}>
              <Image
                source={{ uri: currentProfile.image }}
                style={styles.cardImage}
              />

              {/* Overlay Icons */}
              <Animated.View style={[styles.likeOverlay, likeOverlayStyle]}>
                <View style={styles.likeIcon}>
                  <Ionicons name="heart" size={60} color="#8B5CF6" />
                </View>
              </Animated.View>

              <Animated.View style={[styles.rejectOverlay, rejectOverlayStyle]}>
                <View style={styles.rejectIcon}>
                  <Ionicons name="close" size={60} color="#EF4444" />
                </View>
              </Animated.View>

              {/* Profile Info */}
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.cardGradient}
              >
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>
                    {currentProfile.name}, {currentProfile.age}
                  </Text>
                  <Text style={styles.cardDistance}>
                    {currentProfile.distance}
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </GestureDetector>
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
                        style={[
                          styles.genderButton,
                          selectedGender === gender &&
                            styles.genderButtonActive,
                        ]}
                        onPress={() => setSelectedGender(gender)}
                      >
                        <Text
                          style={[
                            styles.genderButtonText,
                            selectedGender === gender &&
                              styles.genderButtonTextActive,
                          ]}
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
                        onValueChange={(value) =>
                          setAgeRange([Math.round(value), ageRange[1]])
                        }
                        minimumTrackTintColor="#8B5CF6"
                        maximumTrackTintColor="#E5E5E5"
                        thumbStyle={styles.sliderThumb}
                      />
                      <Slider
                        style={styles.slider}
                        minimumValue={18}
                        maximumValue={50}
                        value={ageRange[1]}
                        onValueChange={(value) =>
                          setAgeRange([ageRange[0], Math.round(value)])
                        }
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
  );
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
  image: {
    width: 200, // Adjust as needed
    height: 50, // Adjust as needed
    position: "absolute",
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
});
