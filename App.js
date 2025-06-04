import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import SplashScreen from "./Ingress/splash";
import LoginPhone from "./Ingress/login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="LoginPhone" component={LoginPhone} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
