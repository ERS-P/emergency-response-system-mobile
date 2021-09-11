import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import CheckBox from "react-native-check-box";
import Modal from "react-native-modal";
import { submitEmergencyInfo } from "../../../api/auth";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import * as firebase from "firebase";

// import Geocoder from 'react-native-geocoding';
// //---------------------------------------------------------------------------
// Geocoder.init('AIzaSyDX-kRrpL4QR1x4L_NwpoV8HxK0ITx0wSQ'); // use a valid API key

export default class PostEmergencySubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.route.params.media != null ? true : false,
      modalVisible: false,
      title: this.props.route.params.title,
      type: this.props.route.params.type,
      media: this.props.route.params.media,
      damages: this.props.route.params.damages,
      description: this.props.route.params.description,
      pressCoordinates: this.props.route.params.pressCoordinates,
      town: "",
      country: "",
      checkedAgreement: false,
      checkedInformation: false,
      posterUserID: "",
      userName: "loading...",
      userPhone: "loading...",
    };
    this.onSubmit = this.onSubmit.bind(this);
    // this.geocode = this.geocode.bind(this);
  }

  _pickImage = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      this.setState({
        LocalImage: result.uri,
      });
    }
    this.setState({
      photo: true,
    });
  };

  // geocode() {
  //   Geocoder.from(
  //     this.state.pressCoordinates.latitude,
  //     this.state.pressCoordinates.longitude
  //   )
  //     .then((json) => {
  //       var townComponent = json.results[0].address_components[2].long_name;
  //       var countyComponent = json.results[0].address_components[3].long_name;
  //       this.setState({ town: townComponent, county: countyComponent });
  //     })
  //     .catch((error) => console.warn(error));
  // }

  componentDidMount() {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            const { userID, firstname, lastname, phoneNumber } = snapshot.val();
            this.setState({
              posterUserID: userID,
              userName: firstname + " " + lastname,
              userPhone: phoneNumber,
            });
          });
      }
    });
  }

  onSubmit() {
    if (this.state.checkedAgreement || this.state.checkedInformation) {
      submitEmergencyInfo(
        this.state.title,
        this.state.description,
        this.state.media,
        this.state.damages,
        this.state.type,
        0,
        this.state.posterUserID,
        this.state.pressCoordinates,
        false,
        this.state.town
      );
      this.setState({ modalVisible: true });
      // this.props.navigation.navigate("post");
    } else {
      alert(
        "You did not accept our posting agrrement. You cannot continue if you don't accept."
      );
    }
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 20,
              margin: 5,
              marginVertical: 8,
            }}
          >
            Emergency Information Preview
          </Text>
          <View
            style={{
              marginHorizontal: 8,
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
            }}
          >
            <View style={{ padding: 20 }}>
              <View
                style={{
                  borderBottomWidth: 0.8,
                  borderColor: "lightgrey",
                  width: "100%",
                  justifyContent: "center",
                  paddingTop: 10,
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                  {`${this.state.title}`}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  paddingTop: 5,
                  paddingBottom: 3,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {this.state.description}
              </Text>
              <Text style={{ fontFamily: "Poppins-Regular" }}></Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingTop: 3,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Type: {this.state.type}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingTop: 3,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Lat: {this.state.pressCoordinates.latitude}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Poppins-Regular",
                  marginBottom: 10,
                }}
              >
                Long: {this.state.pressCoordinates.longitude}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontFamily: "Poppins-Regular" }}>
                  Multimedia :
                </Text>
                <View style={{ marginLeft: 10, marginTop: 5 }}>
                  {this.state.photo === false ? (
                    <>
                      <Text
                        style={{
                          textAlign: "center",
                          fontStyle: "italic",
                          fontFamily: "Poppins-Regular",
                          marginVertical: 20,
                        }}
                      >
                        Image will be placed here
                      </Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.imgcontainer}>
                        <View style={{ alignSelf: "center" }}>
                          {this.state.media && (
                            <Image
                              source={{ uri: this.state.media }}
                              style={{ width: 220, height: 100 }}
                            />
                          )}
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </View>

              <View
                style={{
                  borderTopWidth: 0.8,
                  borderColor: "lightgrey",
                  width: "100%",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingTop: 3,
                    fontFamily: "Poppins-Regular",
                    marginTop: 10,
                  }}
                >
                  Posted by : {`${this.state.userName}`}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    paddingTop: 3,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Phone no: {`${this.state.userPhone}`}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <CheckBox
              style={{ padding: 10 }}
              onClick={() => {
                this.setState({
                  checkedInformation: !this.state.checkedInformation,
                });
              }}
              isChecked={this.state.checkedInformation}
              rightText={
                "By clicking here and submitting, you are agreeing that the information you just posted about an emergency is valid, truthful, and currently occuring."
              }
              rightTextStyle={{
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                marginTop: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-around",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                { borderWidth: 1, borderColor: "#32527B" },
              ]}
              onPress={() => this.props.navigation.navigate("post")}
            >
              <Text style={[styles.btnText, { color: "#32527B" }]}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#32527B" }]}
              onPress={this.onSubmit}
            >
              <Text style={[styles.btnText, { color: "#FFFFFF" }]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
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
            {/* <Image
              source={require("../../../assets/images/main/verify.png")}
              style={{ width: 120, height: 120 }}
            /> */}
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Your emergency has been submitted successfully
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                { borderWidth: 1, borderColor: "#32527B" },
              ]}
              onPress={() => this.props.navigation.navigate("post")}
            >
              <Text style={[styles.btnText, { color: "#000000" }]}>DONE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
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
