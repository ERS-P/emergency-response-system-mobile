import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { ModalContext } from "../context/ModalContext";

const CategoryItem = ({ item, navigation }) => {
  // const { Modal } = useContext(ModalContext);
  return (
    <TouchableOpacity
      style={[styles.categoryContainer, { backgroundColor: "#FFF" }]}
      // onPress={() => Modal({})}
    >
      <View>
        <View
          style={{
            borderRadius: 50,
            height: 90,
            width: 90,
            backgroundColor: item.color,
          }}
        >
          <Image
            source={item.icon}
            style={{
              width: 50,
              height: 50,
              marginTop: 15,
              alignSelf: "center",
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 10,
            textAlign: "center",
            fontFamily: "Poppins-Regular",
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryItem;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: "center",
    margin: 6,
    padding: 5,
    paddingVertical: 10,
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
