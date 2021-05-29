import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Auth/Onboarding";
import SignUp from "../screens/Auth/SignUp";
import SignIn from "../screens/Auth/SignIn";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" component={Onboarding} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="signin" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
