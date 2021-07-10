import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import EmergencyItem from "../../../components/EmergencyItem";
import CategoryItem from "../../../components/CategoryItem";
import PageHeader from "../../../components/PageHeader";
import { CategoryData, EmergencyData } from "../../../jsonData/index";

const PostEmergencyScreen = ({ navigation }) => {
  const [showOptionBox, setShowOptionBox] = useState(false);
  const openOptionBox = () => {
    setShowOptionBox(!showOptionBox);
  };
  return (
    <View style={styles.container}>
      <PageHeader pageTitle={"Post Emergency"} optionHandler={openOptionBox} />
      <View style={{ paddingHorizontal: 10 }}>
        {showOptionBox ? (
          <View style={{ marginTop: 20 }}>
            <FlatList
              numColumns={2}
              data={CategoryData}
              renderItem={({ item }) => (
                <CategoryItem item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => String(item.id)}
            />
            <View style={{ padding: 20 }}>
              <Text
                style={{ textAlign: "center", fontFamily: "Poppins-Regular" }}
              >
                Please choose one of the above buttons that represents the
                various emergency units
              </Text>
            </View>
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
