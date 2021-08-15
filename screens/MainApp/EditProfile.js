import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import PagerView from "react-native-pager-view";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";
import { editProfile } from "../../api/auth";
import * as firebase from "firebase";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authInputs: {
        first_name: {
          type: "genericRequired",
          value: "",
        },
        last_name: {
          type: "genericRequired",
          value: "",
        },
        email: {
          type: "email",
          value: "",
        },
        phone: {
          type: "phone",
          value: "",
        },
        emergencyContact1: {
          type: "emergencyContact",
          value: "",
        },
        emergencyContact2: {
          type: "emergencyContact",
          value: "",
        },
      },
      password: this.props.route.params.password,
      validForm: true,
      loading: false,
      token: this.props.route.params.token,
    };

    this.pagerRef = React.createRef();
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
  }

  componentDidMount() {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            const {
              userID,
              firstname,
              lastname,
              email,
              phoneNumber,
              emergency_contact_1,
              emergency_contact_2,
            } = snapshot.val();
            this.setState({
              authInputs: {
                first_name: {
                  value: firstname,
                },
                last_name: {
                  value: lastname,
                },
                email: {
                  value: email,
                },
                phone: {
                  value: phoneNumber,
                },
                emergencyContact1: {
                  value: emergency_contact_1,
                },
                emergencyContact2: {
                  value: emergency_contact_2,
                },
              },
            });
          });
      }
    });
  }

  render() {
    const { authInputs, password, token } = this.state;
    const handlePress = (pageNumber) => {
      Keyboard.dismiss();
      this.pagerRef.current.setPage(pageNumber);
      // this.resetUserInputs()
    };

    const handleDone = () => {
      this.getFormValidation({ obj: "authInputs" });
      if (this.state.validForm) {
        Keyboard.dismiss();
        // this.resetUserInputs();
        console.log(token);
        const userData = {
          firstname: authInputs.first_name.value,
          lastname: authInputs.last_name.value,
          email: authInputs.email.value,
          phone: authInputs.phone.value,
          emergencyContact1: authInputs.emergencyContact1.value,
          emergencyContact2: authInputs.emergencyContact2.value,
          password: password,
          token: token,
        };
        console.log(userData);
        editProfile(userData);
      }
    };

    //const { first_name, last_name, email } = this.props.route.params

    return (
      <View style={styles.container}>
        <PagerView initialPage={0} ref={this.pagerRef} style={styles.pagerView}>
          <View key={1}>
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/images/bgShape.png")}
                style={{
                  justifyContent: "flex-start",
                  width: 215,
                  height: 165,
                }}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.header}>User Details</Text>
              <View style={{ marginHorizontal: 6 }}>
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="First name"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "first_name",
                    "first name"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.first_name.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "first_name",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Last name"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "last_name",
                    "last name"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.last_name.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "last_name",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="E-mail"
                  activeBorderColor="#000"
                  error={this.renderError("authInputs", "email", "email")}
                  returnKeyType={"next"}
                  value={authInputs.email.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "email",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Phone number"
                  activeBorderColor="#000"
                  error={this.renderError("authInputs", "phone", "phone")}
                  returnKeyType={"next"}
                  value={authInputs.phone.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "phone",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      { borderWidth: 1, borderColor: "#32527B" },
                    ]}
                    onPress={() => this.props.navigation.navigate("account")}
                  >
                    <Text style={[styles.btnText, { color: "#32527B" }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#32527B" }]}
                    onPress={() => handlePress(1)}
                  >
                    <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                      Save & continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View key={2}>
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/images/bgShape.png")}
                style={{
                  justifyContent: "flex-start",
                  width: 215,
                  height: 165,
                }}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.header}>Add extra information</Text>
              <View style={{ marginHorizontal: 6 }}>
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Emergency Contact no.1"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "emergencyContact1",
                    "emergency contact 1"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.emergencyContact1.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "emergencyContact1",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Emergency Contact no.2"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "emergencyContact1",
                    "emergency contact 1"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.emergencyContact2.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "emergencyContact2",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#32527B" }]}
                  onPress={handleDone}
                >
                  <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </PagerView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32527B",
  },
  topSection: {
    flex: 1.2,
  },
  header: {
    fontSize: 25,
    color: "#32527B",
    fontWeight: "500",
    marginVertical: 5,
    fontFamily: "Poppins-Regular",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    flex: 2.9,
  },
  btn: {
    padding: 10,
    width: "45%",
    borderRadius: 20,
    marginTop: 15,
  },
  btnText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
  pagerView: {
    flex: 1,
    margin: 0,
  },
});
