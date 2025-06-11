import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function QuestionModal({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);

    setTimeout(() => {
      const isCorrect = index === question.correctAnswer;
      onAnswer(isCorrect);
    }, 1500);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Modal transparent visible animationType="fade">
      <View style={styles.overlay}>
        {/* Context Bubble */}
        {question.context && (
          <View style={styles.contextBubbleContainer}>
            <View style={styles.contextBubble}>
              <Text style={styles.contextText}>{question.context}</Text>
            </View>
          </View>
        )}
        <View style={styles.modal}>
          <LinearGradient
            colors={["#1e1b4b", "#3730a3"]}
            style={styles.modalGradient}
          >
            <Text style={styles.questionText}>{question.text}</Text>

            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index &&
                      (isCorrect ? styles.correctOption : styles.wrongOption),
                    selectedAnswer !== null &&
                      index === question.correctAnswer &&
                      styles.correctOption,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {showResult && (
              <View style={styles.resultContainer}>
                <Text
                  style={[
                    styles.resultText,
                    isCorrect ? styles.correctText : styles.wrongText,
                  ]}
                >
                  {isCorrect ? "Good Job! +500" : "Uh oh.. -300"}
                </Text>
                {!isCorrect && (
                  <Text style={styles.explanationText}>
                    That's not the main reason. Be more cautious after delay
                  </Text>
                )}
              </View>
            )}
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modal: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    overflow: "hidden",
  },
  modalGradient: {
    padding: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  correctOption: {
    backgroundColor: "rgba(16,185,129,0.2)",
    borderColor: "#10B981",
  },
  wrongOption: {
    backgroundColor: "rgba(239,68,68,0.2)",
    borderColor: "#EF4444",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  correctText: {
    color: "#10B981",
  },
  wrongText: {
    color: "#EF4444",
  },
  explanationText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
  },
  contextBubbleContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  contextBubble: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 18,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 8,
    marginTop: 8,
    position: "relative",
  },
  contextText: {
    color: "#222",
    fontSize: 15,
    lineHeight: 21,
  },
});