import { createStackNavigator } from "@react-navigation/stack";

import Preferences from "./Preferences";
import PhotoUpload from "./PhotoUpload";
import PhotoVerification from "./PhotoVerification";
import PrivacyNotice from "./PrivacyNotice";

const Stack = createStackNavigator()

export default function SetUp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
      <Stack.Screen name="PhotoVerification" component={PhotoVerification} />
      <Stack.Screen name="PrivacyNotice" component={PrivacyNotice} />
    </Stack.Navigator>
  )
}