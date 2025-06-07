"use client"

import { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  Alert,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import GamePlayer from "./GamePlayer"
import GameObstacle from "./GameObstacle"
import QuestionModal from "./QuestionModal"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const GAME_HEIGHT = screenHeight - 100
const PLAYER_SIZE = 30
const OBSTACLE_WIDTH = 40
const OBSTACLE_HEIGHT = 40
const JUMP_HEIGHT = 80
const GAME_SPEED = 3

export default function SecurityDashGame({ onClose }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - 150)
  const [isJumping, setIsJumping] = useState(false)
  const [obstacles, setObstacles] = useState([])
  const [showQuestion, setShowQuestion] = useState(false)
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const gameLoopRef = useRef()
  const playerYRef = useRef(new Animated.Value(GAME_HEIGHT - 150))
  const backgroundYRef = useRef(new Animated.Value(0))
  const obstacleIdCounter = useRef(0)
  const gameTimeRef = useRef(0)
  const questionShownRef = useRef(false)

  const question = {
    text: "What are the RED FLAGS here?",
    options: [
      "Too many emojis",
      "Shortened link, mismatched username, fake urgency", 
      "The video isn't HD"
    ],
    correctAnswer: 1
  }

  useEffect(() => {
    if (gameStarted && !gameOver && !showQuestion) {
      startGameLoop()
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameOver, showQuestion])

  useEffect(() => {
    // Animate background movement
    if (gameStarted && !gameOver && !showQuestion) {
      Animated.loop(
        Animated.timing(backgroundYRef.current, {
          toValue: -screenHeight,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start()
    }
  }, [gameStarted, gameOver, showQuestion])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setPlayerY(GAME_HEIGHT - 150)
    setObstacles([])
    setShowQuestion(false)
    setQuestionAnswered(false)
    setGameWon(false)
    gameTimeRef.current = 0
    questionShownRef.current = false
    generateInitialObstacles()
  }

  const generateInitialObstacles = () => {
    const newObstacles = []
    for (let i = 0; i < 5; i++) {
      newObstacles.push({
        id: obstacleIdCounter.current++,
        x: Math.random() * (screenWidth - OBSTACLE_WIDTH),
        y: -i * 200 - 200,
        type: Math.random() > 0.5 ? 'square' : 'circle'
      })
    }
    setObstacles(newObstacles)
  }

  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      gameTimeRef.current += 50

      // Show question after 3 seconds
      if (gameTimeRef.current > 3000 && !questionShownRef.current && !questionAnswered) {
        questionShownRef.current = true
        setShowQuestion(true)
        return
      }

      // End game 10 seconds after question is answered
      if (questionAnswered && gameTimeRef.current > 13000) {
        setGameWon(true)
        setGameOver(true)
        return
      }

      setObstacles(prevObstacles => {
        const updatedObstacles = prevObstacles.map(obstacle => ({
          ...obstacle,
          y: obstacle.y + GAME_SPEED
        })).filter(obstacle => obstacle.y < GAME_HEIGHT + 100)

        // Add new obstacles
        if (Math.random() < 0.02) {
          updatedObstacles.push({
            id: obstacleIdCounter.current++,
            x: Math.random() * (screenWidth - OBSTACLE_WIDTH),
            y: -OBSTACLE_HEIGHT,
            type: Math.random() > 0.5 ? 'square' : 'circle'
          })
        }

        // Check collisions
        const playerRect = {
          x: screenWidth / 2 - PLAYER_SIZE / 2,
          y: playerY,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE
        }

        for (let obstacle of updatedObstacles) {
          const obstacleRect = {
            x: obstacle.x,
            y: obstacle.y,
            width: OBSTACLE_WIDTH,
            height: OBSTACLE_HEIGHT
          }

          if (checkCollision(playerRect, obstacleRect)) {
            setGameOver(true)
            return updatedObstacles
          }
        }

        return updatedObstacles
      })

      setScore(prev => prev + 1)
    }, 50)
  }

  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )
  }

  const jump = () => {
    if (isJumping || showQuestion) return

    setIsJumping(true)
    const newY = Math.max(50, playerY - JUMP_HEIGHT)
    
    Animated.sequence([
      Animated.timing(playerYRef.current, {
        toValue: newY,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(playerYRef.current, {
        toValue: playerY,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start(() => {
      setIsJumping(false)
    })

    playerYRef.current.addListener(({ value }) => {
      setPlayerY(value)
    })
  }

  const handleQuestionAnswer = (isCorrect) => {
    setShowQuestion(false)
    setQuestionAnswered(true)
    if (isCorrect) {
      setScore(prev => prev + 500)
    } else {
      setScore(prev => Math.max(0, prev - 300))
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setObstacles([])
    setShowQuestion(false)
    setQuestionAnswered(false)
    setGameWon(false)
    gameTimeRef.current = 0
    questionShownRef.current = false
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1e1b4b", "#3730a3"]} style={styles.gameArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        {!gameStarted ? (
          <View style={styles.startScreen}>
            <Text style={styles.gameTitle}>Security Dash</Text>
            <Text style={styles.gameSubtitle}>Test your cybersecurity knowledge!</Text>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>START GAME</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.gamePlayArea}>
            {/* Background Pattern */}
            <Animated.View 
              style={[
                styles.backgroundPattern,
                { transform: [{ translateY: backgroundYRef.current }] }
              ]}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <View key={i} style={[styles.backgroundLine, { top: i * 100 }]} />
              ))}
            </Animated.View>

            {/* Player */}
            <GamePlayer 
              x={screenWidth / 2 - PLAYER_SIZE / 2} 
              y={playerY} 
              size={PLAYER_SIZE}
              isJumping={isJumping}
            />

            {/* Obstacles */}
            {obstacles.map(obstacle => (
              <GameObstacle
                key={obstacle.id}
                x={obstacle.x}
                y={obstacle.y}
                width={OBSTACLE_WIDTH}
                height={OBSTACLE_HEIGHT}
                type={obstacle.type}
              />
            ))}

            {/* Jump Button */}
            <TouchableOpacity 
              style={styles.jumpButton} 
              onPress={jump}
              disabled={showQuestion}
            >
              <Ionicons name="arrow-up" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Question Modal */}
        {showQuestion && (
          <QuestionModal
            question={question}
            onAnswer={handleQuestionAnswer}
          />
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <View style={styles.gameOverScreen}>
            <Text style={styles.gameOverTitle}>
              {gameWon ? "Congratulations!" : "Game Over"}
            </Text>
            <Text style={styles.finalScore}>Final Score: {score}</Text>
            {gameWon && (
              <Text style={styles.winMessage}>
                You've mastered cybersecurity awareness! 🎉
              </Text>
            )}
            <View style={styles.gameOverButtons}>
              <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
                <Text style={styles.playAgainText}>PLAY AGAIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exitButton} onPress={onClose}>
                <Text style={styles.exitText}>EXIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 100,
  },
  backButton: {
    padding: 8,
  },
  scoreText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  startScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  gameTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  gameSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 40,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  gamePlayArea: {
    flex: 1,
    position: "relative",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: screenHeight * 2,
  },
  backgroundLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  jumpButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  gameOverScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  gameOverTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  finalScore: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  winMessage: {
    fontSize: 16,
    color: "#10B981",
    marginBottom: 40,
    textAlign: "center",
  },
  gameOverButtons: {
    flexDirection: "row",
    gap: 20,
  },
  playAgainButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  playAgainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  exitButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  exitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})