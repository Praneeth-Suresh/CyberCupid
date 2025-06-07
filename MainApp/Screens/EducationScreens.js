"use client"

import { useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import SecurityDashGame from "./GameComponents/SecurityDashGame"

export default function EducationScreen() {
  const [showGame, setShowGame] = useState(false)

  const openKaspersky = () => {
    Linking.openURL("https://www.kaspersky.com/")
  }

  const startGame = () => {
    setShowGame(true)
  }

  const closeGame = () => {
    setShowGame(false)
  }

  if (showGame) {
    return <SecurityDashGame onClose={closeGame} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Learn with CyberCupid</Text>

          {/* Daily Tip Card */}
          <TouchableOpacity style={styles.card} onPress={openKaspersky}>
            <LinearGradient colors={["#8B5CF6", "#A855F7"]} style={styles.dailyTipCard}>
              <Text style={styles.cardTitle}>Your Daily Tip</Text>
              <Text style={styles.cardSubtitle}>
                Email check don't click - verify first. Staying alert is your first defense.
              </Text>
              <Text style={styles.cardDescription}>
                Phishing scams can be more convincing than ever. Always verify the sender before clicking any links or
                downloading attachments.
              </Text>
              <View style={styles.tipIcon}>
                <Ionicons name="bulb" size={24} color="rgba(255,255,255,0.8)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Security Dash Card */}
          <TouchableOpacity style={styles.card} onPress={startGame}>
            <LinearGradient colors={["#06B6D4", "#0891B2"]} style={styles.securityDashCard}>
              <Text style={styles.cardTitle}>Up for some...</Text>
              <Text style={styles.gameTitle}>Security dash?</Text>
              <View style={styles.gamePreview}>
                <View style={styles.gameElement} />
                <View style={[styles.gameElement, styles.gameElementCircle]} />
                <View style={[styles.gameElement, styles.gameElementTriangle]} />
                <View style={[styles.gameElement, styles.gameElementPlayer]} />
              </View>
              <View style={styles.playIcon}>
                <Ionicons name="play" size={20} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Trending Today Card */}
          <TouchableOpacity style={styles.card} onPress={openKaspersky}>
            <LinearGradient colors={["#EF4444", "#DC2626"]} style={styles.trendingCard}>
              <Text style={styles.cardTitle}>Trending Today</Text>
              <Text style={styles.trendingTitle}>The "Zero-Click" Scam 😱</Text>
              <Text style={styles.trendingDescription}>How do I stay safe? Click to find out more ...</Text>
              <View style={styles.trendingIcon}>
                <Ionicons name="trending-up" size={24} color="rgba(255,255,255,0.8)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dailyTipCard: {
    padding: 20,
    minHeight: 140,
    position: "relative",
  },
  securityDashCard: {
    padding: 20,
    minHeight: 140,
    position: "relative",
  },
  trendingCard: {
    padding: 20,
    minHeight: 120,
    position: "relative",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 16,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
    marginBottom: 10,
  },
  gamePreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  gameElement: {
    width: 12,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  gameElementCircle: {
    borderRadius: 6,
  },
  gameElementTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(255,255,255,0.8)",
  },
  gameElementPlayer: {
    backgroundColor: "#10B981",
    borderRadius: 2,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  trendingDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  tipIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  playIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  trendingIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
})
