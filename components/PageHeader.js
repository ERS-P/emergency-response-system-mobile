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
        paddingTop: 15,
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
          <SimpleLineIcons name={"arrow-left"} size={16} color={"#ffffff"} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Poppins-Regular",
              color: "#ffffff",
            }}
          >
            {pageTitle}
          </Text>
        </View>
      </View>
      {optionHandler != "" ? (
        <TouchableOpacity onPress={optionHandler}>
          <SimpleLineIcons
            name="options-vertical"
            size={12}
            color={"#ffffff"}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
}
