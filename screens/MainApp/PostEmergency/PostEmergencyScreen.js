import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  // TouchableOpacity,
} from "react-native";
import EmergencyItem from "../../../components/EmergencyItem";
import CategoryItem from "../../../components/CategoryItem";
import PageHeader from "../../../components/PageHeader";
import { CategoryData, EmergencyData } from "../../../jsonData/index";
// import Modal from "react-native-modal";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { ModalContext } from "../../../context/ModalContext";

const PostEmergencyScreen = ({ navigation }) => {
  const [showOptionBox, setShowOptionBox] = useState(false);
  const openOptionBox = () => {
    setShowOptionBox(!showOptionBox);
  };
  // const [modalVisible] = useContext(ModalContext);
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
                Please choose one of the above buttons to send SOS
              </Text>
            </View>
            {/* <Modal
              isVisible={modalVisible}
              // onBackdropPress={() => setmodalVisible(true)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#FFF",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  maxHeight: 300,
                }}
              >
                <FontAwesome5 name="check-circle" size={70} color="black" />

                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  SOS has been submitted successfully
                </Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { borderWidth: 1, borderColor: "#32527B" },
                  ]}
                  onPress={() => navigation.navigate("post")}
                >
                  <Text style={[styles.btnText, { color: "#000000" }]}>
                    DONE
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal> */}
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
  button: {
    padding: 10,
    width: "45%",
    marginTop: 2,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
