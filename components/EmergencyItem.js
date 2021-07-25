import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const EmergencyItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryContainer, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate("info", { type: item.type })}
    >
      <View>
        <View>
          <Image
            source={item.icon}
            style={{
              width: 60,
              height: 60,
              marginTop: 15,
              alignSelf: "center",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginTop: 10,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EmergencyItem;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: "center",
    margin: 6,
    padding: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.42,
    elevation: 2,
    borderRadius: 5,
    width: "45%",
  },
});
