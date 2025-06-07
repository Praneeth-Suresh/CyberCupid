import { View, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function GamePlayer({ x, y, size, isJumping }) {
  return (
    <View style={[styles.player, { left: x, top: y, width: size, height: size }]}>
      <LinearGradient
        colors={isJumping ? ["#10B981", "#059669"] : ["#10B981", "#047857"]}
        style={styles.playerGradient}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    borderRadius: 4,
    overflow: "hidden",
    shadowColor: "#10B981",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  playerGradient: {
    flex: 1,
    borderRadius: 4,
  },
})