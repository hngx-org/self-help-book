import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from "../screens/OnboardingScreen";
import { TabNavigation } from "./TabNavigation";

const Stack = createStackNavigator();

export function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={TabNavigation}/>      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}