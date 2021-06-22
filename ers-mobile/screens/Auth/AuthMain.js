import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Background from "../../components/Background";

const AuthMain = ({ navigation }) => {
  return (
    <Background>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 22,
              textAlign: "center",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            Welcome
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#FFFFFF" }]}
            onPress={()=>navigation.navigate("signin")}
          >
            <Text style={[styles.btnText, { color: "#32527B" }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              { borderWidth: 1, borderColor: "#FFFFFF", marginTop: 30 },
            ]}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={[styles.btnText, { color: "#FFFFFF" }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default AuthMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    paddingVertical:15,
    borderRadius: 25,
    width: "80%",
    
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
