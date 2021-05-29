import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text>Signin</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
