import { NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import EducationScreen from "./Screens/EducationScreens";
import HomeScreen from "./Screens/HomeScreen";
import MessagesScreen from "./Screens/MessagesScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <NavigationIndependentTree>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Education") {
              iconName = focused ? "school" : "school-outline";
            } else if (route.name === "Messages") {
              iconName = focused ? "chatbubble" : "chatbubble-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#8B5CF6",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#e5e5e5",
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Education" component={EducationScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationIndependentTree>
  );
}
