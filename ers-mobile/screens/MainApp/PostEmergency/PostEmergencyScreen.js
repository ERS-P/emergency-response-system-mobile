import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import EmergencyItem from "../../../components/EmergencyItem";
import PageHeader from "../../../components/PageHeader";
import { EmergencyData } from "../../../jsonData/index";

const PostEmergencyScreen = ({ navigation }) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const openSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };
  return (
    <View style={styles.container}>
      <PageHeader pageTitle={"Post Emergency"} searchHandler={openSearchBox} />
      <View style={{ paddingHorizontal: 10 }}>
        {showSearchBox ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              Search for an emergency around you
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              numColumns={2}
              data={EmergencyData}
              renderItem={({ item }) => (
                <EmergencyItem item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => String(item.id)}
            />
            <View style={{ padding: 20 }}>
              <Text
                style={{ textAlign: "center", fontFamily: "Poppins-Regular" }}
              >
                Please choose one of the above buttons that represents the
                emergency you are posting about.
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostEmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
