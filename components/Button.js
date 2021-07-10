import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ title, pressHandler, bgColor }) {
  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={[{ backgroundColor: bgColor }, styles.btn]}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 13,
    borderRadius: 30,
    width: "100%",
  },
  btnText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
