import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import PageHeader from "../../components/PageHeader";
import { getUserData } from "../../api/auth";
import Modal from "react-native-modal";
import MapView from "react-native-maps";
import { Linking } from "expo";
import LoadingScreen from "../../components/LoadingScreen";
import renderIf from "../../components/renderIf";
import { ModalContext } from "../../context/ModalContext";
import Speedometer from "react-native-speedometer-chart";
import CheckBox from "react-native-check-box";

const TrackRespondents = () => {
  const [responders, setResponders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [emergVal, setEmergVal] = useState(25);
  const [isChecked, setisChecked] = useState(false);
  const [isChecked50, setisChecked50] = useState(false);
  const [isChecked75, setisChecked75] = useState(false);
  const [isChecked100, setisChecked100] = useState(false);

  const [userLocation, setUserLocation] = useState({
    latitude: 6.201207,
    longitude: -2.691251,
  });
  const [coordinates, setCoordinates] = useState({
    latitude: 5.533765,
    longitude: -0.70128,
  });

  const { openMapModal, modalVisible, setmodalVisible } = useContext(
    ModalContext
  );

  useEffect(() => {
    setResponders(getUserData());

    setTimeout(function () {
      //Start the timer
      setLoaded(true);
    }, 9000);
  }, []);

  const emergFunc = (val) => {
    setEmergVal(val);
    if (val === 50) {
      setisChecked50(!isChecked50);
    } else if (val === 75) {
      setisChecked75(!isChecked75);
    } else if (val === 100) {
      setisChecked100(!isChecked100);
    }
  };

  const contact = (type, telno) => {
    let phone = "";
    if (Platform.OS === "ios" && type === "tel") {
      phone = `tel:${telno}`;
    } else if (Platform.OS === "android" && type === "tel") {
      phone = `tel:${telno}`;
    }
    Linking.openURL(phone);
  };

  const RespondersThumbnail = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={{ borderBottomWidth: 1, borderColor: "#c0c0c0" }}>
          <Text style={{ fontFamily: "Poppins-Regular" }}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular" }}>{item.branch}</Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => contact("tel", item.phoneNumber)}
          >
            <Text style={{ textAlign: "center", color: "#FFF" }}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <PageHeader pageTitle="Responders" />
      {renderIf(!loaded, <LoadingScreen />)}
      {renderIf(
        loaded,
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  margin: 20,
                  fontWeight: "100",
                  fontSize: 20,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Progress
              </Text>
            </View>

            <Text
              style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                fontStyle: "italic",
                fontSize: 13,
                fontFamily: "Poppins-Regular",
              }}
            >
              <MaterialCommunityIcons
                name="comment-quote"
                size={24}
                color="black"
              />
              &nbsp;Track every single process of the emergency response unit
              and send your feedback to the administrator.
            </Text>
            <View
              style={{
                // flexDirection: "row",
                marginTop: 8,
                marginHorizontal: 8,
                backgroundColor: "#FFF",
                borderRadius: 8,
                // alignItems:'center',
                // justifyContent:'center'
              }}
            >
              <View style={{ alignSelf: "center", marginTop: 5 }}>
                <Speedometer value={emergVal} totalValue={100} />
              </View>
              <View style={{ marginLeft: 10, marginBottom: 5 }}>
                <CheckBox
                  style={{}}
                  onClick={() => setEmergVal(25)}
                  isChecked={true}
                  rightText={"Emergency successfully reported"}
                />
                <CheckBox
                  style={{}}
                  onClick={() => emergFunc(50)}
                  isChecked={isChecked50}
                  rightText={"Responders have arrived at the scene"}
                />
                <CheckBox
                  style={{}}
                  onClick={() => emergFunc(75)}
                  isChecked={isChecked75}
                  rightText={"Emergency situation being handled"}
                />
                <CheckBox
                  style={{}}
                  onClick={() => emergFunc(100)}
                  isChecked={isChecked100}
                  rightText={"Emergency has been curbed"}
                />
                <TouchableOpacity
                  style={{
                    padding: 10,
                    alignSelf: "flex-end",
                    marginTop: 2,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: "#5D88BB",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: "Poppins-Regular",
                      textAlign: "center",
                    }}
                  >
                    Send Feedback
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "200",
                    fontSize: 20,
                    fontFamily: "Poppins-Regular",
                    marginVertical: 9,
                  }}
                >
                  Explore :
                </Text>

                <View
                  style={{
                    backgroundColor: "#FFF",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextInput style={styles.input} placeholder="Branch" />
                  <FontAwesome name="close" size={15} color="#444" style={{}} />
                </View>
              </View>
              <View style={{ marginTop: 8 }}>
                <FlatList
                  data={responders}
                  renderItem={RespondersThumbnail}
                  keyExtractor={(item) => String(item.userID)}
                />
              </View>
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
                  <MapView
                    style={{ flex: 1 }}
                    region={{
                      latitude: coordinates.latitude,
                      longitude: coordinates.longitude,
                      latitudeDelta: 0.15,
                      longitudeDelta: 0.15,
                    }}
                    initialRegion={userLocation}
                    userLocationAnnotationTitle={""}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    onLongPress={() => setmodalVisible(false)}
                  >
                    {/* <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={() => setmodalVisible(false)}
                        style={{ margin: 10 }}
                      >
                        <Feather name="arrow-left" size={32} color="#000" />
                      </TouchableOpacity> */}

                    <MapView.Marker
                      coordinate={coordinates}
                      // style={{ height: 20, width: 20 }}
                      title="Location"
                      description="Current location of dispatched responders!"
                      // image={require("../../assets/images/main/ambulance.png")}
                    ></MapView.Marker>
                    {/* </View> */}
                  </MapView>
                </View>
              </Modal>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.mapIcon}
            onPress={() => openMapModal({})}
          >
            <Ionicons name="ios-map" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TrackRespondents;

const styles = StyleSheet.create({
  mapIcon: {
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
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.41,
    elevation: 1,
  },
  btn: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#5D88BB",
  },
  input: {
    padding: 5,
    height: 25,
    width: 120,
    backgroundColor: "#FFF",
  },
});
