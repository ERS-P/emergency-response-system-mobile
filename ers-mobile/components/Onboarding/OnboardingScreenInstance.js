import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function OnboardingScreenInstance({ backgroundImageURI,subText }) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.overlay} />
        <View>
          <Image
            source={require("../../assets/images/bgShape.png")}
            style={{ justifyContent: "flex-start", width: 200, height: 150 }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Image source={backgroundImageURI} style={styles.logoImage} />
          <Text style={styles.tagline}>{subText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#32527B",
  },
  logoImage: {
    width: 300,
    height: 200,
  },
  tagline: {
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    paddingHorizontal: 30,
    fontWeight: "100",
    fontFamily: "Poppins-Regular",
    marginVertical: 6,
  },
  overlay: {
    backgroundColor: "#32527B",
    flex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: "absolute",
    opacity: 0.3,
  },
});
