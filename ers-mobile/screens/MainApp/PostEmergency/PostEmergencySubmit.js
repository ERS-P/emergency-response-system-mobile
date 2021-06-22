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

export default class PostEmergencySubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      damages: true,
      photo: true,
      checkedInformation: false,
      modalVisible: false,
    };
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
              marginHorizontal: 4,
              backgroundColor: "#F0F8FF",
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
                  Rediculously Huge Fire in Accra Sports Stadium
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
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </Text>
              <Text style={{ fontFamily: "Poppins-Regular" }}>
                Accra Zoo Park, Tema
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingTop: 3,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Type: Fire
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingTop: 3,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Lat: 5.19181
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Poppins-Regular",
                  marginBottom: 10,
                }}
              >
                Long: 2.10992
              </Text>
              <View
                style={{
                  borderTopWidth: 0.8,
                  borderColor: "lightgrey",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <View>
                  <CheckBox
                    style={{ padding: 5 }}
                    isChecked={this.state.damages}
                    rightText={"Human Damages."}
                  />
                  <CheckBox
                    style={{ padding: 5 }}
                    isChecked={this.state.photo}
                    rightText={"Image or Video Attached"}
                  />
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
                  Posted by : Samuel Appau
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    paddingTop: 3,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Phone no: 0500228273
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
              // onPress={this.onSubmit}
              onPress={() => this.setState({ modalVisible: true })}
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
            <Image
              source={require("../../../assets/images/main/verify.png")}
              style={{ width: 120, height: 120 }}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Your emergency has been submitted successfully
            </Text>
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
