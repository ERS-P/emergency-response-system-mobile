import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ScrollView
} from "react-native";
import PageHeader from "../../components/PageHeader";
import { getEmergencyData } from "../../api/auth";
import LoadingScreen from "../../components/LoadingScreen";
import renderIf from "../../components/renderIf";
import { FontAwesome } from "@expo/vector-icons";
import { ModalContext } from "../../context/ModalContext";
import Modal from "react-native-modal"

const NewsFeed = ({ navigation }) => {
  const { openNewsModal, newsFeed, modalVisible, setmodalVisible } = useContext(
    ModalContext
  );
  const [news, setNews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setNews(getEmergencyData());

    setTimeout(function () {
      //Start the timer
      setLoaded(true);
    }, 4000);
  }, []);

  const NewsFeedThumbnail = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          openNewsModal({
            id: item.postId,
            title: item.title,
            type: item.type,
            description: item.description,
          })
        }
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2.5 }}>
            <Image
              source={{
                uri:
                  "https://thailand-directory.com/wp-content/uploads/2021/05/emergency.png",
              }}
              style={{ width: 67, height: 67, margin: 10 }}
            />
          </View>

          <View
            style={{
              flex: 6,
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "#d2d2d2",
              borderBottomWidth: 1,
              margin: 4,
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  marginVertical: 8,
                  fontFamily: "Poppins-Regular",
                  color: "#000",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Poppins-Regular",
                  color: "#444",
                }}
              >
                {item.type}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#444",
                  fontFamily: "Poppins-Regular",
                }}
              >
                {item.date}-{item.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <PageHeader pageTitle="NewsFeed" />
      {renderIf(!loaded, <LoadingScreen />)}
      {renderIf(
        loaded,
        <View>
          <Text style={{ fontWeight: "500", fontSize: 15, margin: 12 }}>
            Today NewsFeed
          </Text>
          <FlatList
            data={news}
            renderItem={NewsFeedThumbnail}
            keyExtractor={(item) => String(item.postId)}
          />
          <Modal
            isVisible={modalVisible}
            backdropOpacity={0.5}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            style={{
              backgroundColor: "#F2F2F2",
              margin: 0,
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
                    {newsFeed.title}
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
                    {newsFeed.description}
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

export default NewsFeed;

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
    right: 15,
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
