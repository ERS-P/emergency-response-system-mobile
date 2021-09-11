import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Textarea, Form } from "native-base";
import * as ImagePicker from "expo-image-picker";
import PageHeader from "../../../components/PageHeader";
import { RadioButton } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

class PostEmergencyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalImage: null,
      renderphoto: false,
      damages: null,
      description: "",
      type: this.props.route.params.type,
      title: "",
    };
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
      renderphoto: true,
    });
  };

  componentDidMount() {
    if (this.state.type === "fire") {
      this.setState({ title: "Fire Emergency reported at Legon" });
    } else if ((this.state.type = "flood")) {
      this.setState({ title: "Flood Emergency reported at Legon" });
    } else if ((this.state.type = "violence")) {
      this.setState({
        title: "Violence reported on Legon campus",
      });
    } else if ((this.state.type = "first_aid")) {
      this.setState({
        title: "First aid needed urgently on Legon campus",
      });
    } else if ((this.state.type = "accident")) {
      this.setState({
        title: "Vehicle accident reported on Legon campus",
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <PageHeader pageTitle={"Description"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 19, marginVertical: 15 }}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="ios-person-circle-sharp"
                  size={30}
                  color="black"
                  style={{ marginRight: 4 }}
                />

                <Text style={styles.cardText}>Human Damages</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    label="YES"
                    value="YES"
                    color="#000000"
                    status={
                      this.state.damages === true ? "checked" : "unchecked"
                    }
                    onPress={() => this.setState({ damages: true })}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Regular",
                      marginTop: 5,
                    }}
                  >
                    YES
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    value="NO"
                    color="#000000"
                    status={
                      this.state.damages === false ? "checked" : "unchecked"
                    }
                    onPress={() => this.setState({ damages: false })}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Regular",
                      textAlign: "center",
                      marginTop: 5,
                    }}
                  >
                    NO
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.card} onPress={this._pickImage}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="ios-camera"
                  size={25}
                  style={{ marginRight: 40 }}
                />
                <Text style={styles.cardText}>Add a photo or a video feed</Text>
              </View>
              <View></View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 2, alignSelf: "center" }}>
              {this.state.renderphoto === false ? (
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
                      {this.state.LocalImage && (
                        <Image
                          source={{ uri: this.state.LocalImage }}
                          style={{ width: 310, height: 200 }}
                        />
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      padding: 9,
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      marginRight: 5,
                      backgroundColor: "#5D88BB",
                    }}
                    onPress={this._pickImage}
                  >
                    <MaterialCommunityIcons
                      name="camera-retake"
                      size={24}
                      color="#FFF"
                      style={{ alignSelf: "center" }}
                    />
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: "Poppins-Regular",
                        marginLeft: 3,
                        textAlign: "center",
                      }}
                    >
                      Retake
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={{ marginHorizontal: 2 }}>
              <KeyboardAvoidingView style={{ flex: 0 }} behavior="padding">
                <TouchableWithoutFeedback
                  style={{ flex: 1 }}
                  onPress={() => Keyboard.dismiss()}
                >
                  <>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 14,
                        marginTop: 6,
                      }}
                    >
                      Add a description to the emergency
                    </Text>
                    <Form>
                      <Textarea
                        rowSpan={6}
                        bordered
                        style={{ borderRadius: 9.5 }}
                        backgroundColor={"#FFF"}
                        placeholder="description should be brief..."
                        value={this.state.description}
                        onChangeText={(val) => {
                          this.setState({ description: val });
                        }}
                      />
                    </Form>
                  </>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={[styles.btn, { borderWidth: 1, borderColor: "#32527B" }]}
              >
                <Text style={[styles.btnText, { color: "#32527B" }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#32527B" }]}
                onPress={() =>
                  this.props.navigation.navigate("map", {
                    type: this.state.type,
                    title: this.state.title,
                    damages: this.state.damages,
                    description: this.state.description,
                    media: this.state.LocalImage,
                  })
                }
              >
                <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                  CONTINUE
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50 }}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 1,
    marginRight: 30,
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
  cardText: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
  },
  imgcontainer: {
    marginHorizontal: 8,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "#5D88BB",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.26,
    elevation: 0.5,
  },
  btn: {
    padding: 9,
    width: "44%",
    marginTop: 20,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
