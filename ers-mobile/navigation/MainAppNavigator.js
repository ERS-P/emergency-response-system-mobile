import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/MainApp/HomeScreen";
import AccountScreen from "../screens/MainApp/AccountScreen";
import AuthNavigator from "./AuthNavigator";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: "#FF4500",
        inactiveTintColor: Color.secondary,
        tabStyle: { backgroundColor: `${Color.primary}` },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="user" size={26} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="main" component={MainAppNavigator} />
    </Stack.Navigator>
  );
};
export default AppStack;
