import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PageHeader from "../../../components/PageHeader";

const PostEmergencyInfo = () => {
  return (
    <View style={styles.container}>
      <PageHeader pageTitle={""} />
      <View>
        <TouchableOpacity style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ios-persons" />
            <Text style={styles.cardText}>Human Damages</Text>
          </View>
          <View>
            <Text>Yes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ios-persons" />
            <Text style={styles.cardText}>Add a photo or a video feed</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostEmergencyInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
});
