import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Auth/Onboarding";
import SignUp from "../screens/Auth/SignUp";
import SignIn from "../screens/Auth/SignIn";
import AuthMain from "../screens/Auth/AuthMain";
import ForgotPassword from "../screens/Auth/ForgotPassword";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" component={Onboarding} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="authmain" component={AuthMain} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
