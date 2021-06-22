import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FabTabBar } from "../components/BottomTab/FabTabBar";
import HomeScreen from "../screens/MainApp/HomeScreen";
import AccountScreen from "../screens/MainApp/AccountScreen/AccountScreen";
import AuthNavigator from "./AuthNavigator";
import EditProfile from "../screens/MainApp/EditProfile";
import ChangePassword from "../screens/MainApp/ChangePassword";
import NotificationScreen from "../screens/MainApp/NotificationScreen";
import PostEmergencyMap from "../screens/MainApp/PostEmergency/PostEmergencyMap";
import PostEmergencyScreen from "../screens/MainApp/PostEmergency/PostEmergencyScreen";
import PostEmergencyInfo from "../screens/MainApp/PostEmergency/PostEmergencyInfo";
import PostEmergencySubmit from "../screens/MainApp/PostEmergency/PostEmergencySubmit.js";

const tabBarIcon = (name) => ({ focused, color, size }) => (
  <MaterialCommunityIcons
    name={name}
    size={28}
    color={focused ? "white" : "white"}
  />
);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="edit_profile" component={EditProfile} />
      <Stack.Screen name="change_password" component={ChangePassword} />
      <Stack.Screen name="notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};
const PostEmergencyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="post" component={PostEmergencyScreen} />
      <Stack.Screen name="info" component={PostEmergencyInfo} />
      <Stack.Screen name="map" component={PostEmergencyMap} />
      <Stack.Screen name="submit" component={PostEmergencySubmit} />
    </Stack.Navigator>
  );
};

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Post"
      tabBarOptions={{
        activeTintColor: "#5D88BB",
      }}
      tabBar={(props) => <FabTabBar color="#32527B" {...props} />}
    >
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("home"),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("post"),
        }}
        name="Post"
        component={PostEmergencyStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("account"),
        }}
        name="Account"
        component={AccountStack}
      />
    </Tab.Navigator>
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
