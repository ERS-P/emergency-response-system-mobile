import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import TopBarNav from "top-bar-nav";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../../jsonData/index";
import MapScreen from "../../components/Map/MapScreen";
import ListScreen from "../../components/Map/ListScreen";
import LoadingScreen from "../../components/LoadingScreen";
import firebase from "firebase";

const ROUTES = {
  MapScreen,
  ListScreen,
};

const ROUTESTACK = [
  {
    text: <Ionicons name="ios-map" size={27} color={"#ffff"} />,
    title: "MapScreen",
  },
  {
    text: <Ionicons name="ios-list" size={27} color={"#ffff"} />,
    title: "ListScreen",
  },
];

const defaultRegion = {
  latitude: 5.614818,
  longitude: -0.205874,
  latitudeDelta: 0.004,
  longitudeDelta: 0.004,
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: null,
      isResponder: null,
      isModalVisible: false,
      region: defaultRegion,
      selectedMarker: {
        title: "",
        description: "",
        type: "fire",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        key: "",
      },
      errorMessage: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      const userId = user.uid;
      if (user) {
        firebase
          .database()
          .ref("users/" + userId)
          .once("value")
          .then((snapshot) => {
            const { responder } = snapshot.val();
            this.setState({ isResponder: responder });
          });
      }
    });
    this.setState({ markers: data });
  }

  render() {
    if (this.state.markers != null) {
      if (this.state.isResponder === false) {
        return (
          <>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={require("../../assets/images/restriction.png")}
                  style={{ width: 200, height: 200, marginLeft: 20 }}
                />
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: 16,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "200",
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    Only responders can access this screen.
                  </Text>
                </View>
              </View>
            </View>
          </>
        );
      } else {
        return (
          <View style={{ flex: 1 }}>
            <TopBarNav
              routeStack={ROUTESTACK}
              renderScene={(route, i) => {
                let Component = ROUTES[route.title];

                return (
                  <Component
                    defaultRegion={this.state.region}
                    data={this.state.markers}
                    index={i}
                  />
                );
              }}
              headerStyle={[styles.headerStyle, { paddingTop: 30 }]}
              labelStyle={styles.labelStyle}
              underlineStyle={styles.underlineStyle}
              imageStyle={styles.imageStyle}
              sidePadding={40}
              inactiveOpacity={1}
              fadeLabels={true}
            />
          </View>
        );
      }
    } else {
      return <LoadingScreen />;
    }
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#32527B",
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: "#e6faff",
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: "#e6faff",
    width: 40,
  },
});
