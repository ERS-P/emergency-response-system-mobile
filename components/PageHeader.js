import { Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PageHeader({ pageTitle, optionHandler }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 10,
        paddingRight: 10,
        backgroundColor: "#32527B",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <SimpleLineIcons name={"arrow-left"} size={20} color={"#ffffff"} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Poppins-Regular",
              color: "#ffffff",
            }}
          >
            {pageTitle}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={optionHandler}>
        <SimpleLineIcons name="options-vertical" size={18} color={"#ffffff"} />
      </TouchableOpacity>
    </View>
  );
}
