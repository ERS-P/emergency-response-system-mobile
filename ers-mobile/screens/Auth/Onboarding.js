import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
