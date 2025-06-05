import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import SplashScreen from "./Ingress/splash";
import Login from "./Ingress/login";
import SignUpPage from "./Ingress/SignUp";
import LoginPhone from "./Ingress/loginPhone";
import LoginGoogle from "./Ingress/loginGoogle";
import SetUp from "./SetUp/SetUpHome";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="LoginEmail" component={Login} />
        <Stack.Screen name="LoginPhone" component={LoginPhone} />
        <Stack.Screen name="LoginGoogle" component={LoginGoogle} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SetUp" component={SetUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
