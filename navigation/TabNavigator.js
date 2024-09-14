// navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen"; // Assuming you have this screen

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Friends" component={SettingsScreen} />
          <Tab.Screen name="Events" component={SettingsScreen} />
          <Tab.Screen name="Setstings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
