import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PageHeader from "../../../components/PageHeader";
import { RadioButton } from "react-native-paper";
import { Ionicons, Fontisto } from "@expo/vector-icons";

class PostEmergencyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalImage: null,
      renderphoto: false,
      damages: true,
      description: "",
      type: this.props.route.params.type,
      title: "",
    };
  }
  _pickImage = async () => {
    this.setState({
      mode: false,
    });
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
  };

  // _pickImage = async () => {
  //   this.setState({
  //     mode: false,
  //   });

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     this.setState({
  //       LocalImage: result.uri,
  //     });
  //   }
  // };

  render() {
    // const dataItems = [
    //   { id: 1, title: "YES", val: true },
    //   { id: 2, title: "NO", val: false },
    // ];

    return (
      <View style={styles.container}>
        <PageHeader pageTitle={"Description"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 7 }}>
            <View style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Fontisto
                  name="persons"
                  color="black"
                  size={25}
                  style={{ marginRight: 10 }}
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
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.cardText}>Add a photo or a video feed</Text>
              </View>
              <View></View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 2, alignSelf: "center" }}>
              {this.state.renderphoto === true ? (
                <View></View>
              ) : (
                <View style={styles.imgcontainer}>
                  <View style={{ alignSelf: "center" }}>
                    {this.state.LocalImage && (
                      <Image
                        source={{ uri: this.state.LocalImage }}
                        style={{ width: 340, height: 180 }}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginHorizontal: 2 }}>
                <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
                  Emergency Title
                </Text>
                <TextInput
                  backgroundColor={"#FFFFFF"}
                  style={{ height: 45 }}
                  onChangeText={(text) =>
                    this.setState({
                      title: text,
                    })
                  }
                />
              </View>
              <View style={{ marginHorizontal: 2 }}>
                <KeyboardAvoidingView style={{ flex: 0 }} behavior="padding">
                  <TouchableWithoutFeedback
                    style={{ flex: 1 }}
                    onPress={() => Keyboard.dismiss()}
                  >
                    <>
                      <Text
                        style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}
                      >
                        Add a description to the emergency
                      </Text>
                      <TextInput
                        multiline={true}
                        numberOfLines={4}
                        backgroundColor={"#FFFFFF"}
                        // style={{ height: 100 }}
                        onChangeText={(text) =>
                          this.setState({
                            description: text,
                          })
                        }
                      />
                    </>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </View>
            </ScrollView>

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
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 1,
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
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  imgcontainer: {
    marginHorizontal: 1,
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    width: "45%",
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
