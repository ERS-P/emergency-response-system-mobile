import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PageHeader from "../../../components/PageHeader";
import { Ionicons, AntDesign } from "@expo/vector-icons";

class PostEmergencyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { LocalImage: null, renderphoto: false };
  }
  _renderImages() {
    <View style={{ marginLeft: 2, alignSelf: "center" }}>
      {this.state.LocalImage && (
        <Image
          source={{ uri: this.state.LocalImage }}
          style={{ width: "90%", height: 160 }}
        />
      )}
      <TouchableOpacity>
        <AntDesign
          name="minuscircle"
          color="red"
          size={16}
          style={{ marginTop: -5 }}
        />
      </TouchableOpacity>
    </View>;
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
    return (
      <View style={styles.container}>
        <PageHeader pageTitle={"Description"} />
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ marginHorizontal: 7 }}>
            <TouchableOpacity style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="ios-person" size={25} />
                <Text style={styles.cardText}>Human Damages</Text>
              </View>
              <View>
                <Text>Yes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={this._pickImage}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="ios-camera" size={25} />
                <Text style={styles.cardText}>Add a photo or a video feed</Text>
              </View>
              <View>
                <Text></Text>
              </View>
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
                onPress={() => this.props.navigation.navigate("map")}
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
