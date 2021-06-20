import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function OnboardingScrollIndicator({
  handlePress,
  optionalStyles,
}) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.circle, optionalStyles]}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#091416",
    width: 12,
    height: 12,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
