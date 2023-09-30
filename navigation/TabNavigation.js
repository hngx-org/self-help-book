import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CustomBottomNavigation from "../components/CustomBottomNavigation";
import HistoryScreen from "../screens/HistoryScreen";

// const
const Tab = createBottomTabNavigator();
export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false,
        tabBarStyle: {
          shadowOffset: {
              width: 0,
              height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          padding: 10,
          width: '100%',
          height: 84,
          zIndex: 0,
      } }}
      tabBar={(props) => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}
