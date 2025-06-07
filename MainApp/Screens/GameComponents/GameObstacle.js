import { View, StyleSheet } from "react-native"

export default function GameObstacle({ x, y, width, height, type }) {
  return (
    <View
      style={[
        styles.obstacle,
        {
          left: x,
          top: y,
          width,
          height,
          borderRadius: type === 'circle' ? width / 2 : 4,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  obstacle: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.8)",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
})