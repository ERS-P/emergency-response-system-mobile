import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
} from "react-native";
import PagerView from "react-native-pager-view";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";
import CheckBox from "react-native-check-box";
import { createUser } from "../../api/auth";
import * as Notifications from "expo-notifications";
import Permissions from "expo-permissions";

export default class SignUp extends Component {
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
        password: {
          type: "password",
          value: "",
        },
        confirmPassword: {
          type: "genericRequired",
          value: "",
        },
        nationalID: {
          type: "genericRequired",
          value: "",
        },
        stateLicense: {
          type: "genericRequired",
          value: "",
        },
      },
      branch: "",
      department: "",
      validForm: true,
      loading: false,
      responder: false,
      token: "",
    };
    this.pagerRef = React.createRef();
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.signup = this.signup.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(
      this
    );
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let tokenVar = await Notifications.getExpoPushTokenAsync();
    console.log("PushNotificationToken:" + tokenVar);
    this.setState({ token: tokenVar });
  }

  signup() {
    this.getFormValidation({ obj: "authInputs" });
    if (this.state.validForm) {
      Keyboard.dismiss();
      const { authInputs } = this.state;
      const user = {
        first_name: authInputs.first_name.value,
        last_name: authInputs.last_name.value,
        email: authInputs.email.value,
        phone: authInputs.phone.value,
        password: authInputs.password.value,
        confirmPassword: authInputs.confirmPassword.value,
        nationalID: authInputs.nationalID.value,
        stateLicense: authInputs.stateLicense.value,
        responder: this.state.responder,
        token: this.state.token,
      };

      const loggedIn = createUser(user);

      if (loggedIn) {
        this.props.navigation.navigate("main");
      }

      this.resetUserInputs();
    }
  }

  resetUserInputs() {
    this.setState({
      authInputs: {
        first_name: { type: "name", value: "" },
        last_name: { type: "name", value: "" },
        phone: { type: "phone", value: "" },
        email: { type: "email", value: "" },
        password: { type: "password", value: "" },
        confirmPassword: { type: "confirm_password", value: "" },
        nationalID: { type: "genericRequired", value: "" },
        stateLicense: { type: "genericRequired", value: "" },
      },
    });
  }

  renderresponderSection() {
    const dataItems = [
      { id: 1, title: "Fire Service", val: "fire" },
      { id: 2, title: "Police Service", val: "police" },
      { id: 2, title: "Ambulance Service", val: "ambulance" },
    ];

    if (this.state.responder) {
      return (
        <KeyboardAvoidingView style={{ flex: 0 }} behavior="padding">
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={{ flexDirection: "column", marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  paddingBottom: 5,
                  fontFamily: "Poppins-Regular",
                }}
              >
                If you are a Paramedic,Law Enforcement, Firefighter, emergency
                response agency, or any other responder, please provide your
                state license.
              </Text>

              <FormInput
                mode="outlined"
                returnKeyType={"done"}
                style={{ marginTop: -5 }}
                placeholder="State License"
                onChangeText={(value) => this.setState({ stateLicense: value })}
                ref={(input) => {
                  this.dlTextInput = input;
                }}
                value={this.state.stateLicense}
              />
              <FormInput
                mode="outlined"
                returnKeyType={"done"}
                placeholder="Branch"
                onChangeText={(value) => this.setState({ branch: value })}
                ref={(input) => {
                  this.dlTextInput = input;
                }}
                value={this.state.branch}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 10,
                  marginTop: 10,
                }}
              >
                <View>
                  <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular" }}>
                    Department
                  </Text>
                </View>
                <View style={{ backgroundColor: "#F2F2F2" }}>
                  <Picker
                    style={{
                      width: 200,
                      height: 30,
                      paddingVertical: 10,
                      paddingHorizontal: 2,
                      borderRadius: 10,
                      marginLeft: 30,
                      borderRadius: 8,
                      backgroundColor: "#F2F2F2",
                    }}
                    onValueChange={(itemValue) => {
                      this.setState({ department: itemValue });
                    }}
                    selectedValue={this.state.department}
                  >
                    <Picker.Item value="" label="Select your department" />
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    } else {
      return;
    }
  }
  render() {
    const handlePress = (pageNumber) => {
      // this.getFormValidation({ obj: "authInputs" });
      // if (this.state.validForm) {
      //   Keyboard.dismiss();
      //   this.pagerRef.current.setPage(pageNumber);
      //   this.resetUserInputs();
      // }
      this.pagerRef.current.setPage(pageNumber);
    };

    const handleDone = () => {
      // this.getFormValidation({ obj: "authInputs" });
      // if (this.state.validForm) {
      //   Keyboard.dismiss();
      //   this.props.navigation.navigate("main");
      //   this.resetUserInputs();
      // }
      // this.props.navigation.navigate("main");
      const { authInputs } = this.state;
      const user = {
        first_name: authInputs.first_name.value,
        last_name: authInputs.last_name.value,
        email: authInputs.email.value,
        phone: authInputs.phone.value,
        password: authInputs.password.value,
        confirmPassword: authInputs.confirmPassword.value,
        nationalID: authInputs.nationalID.value,
        stateLicense: authInputs.stateLicense.value,
        responder: this.state.responder,
        token: this.state.token,
      };

      const loggedIn = createUser(user);

      if (loggedIn) {
        this.props.navigation.navigate("main");
      }
    };
    const { authInputs } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.container}>
            <PagerView
              initialPage={0}
              ref={this.pagerRef}
              style={styles.pagerView}
            >
              <View key={1}>
                <View style={styles.container}>
                  <View style={styles.topSection}>
                    <Image
                      source={require("../../assets/images/bgShape.png")}
                      style={{
                        justifyContent: "flex-start",
                        width: 210,
                        height: 150,
                      }}
                    />
                    <View style={{ marginTop: 40 }}>
                      <Image
                        source={require("../../assets/images/app_logo1.png")}
                        style={{
                          width: 150,
                          height: 80,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: "center",
                          color: "#FFFFFF",
                          fontFamily: "Poppins-Regular",
                          fontSize: 18,
                        }}
                      >
                        ALERT GHANA
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Text style={styles.header}>SignUp</Text>
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
                        <KeyboardAvoidingView
                          style={{ flex: 0 }}
                          behavior="padding"
                        >
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
                            error={this.renderError(
                              "authInputs",
                              "email",
                              "email"
                            )}
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
                            placeholder="Phone Number"
                            activeBorderColor="#000"
                            error={this.renderError(
                              "authInputs",
                              "phone",
                              "phone number"
                            )}
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
                        </KeyboardAvoidingView>

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
                            onPress={() =>
                              this.props.navigation.navigate("welcome")
                            }
                          >
                            <Text
                              style={[styles.btnText, { color: "#32527B" }]}
                            >
                              Back
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#32527B" }]}
                            onPress={() => handlePress(1)}
                          >
                            <Text
                              style={[styles.btnText, { color: "#FFFFFF" }]}
                            >
                              Proceed
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>

              <View key={2}>
                <View style={styles.container}>
                  <View style={styles.topSection}>
                    <Image
                      source={require("../../assets/images/bgShape.png")}
                      style={{
                        justifyContent: "flex-start",
                        width: 210,
                        height: 150,
                      }}
                    />
                    <View style={{ marginTop: 40 }}>
                      <Image
                        source={require("../../assets/images/app_logo1.png")}
                        style={{
                          width: 150,
                          height: 80,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: "center",
                          color: "#FFFFFF",
                          fontFamily: "Poppins-Regular",
                          fontSize: 18,
                        }}
                      >
                        ALERT GHANA
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.header}>SignUp</Text>

                    <View style={{ marginHorizontal: 6 }}>
                      <FormInput
                        textColor="#000"
                        borderColor="#000"
                        secureTextEntry={true}
                        placeholder="Password"
                        activeBorderColor="#000"
                        error={this.renderError(
                          "authInputs",
                          "password",
                          "password"
                        )}
                        returnKeyType={"next"}
                        value={authInputs.password.value}
                        onChangeText={(value) => {
                          this.onInputChange({
                            field: "password",
                            value,
                            obj: "authInputs",
                          });
                        }}
                      />
                      <FormInput
                        textColor="#000"
                        borderColor="#000"
                        secureTextEntry={true}
                        placeholder="Confirm Password"
                        activeBorderColor="#000"
                        error={this.renderError(
                          "authInputs",
                          "confirmPassword",
                          "confirmPassword"
                        )}
                        returnKeyType={"next"}
                        value={authInputs.confirmPassword.value}
                        onChangeText={(value) => {
                          this.onInputChange({
                            field: "confirmPassword",
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
                          onPress={() => handlePress(0)}
                        >
                          <Text style={[styles.btnText, { color: "#32527B" }]}>
                            Back
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.btn, { backgroundColor: "#32527B" }]}
                          onPress={() => handlePress(2)}
                        >
                          <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                            Proceed
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View key={3}>
                <View style={styles.container}>
                  <View style={styles.topSection}>
                    <Image
                      source={require("../../assets/images/bgShape.png")}
                      style={{
                        justifyContent: "flex-start",
                        width: 210,
                        height: 150,
                      }}
                    />
                    <View style={{ marginTop: 40 }}>
                      <Image
                        source={require("../../assets/images/app_logo1.png")}
                        style={{
                          width: 150,
                          height: 80,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "500",
                          textAlign: "center",
                          color: "#FFFFFF",
                          fontFamily: "Poppins-Regular",
                          fontSize: 18,
                        }}
                      >
                        ALERT GHANA
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Text style={styles.header}>SignUp</Text>
                      <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                      >
                        <View style={{ marginHorizontal: 6 }}>
                          <FormInput
                            textColor="#000"
                            borderColor="#000"
                            placeholder="National ID"
                            activeBorderColor="#000"
                            error={this.renderError(
                              "authInputs",
                              "nationalID",
                              "name"
                            )}
                            returnKeyType={"next"}
                            value={authInputs.nationalID.value}
                            onChangeText={(value) => {
                              this.onInputChange({
                                field: "nationalID",
                                value,
                                obj: "authInputs",
                              });
                            }}
                          />

                          <CheckBox
                            style={{ padding: 10 }}
                            onClick={() => {
                              this.setState({
                                responder: !this.state.responder,
                              });
                            }}
                            isChecked={this.state.responder}
                            rightText={
                              "Are you a police officer, firefigher, paramedic, or first responder?"
                            }
                          />

                          {this.renderresponderSection()}
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
                              onPress={() => handlePress(1)}
                            >
                              <Text
                                style={[styles.btnText, { color: "#32527B" }]}
                              >
                                Back
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.btn,
                                { backgroundColor: "#32527B" },
                              ]}
                              onPress={() => handleDone()}
                            >
                              {this.state.loading === false ? (
                                <Text
                                  style={[styles.btnText, { color: "#FFFFFF" }]}
                                >
                                  Proceed
                                </Text>
                              ) : (
                                <Text
                                  style={[styles.btnText, { color: "#FFFFFF" }]}
                                >
                                  Please wait...
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </KeyboardAvoidingView>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </PagerView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    margin: 0,
  },

  container: {
    flex: 1,
    backgroundColor: "#32527B",
  },
  topSection: {
    flex: 1.2,
    flexDirection: "row",
  },
  header: {
    fontSize: 25,
    color: "#32527B",
    fontWeight: "500",
    marginTop: 30,
    marginBottom: 2,
    fontFamily: "Poppins-Regular",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    flex: 2.8,
  },
  btn: {
    padding: 10,
    width: "45%",
    borderRadius: 20,
  },
  btnText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
