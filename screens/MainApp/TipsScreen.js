import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import PageHeader from "../../components/PageHeader";
import { ModalContext } from "../../context/ModalContext";
import { getTipsData } from "../../api/auth";
import LoadingScreen from "../../components/LoadingScreen";
import renderIf from "../../components/renderIf";
import { FontAwesome } from "@expo/vector-icons";

const Tips = ({ navigation }) => {
  const { openModal, tipsdata, modalVisible, setmodalVisible } = useContext(
    ModalContext
  );
  const [tips, setTips] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTips(getTipsData());
    setTimeout(function () {
      //Start the timer
      setLoaded(true);
    }, 4000);
  }, []);

  const TipsThumbnail = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          marginHorizontal: 5,
          marginBottom: 5,
        }}
      >
        <View style={{ flex: 2 }}>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 25,
              }}
              source={{
                uri:
                  "https://thailand-directory.com/wp-content/uploads/2021/05/emergency.png",
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 9,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            marginBottom: 10,
            borderColor: "#c0c0c0",
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                fontFamily: "Poppins-Regular",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 3,
                fontFamily: "Poppins-Regular",
                marginBottom: 14,
              }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.5,
            borderBottomWidth: 1,
            marginBottom: 10,
            borderColor: "#c0c0c0",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              openModal({
                id: item.timeStamp,
                title: item.title,
                description: item.description,
                type: item.type,
              })
            }
            style={{
              backgroundColor: "#32527B",
              height: 50,
              width: 40,
              elevation: 2,
              padding: 8,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "#FFFFFF", fontSize: 12 }}
            >
              Read more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PageHeader pageTitle="Tips" />
      {renderIf(!loaded, <LoadingScreen />)}
      {renderIf(
        loaded,
        // {tips.length === 0 ? (
        // <View
        //   style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
        // >
        //   <Image
        //     source={require("../../assets/images/tips.png")}
        //     style={{ width: 160, height: 200 }}
        //   />
        //   <View style={{ alignSelf: "center", marginTop: 28 }}>
        //     <Text
        //       style={{
        //         fontSize: 16,
        //         fontFamily: "Poppins-Regular",
        //       }}
        //     >
        //       No tips received yet(0)
        //     </Text>
        //   </View>
        // </View>
        // ) : (
        <View style={{ marginTop: 2 }}>
          <FlatList
            keyExtractor={(item) => String(item.timeStamp)}
            data={tips}
            renderItem={TipsThumbnail}
          />

          <Modal
            isVisible={modalVisible}
            backdropOpacity={0.5}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            onBackdropPress={() => setmodalVisible(false)}
            onBackButtonPress={() => setmodalVisible(false)}
            style={{
              backgroundColor: "#F2F2F2",
              margin: 0,
              // maxHeight: Dimensions.get("window") / 1.98,
              // borderRadius: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.header}>
                <Image
                  style={{ flex: 1, margin: 0 }}
                  source={{
                    uri:
                      "https://thailand-directory.com/wp-content/uploads/2021/05/emergency.png",
                  }}
                />
              </View>
              <View style={styles.footer}>
                <View style={{ borderBottomWidth: 1, borderColor: "#c0c0c0" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      marginVertical: 7,
                      fontSize: 18,
                    }}
                  >
                    {tipsdata.title}
                  </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text
                    style={{
                      color: "#444",
                      fontFamily: "Poppins-Regular",
                      fontSize: 14,
                      marginTop: 7,
                    }}
                  >
                    {tipsdata.description}
                  </Text>
                </ScrollView>
              </View>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => setmodalVisible(false)}
              >
                <FontAwesome name="close" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Tips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    flex: 1.5,
    // paddingHorizontal: 20,
    // paddingVertical: 15,
  },
  footer: {
    flex: 2.5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: -50,
    // position:"absolute",
    // top:-10
  },
  backIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5D88BB",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    left: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
