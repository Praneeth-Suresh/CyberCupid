"use client";

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

const { width: screenWidth } = Dimensions.get("window");

// Constants
const SECURE_SCORE = 73;
const MONTHLY_PROGRESS = [45, 62, 38, 71, 55, 48, 67, 73, 41, 59, 66, 52];
const YEARLY_PROGRESS = [
  520, 680, 590, 720, 650, 580, 710, 690, 620, 750, 680, 640,
];
const SECURE_POINTS_TODAY = 78;
const DAILY_GOAL = 100;

const STOCK_PHOTOS = [
  require("./ProfileImages/stock1.jpeg"),
  require("./ProfileImages/stock2.jpeg"),
  require("./ProfileImages/stock3.jpeg"),
  require("./ProfileImages/stock4.jpeg"),
  require("./ProfileImages/stock5.jpeg"),
  require("./ProfileImages/stock6.jpeg"),
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("Stats");
  const [statsView, setStatsView] = useState("Monthly");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // User data state
  const [userData, setUserData] = useState({
    name: "Catherine",
    phone: "+65 9876 5432",
    birthDate: "02-05-1997",
    email: "abcqwertyui@gmail.com",
    ageRange: "22-34",
    maxDistance: "10 km",
  });

  const shareProgress = async () => {
    try {
      await Share.share({
        message: `Check out my cybersecurity progress! I've achieved a ${SECURE_SCORE} Secure Score this month! 🔒✨ #CyberCupid #CyberSecurity`,
        title: "My Cybersecurity Progress",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out") },
    ]);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    setShowDeleteConfirm(false);
    Alert.alert(
      "Account Deleted",
      "Your account has been successfully deleted."
    );
  };

  const getChartData = () => {
    if (statsView === "Monthly") {
      return {
        labels: ["1", "5", "10", "15", "20", "25", "30"],
        datasets: [
          {
            data: [45, 62, 38, 71, 55, 48, 67],
          },
        ],
      };
    } else if (statsView === "Yearly") {
      return {
        labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
        datasets: [
          {
            data: [520, 590, 650, 710, 620, 680],
          },
        ],
      };
    }
    return null;
  };

  const renderStatsContent = () => {
    if (statsView === "Daily") {
      return (
        <View style={styles.dailyStats}>
          <View style={styles.dailyStatsCard}>
            <Text style={styles.dailyStatsText}>
              You've gathered{" "}
              <Text style={styles.highlightText}>{SECURE_POINTS_TODAY}</Text>{" "}
              secure points today.
            </Text>
            <Text style={styles.dailyStatsText}>
              You've got{" "}
              <Text style={styles.highlightText}>
                {DAILY_GOAL - SECURE_POINTS_TODAY}
              </Text>{" "}
              more to reach your daily goal.
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(SECURE_POINTS_TODAY / DAILY_GOAL) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {SECURE_POINTS_TODAY}/{DAILY_GOAL} points
            </Text>
          </View>
        </View>
      );
    }

    const chartData = getChartData();
    if (!chartData) return null;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>
            {statsView === "Monthly" ? "April, 2025" : "2025"}
          </Text>
        </View>
        <BarChart
          data={chartData}
          width={screenWidth - 80}
          height={200}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
          style={styles.chart}
          showValuesOnTopOfBars
          withInnerLines={false}
        />
        <View style={styles.chartFooter}>
          <Text style={styles.encouragementTitle}>
            You're off to a great start!
          </Text>
          <Text style={styles.encouragementSubtitle}>
            Challenges left to conquer
          </Text>
          <Text style={styles.challengesLeft}>23</Text>
        </View>
      </View>
    );
  };

  const renderPhotosContent = () => (
    <View style={styles.mediaGrid}>
      {STOCK_PHOTOS.map((photo, index) => (
        <TouchableOpacity key={index} style={styles.mediaItem}>
          <Image source={photo} style={styles.mediaImage} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderVideosContent = () => (
    <View style={styles.mediaGrid}>
      {STOCK_PHOTOS.map((photo, index) => (
        <TouchableOpacity key={index} style={styles.mediaItem}>
          <Image source={photo} style={styles.mediaImage} />
          <View style={styles.videoOverlay}>
            <Ionicons name="play" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={["#FF6B9D", "#4ECDC4", "#45B7D1"]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setShowEditModal(true)}
            >
              <Ionicons name="create-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("./ProfileImages/profile-avatar.jpg")}
                style={styles.profileImage}
              />
              <View style={styles.editImageButton}>
                <Ionicons name="camera" size={16} color="white" />
              </View>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreNumber}>{SECURE_SCORE}</Text>
              <Text style={styles.scoreLabel}>Secure Score</Text>
            </View>
          </View>

          <Text style={styles.username}>@Catherine12</Text>
          <Text style={styles.bio}>
            My name is Catherine. I like dancing in the rain and travelling all
            around the world.
          </Text>
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Stats", "Photos", "Videos"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === "Stats" && (
            <>
              {/* Safety Progress Header */}
              <View style={styles.safetyProgressHeader}>
                <Text style={styles.safetyProgressTitle}>
                  Your Safety Progress
                </Text>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={shareProgress}
                >
                  <LinearGradient
                    colors={["#8B5CF6", "#A855F7"]}
                    style={styles.shareButtonGradient}
                  >
                    <Ionicons name="share-outline" size={20} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Stats View Selector */}
              <View style={styles.statsSelector}>
                {["Daily", "Monthly", "Yearly"].map((view) => (
                  <TouchableOpacity
                    key={view}
                    style={[
                      styles.statsSelectorButton,
                      statsView === view && styles.activeStatsSelector,
                    ]}
                    onPress={() => setStatsView(view)}
                  >
                    <Text
                      style={[
                        styles.statsSelectorText,
                        statsView === view && styles.activeStatsSelectorText,
                      ]}
                    >
                      {view}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {renderStatsContent()}
            </>
          )}

          {activeTab === "Photos" && renderPhotosContent()}
          {activeTab === "Videos" && renderVideosContent()}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Account Settings */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Account Settings</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={userData.name}
                  onChangeText={(text) =>
                    setUserData({ ...userData, name: text })
                  }
                  placeholder="Name"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={userData.phone}
                  onChangeText={(text) =>
                    setUserData({ ...userData, phone: text })
                  }
                  placeholder="Phone"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={userData.birthDate}
                  onChangeText={(text) =>
                    setUserData({ ...userData, birthDate: text })
                  }
                  placeholder="Birth Date"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
                  }
                  placeholder="Email"
                />
              </View>
            </View>

            {/* Plan Settings */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Plan Settings</Text>
              <View style={styles.planRow}>
                <Text style={styles.planLabel}>Current Plan</Text>
                <Text style={styles.planValue}>Free</Text>
              </View>
            </View>

            {/* Discovery Settings */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Discovery Settings</Text>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Location</Text>
                <Text style={styles.settingValue}>My Current Location</Text>
              </View>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Preferred Languages</Text>
                <Text style={styles.settingValue}>English</Text>
              </View>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Show Me</Text>
                <Text style={styles.settingValue}>Men</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Age Range</Text>
                <TextInput
                  style={styles.input}
                  value={userData.ageRange}
                  onChangeText={(text) =>
                    setUserData({ ...userData, ageRange: text })
                  }
                  placeholder="Age Range"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Maximum Distance</Text>
                <TextInput
                  style={styles.input}
                  value={userData.maxDistance}
                  onChangeText={(text) =>
                    setUserData({ ...userData, maxDistance: text })
                  }
                  placeholder="Maximum Distance"
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.saveButton}>
                <LinearGradient
                  colors={["#8B5CF6", "#A855F7"]}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>SAVE</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.deleteButtonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteConfirm} transparent animationType="fade">
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.confirmTitle}>Delete Account</Text>
            <Text style={styles.confirmMessage}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={confirmDeleteAccount}
              >
                <Text style={styles.confirmDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  editButton: {
    padding: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "white",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  scoreLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginTop: -15,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#333",
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  safetyProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  safetyProgressTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  shareButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  shareButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  statsSelector: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  statsSelectorButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeStatsSelector: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsSelectorText: {
    fontSize: 14,
    color: "#666",
  },
  activeStatsSelectorText: {
    color: "#333",
    fontWeight: "600",
  },
  dailyStats: {
    alignItems: "center",
  },
  dailyStatsCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
  },
  dailyStatsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  highlightText: {
    fontWeight: "bold",
    color: "#8B5CF6",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5e5e5",
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  chartContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  chart: {
    borderRadius: 16,
  },
  chartFooter: {
    alignItems: "center",
    marginTop: 20,
  },
  encouragementTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  encouragementSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  challengesLeft: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8B5CF6",
  },
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  mediaItem: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  videoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  planLabel: {
    fontSize: 16,
    color: "#333",
  },
  planValue: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  settingValue: {
    fontSize: 16,
    color: "#007AFF",
  },
  actionButtons: {
    marginTop: 32,
    marginBottom: 40,
  },
  saveButton: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 16,
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  logoutButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 16,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "500",
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  confirmModal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  confirmMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  confirmButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  confirmDeleteButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  confirmDeleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
