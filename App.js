import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TabNavigator from "./navigation/TabNavigator";
import HomeScreen from "./screens/HomeScreen";
import ItemScreen from "./screens/ItemScreen"; // Import your new screen
import SettingsScreen from "./screens/SettingsScreen"; // Assuming you have this screen
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Create Stack Navigator for detailed views
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen screenOptions={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Groups" component={StackNavigator} />
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Friends" component={SettingsScreen} />
        <Tab.Screen name="Events" component={SettingsScreen} />
        <Tab.Screen name="Setstings" component={SettingsScreen} />
        {/* Add other tabs here */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
