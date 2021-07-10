import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import RNPickerSelect from "react-native-picker-select";
// import ImagePicker from "react-native-image-picker";
import PageHeader from "../../../components/PageHeader";
import { Ionicons, Fontisto } from "@expo/vector-icons";

class PostEmergencyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalImage: null,
      renderphoto: false,
      damages: "",
      description: "",
      type: this.props.route.params.type,
    };
  }

  _pickImage = async () => {
    
    this.setState({
      mode: false,
    });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({
        LocalImage: result.uri,
      });
    }
  };

  render() {
    const dataItems = [
      { id: 1, title: "YES", val: true },
      { id: 2, title: "NO", val: false },
    ];

    return (
      <View style={styles.container}>
        <PageHeader pageTitle={"Description"} />
        <ScrollView showsVerticalScrollIndicator={true}>
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

              <View>
                <Picker
                  style={{
                    width: 70,
                    height: 40,
                    padding: 2,
                    backgroundColor: "#F2F2F2",
                  }}
                  onValueChange={(itemValue) => {
                    this.setState({ damages: itemValue });
                  }}
                  selectedValue={this.state.damages}
                >
                  <Picker.Item value="" label="NONE" />
                  {dataItems.map((item) => {
                    return (
                      <Picker.Item
                        label={item.title}
                        value={item.val}
                        key={item.id}
                      />
                    );
                  })}
                </Picker>
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
            <View style={{ marginHorizontal: 2 }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
                Add a description to the emergency
              </Text>
              <TextInput
                multiline={true}
                backgroundColor={"#FFFFFF"}
                style={{ height: 100 }}
                onChangeText={(text) =>
                  this.setState({
                    description: text,
                  })
                }
              />
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
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
