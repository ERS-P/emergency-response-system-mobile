import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/main/alarm.png")}
          style={{ height: 200, width: 210 }}
        />
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20 }}>
          No notification received(0)
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
