"use client";

import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const { width: screenWidth } = Dimensions.get("window");

// Mock CSV data based on the provided structure
const INITIAL_CHAT_DATA = [
  {
    name_of_user: "Ethan",
    chat_id: "961156269302394",
    messages: [
      {
        sender: 1,
        content: "Hey! What brings you here?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 0,
        content: "Just looking to meet new people. You?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 1,
        content: "I work in tech. How about you?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 0,
        content: "What kind of music do you like?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 1,
        content: "Same here! I'm always up for a good adventure.",
        timestamp: new Date(),
        read: false,
        reactions: [],
      },
    ],
  },
  {
    name_of_user: "Sarah",
    chat_id: "847293651047382",
    messages: [
      {
        sender: 0,
        content: "Hi there! How's your day going?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 1,
        content: "Pretty good! Just finished work. You?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 0,
        content:
          "image: https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
        timestamp: new Date(),
        read: false,
        reactions: [],
      },
    ],
  },
  {
    name_of_user: "Alex",
    chat_id: "592847361029485",
    messages: [
      {
        sender: 1,
        content: "What's your favorite hobby?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 0,
        content: "I love photography! What about you?",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
      {
        sender: 1,
        content: "That's awesome! I'm into hiking.",
        timestamp: new Date(),
        read: true,
        reactions: [],
      },
    ],
  },
];

const EMOJI_REACTIONS = ["❤️", "😂", "😮", "😢", "😡", "👍", "👎"];

export default function MessagesScreen() {
  const [chatData, setChatData] = useState(INITIAL_CHAT_DATA);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const flatListRef = useRef(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Load CSV data here in a real implementation
    // For now, we're using mock data
  }, []);

  const sendMessage = (content, type = "text") => {
    if (!selectedChat || (!content.trim() && type === "text")) return;

    const newMessage = {
      sender: 1, // User is always sender 1
      content: type === "text" ? content : `${type}: ${content}`,
      timestamp: new Date(),
      read: false,
      reactions: [],
    };

    setChatData((prevData) =>
      prevData.map((chat) =>
        chat.chat_id === selectedChat.chat_id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setMessageText("");

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Update CSV in real implementation
    updateCSV(selectedChat.chat_id, newMessage);
  };

  const updateCSV = (chatId, message) => {
    // In a real implementation, this would update the CSV file
    console.log("Updating CSV for chat:", chatId, "with message:", message);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // In real implementation, upload image and get URL
      const mockImageUrl =
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop";
      sendMessage(mockImageUrl, "image");
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // In real implementation, upload video and get URL
      const mockVideoUrl =
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop";
      sendMessage(mockVideoUrl, "video");
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      // In real implementation, upload document and get URL
      const mockDocUrl =
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop";
      sendMessage(mockDocUrl, "pdf");
    }
  };

  const addReaction = (messageIndex, emoji) => {
    setChatData((prevData) =>
      prevData.map((chat) =>
        chat.chat_id === selectedChat.chat_id
          ? {
              ...chat,
              messages: chat.messages.map((msg, index) =>
                index === messageIndex
                  ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
                  : msg
              ),
            }
          : chat
      )
    );
    setShowReactionPicker(null);
  };

  const renderMessage = ({ item, index }) => {
    const isUser = item.sender === 1;
    const isImage = item.content.startsWith("image:");
    const isVideo = item.content.startsWith("video:");
    const isPdf = item.content.startsWith("pdf:");

    let displayContent = item.content;
    let mediaUrl = null;

    if (isImage || isVideo || isPdf) {
      mediaUrl = item.content.split(": ")[1];
      displayContent = isImage
        ? "📷 Image"
        : isVideo
        ? "🎥 Video"
        : "📄 Document";
    }

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.otherMessage,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.messageBubble,
            isUser
              ? [styles.userBubble, { backgroundColor: theme.userBubble }]
              : [styles.otherBubble, { backgroundColor: theme.otherBubble }],
          ]}
          onLongPress={() => setShowReactionPicker(index)}
        >
          {mediaUrl && isImage && (
            <Image source={{ uri: mediaUrl }} style={styles.messageImage} />
          )}
          {mediaUrl && isVideo && (
            <View style={styles.videoContainer}>
              <Image source={{ uri: mediaUrl }} style={styles.messageImage} />
              <View style={styles.videoOverlay}>
                <Ionicons name="play" size={30} color="white" />
              </View>
            </View>
          )}
          {mediaUrl && isPdf && (
            <View style={styles.documentContainer}>
              <Ionicons name="document" size={30} color={theme.text} />
              <Text style={[styles.documentText, { color: theme.text }]}>
                Document
              </Text>
            </View>
          )}
          {!mediaUrl && (
            <Text
              style={[
                styles.messageText,
                { color: isUser ? "white" : theme.text },
              ]}
            >
              {displayContent}
            </Text>
          )}

          {item.reactions && item.reactions.length > 0 && (
            <View style={styles.reactionsContainer}>
              {item.reactions.map((reaction, idx) => (
                <Text key={idx} style={styles.reaction}>
                  {reaction}
                </Text>
              ))}
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.messageInfo}>
          <Text style={[styles.timestamp, { color: theme.secondaryText }]}>
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          {isUser && (
            <Ionicons
              name={item.read ? "checkmark-done" : "checkmark"}
              size={16}
              color={item.read ? "#4CAF50" : theme.secondaryText}
            />
          )}
        </View>
      </View>
    );
  };

  const renderChatItem = ({ item }) => {
    const lastMessage = item.messages[item.messages.length - 1];
    const unreadCount = item.messages.filter(
      (msg) => msg.sender === 0 && !msg.read
    ).length;

    return (
      <TouchableOpacity
        style={[styles.chatItem, { backgroundColor: theme.surface }]}
        onPress={() => setSelectedChat(item)}
      >
        <Image
          source={require("./ProfileImages/default-avatar.jpg")}
          style={styles.avatar}
        />
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={[styles.chatName, { color: theme.text }]}>
              {item.name_of_user}
            </Text>
            <Text style={[styles.chatTime, { color: theme.secondaryText }]}>
              {lastMessage.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.chatPreview}>
            <Text
              style={[styles.lastMessage, { color: theme.secondaryText }]}
              numberOfLines={1}
            >
              {lastMessage.content.startsWith("image:")
                ? "📷 Image"
                : lastMessage.content.startsWith("video:")
                ? "🎥 Video"
                : lastMessage.content.startsWith("pdf:")
                ? "📄 Document"
                : lastMessage.content}
            </Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (selectedChat) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {/* Chat Header */}
        <View style={[styles.chatHeader, { backgroundColor: theme.surface }]}>
          <TouchableOpacity
            onPress={() => setSelectedChat(null)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Image
            source={require("./ProfileImages/default-avatar.jpg")}
            style={styles.headerAvatar}
          />
          <View style={styles.headerInfo}>
            <Text style={[styles.headerName, { color: theme.text }]}>
              {selectedChat.name_of_user}
            </Text>
            <Text style={[styles.headerStatus, { color: theme.secondaryText }]}>
              Online
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsDarkMode(!isDarkMode)}
            style={styles.themeButton}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={selectedChat.messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input Area */}
        <View
          style={[styles.inputContainer, { backgroundColor: theme.surface }]}
        >
          <TouchableOpacity
            onPress={() => setShowEmojiPicker(true)}
            style={styles.inputButton}
          >
            <Ionicons name="happy" size={24} color={theme.secondaryText} />
          </TouchableOpacity>

          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: theme.inputBackground, color: theme.text },
            ]}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor={theme.secondaryText}
            multiline
          />

          <TouchableOpacity onPress={pickImage} style={styles.inputButton}>
            <Ionicons name="camera" size={24} color={theme.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity onPress={pickDocument} style={styles.inputButton}>
            <Ionicons name="attach" size={24} color={theme.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sendMessage(messageText)}
            style={styles.sendButton}
          >
            <LinearGradient
              colors={["#8B5CF6", "#A855F7"]}
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Emoji Picker Modal */}
        <Modal visible={showEmojiPicker} transparent animationType="slide">
          <View style={styles.emojiModalOverlay}>
            <View
              style={[styles.emojiModal, { backgroundColor: theme.surface }]}
            >
              <View style={styles.emojiHeader}>
                <Text style={[styles.emojiTitle, { color: theme.text }]}>
                  Choose Emoji
                </Text>
                <TouchableOpacity onPress={() => setShowEmojiPicker(false)}>
                  <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.emojiGrid}>
                <View style={styles.emojiRow}>
                  {[
                    "😀",
                    "😂",
                    "🥰",
                    "😍",
                    "🤔",
                    "😎",
                    "😴",
                    "🤗",
                    "😋",
                    "😘",
                  ].map((emoji, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.emojiButton}
                      onPress={() => {
                        setMessageText((prev) => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                    >
                      <Text style={styles.emojiText}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Reaction Picker Modal */}
        <Modal
          visible={showReactionPicker !== null}
          transparent
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.reactionModalOverlay}
            onPress={() => setShowReactionPicker(null)}
          >
            <View
              style={[styles.reactionModal, { backgroundColor: theme.surface }]}
            >
              {EMOJI_REACTIONS.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.reactionButton}
                  onPress={() => addReaction(showReactionPicker, emoji)}
                >
                  <Text style={styles.reactionEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>Messages</Text>
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.themeButton}
        >
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.chat_id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const lightTheme = {
  background: "#ffffff",
  surface: "#ffffff",
  text: "#000000",
  secondaryText: "#666666",
  userBubble: "#8B5CF6",
  otherBubble: "#f0f0f0",
  inputBackground: "#f8f9fa",
};

const darkTheme = {
  background: "#121212",
  surface: "#1e1e1e",
  text: "#ffffff",
  secondaryText: "#aaaaaa",
  userBubble: "#8B5CF6",
  otherBubble: "#333333",
  inputBackground: "#2a2a2a",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  themeButton: {
    padding: 8,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
  },
  chatTime: {
    fontSize: 12,
  },
  chatPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#8B5CF6",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  backButton: {
    marginRight: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerStatus: {
    fontSize: 12,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  otherMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    position: "relative",
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
  },
  videoContainer: {
    position: "relative",
  },
  videoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  documentText: {
    marginLeft: 8,
    fontSize: 16,
  },
  reactionsContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  reaction: {
    fontSize: 16,
    marginRight: 4,
  },
  messageInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  inputButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  emojiModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: "50%",
  },
  emojiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  emojiTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  emojiGrid: {
    paddingHorizontal: 20,
  },
  emojiRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  emojiButton: {
    width: "18%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emojiText: {
    fontSize: 24,
  },
  reactionModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  reactionModal: {
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactionButton: {
    padding: 8,
  },
  reactionEmoji: {
    fontSize: 24,
  },
});
