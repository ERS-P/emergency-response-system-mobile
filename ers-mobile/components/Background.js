import React from "react";
import { StyleSheet, KeyboardAvoidingView, Image, View } from "react-native";

export default function Background({ children, onPress }) {
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={require("../assets/images/bgShape.png")}
          style={{ justifyContent: "flex-start", width: 210, height: 150 }}
        />
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
      <View style={{ postion: "absolute", bottom: 0, right: 0 }}>
        <Image
          source={require("../assets/images/bgShape1.png")}
          style={{
            alignSelf: "flex-end",
            width: 210,
            height: 150,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32527B",
  },
});
