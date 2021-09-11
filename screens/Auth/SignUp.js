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
  TextInput,
} from "react-native";
import { Item, Picker, Textarea, Form } from "native-base";
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
        height: {
          type: "genericRequired",
          value: "",
        },
        weight: {
          type: "genericRequired",
          value: "",
        },
        branch: { type: "genericRequired", value: "" },
      },
      department: "",
      validForm: true,
      loading: false,
      status: "",
      chronic: "",
      responder: false,
      healthDesc: "",
      respiratory: "",
      allergies: "",
      token: "",
    };
    this.pagerRef = React.createRef();
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
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

  renderresponderSection() {
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
                If you are a paramedic,law enforcement, firefighter please fill
                this section
              </Text>

              <FormInput
                mode="outlined"
                returnKeyType={"done"}
                style={{ marginTop: -5 }}
                placeholder="State License"
                onChangeText={(value) => {
                  this.onInputChange({
                    field: "stateLicense",
                    value,
                    obj: "authInputs",
                  });
                }}
                ref={(input) => {
                  this.dlTextInput = input;
                }}
                value={this.state.authInputs.stateLicense}
              />
              <FormInput
                mode="outlined"
                returnKeyType={"done"}
                placeholder="Branch"
                onChangeText={(value) => {
                  this.onInputChange({
                    field: "branch",
                    value,
                    obj: "authInputs",
                  });
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 10,
                  marginTop: 15,
                }}
              >
                <View style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular" }}>
                    Department
                  </Text>
                </View>

                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{ width: 250, fontWeight: "bold" }}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(itemValue) => {
                      this.setState({ department: itemValue });
                    }}
                    selectedValue={this.state.department}
                  >
                    <Picker.Item label="Select an option" />
                    <Picker.Item label="Fire service" value="Fire" />
                    <Picker.Item label="Ambulance service" value="Ambulance" />
                    <Picker.Item label="Police service" value="Police" />
                  </Picker>
                </Item>
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
      if (pageNumber === 1) {
        this.getFormValidation({ obj: "authInputs" });
        if (
          this.state.validForm === true &&
          authInputs.first_name.value != "" &&
          authInputs.last_name.value != "" &&
          authInputs.email.value != "" &&
          authInputs.phone.value != ""
        ) {
          Keyboard.dismiss();
          this.pagerRef.current.setPage(1);
          // this.resetUserInputs1();
        } else {
          this.pagerRef.current.setPage(0);
        }
      } else if (pageNumber === 2) {
        this.getFormValidation({ obj: "authInputs" });
        if (
          this.state.validForm === true ||
          authInputs.password.value != ""
          // authInputs.confirmPassword.value != ""
        ) {
          Keyboard.dismiss();
          this.pagerRef.current.setPage(2);
          // this.resetUserInputs2();
        } else {
          this.pagerRef.current.setPage(1);
        }
      } else if (pageNumber === 3) {
        // if (this.state.validForm) {
        Keyboard.dismiss();
        this.pagerRef.current.setPage(3);
        // }
        // this.resetUserInputs3();
        // } else {
        //   if (this.state.validForm) {
        //     Keyboard.dismiss();
        //     this.pagerRef.current.setPage(2);
        //     // this.resetUserInputs4();
        //   }
        // }
      }
    };

    const handleDone = () => {
      this.setState({ loading: true });
      const {
        authInputs,
        status,
        chronic,
        healthDesc,
        respiratory,
        allergies,
      } = this.state;

      const medInfo = {
        height: authInputs.height.value,
        weight: authInputs.weight.value,
        healthStatus: status,
        chronicDisease: chronic,
        healthDesc: healthDesc,
        respiratory: respiratory,
        allergies: allergies,
      };
      const user = {
        first_name: authInputs.first_name.value,
        last_name: authInputs.last_name.value,
        email: authInputs.email.value,
        phone: authInputs.phone.value,
        password: authInputs.password.value,
        confirmPassword: authInputs.confirmPassword.value,
        nationalID: authInputs.nationalID.value,
        stateLicense: authInputs.stateLicense.value,
        branch: authInputs.branch.value,
        department: this.state.department,
        responder: this.state.responder,
        medicalInfo: medInfo,
        token: this.state.token,
      };
      Keyboard.dismiss();

      createUser(user, this);

      // this.getFormValidation({ obj: "authInputs" });
      // if (this.state.validForm && authInputs.nationalID.value != "") {
      //   Keyboard.dismiss();

      //   createUser(user, this);
      //   // this.resetUserInputs();
      // }
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
                        width: 120,
                        height: 90,
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
                          fontWeight: "800",
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
                              this.props.navigation.navigate("authmain")
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
                        width: 150,
                        height: 90,
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
                        width: 150,
                        height: 80,
                      }}
                    />
                    <View style={{ marginTop: 40 }}>
                      <Image
                        source={require("../../assets/images/app_logo1.png")}
                        style={{
                          width: 120,
                          height: 80,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "800",
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
                      <Text style={styles.header}>Medical Information</Text>

                      <View style={{ marginHorizontal: 2 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 4,
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              textColor="#000"
                              borderColor="#000"
                              placeholder="Height"
                              activeBorderColor="#000"
                              returnKeyType={"next"}
                              value={authInputs.height.value}
                              style={{
                                width: "47%",
                                backgroundColor: "#F2F2F2",
                                height: 39,
                                borderRadius: 20,
                                padding: 8,
                              }}
                              onChangeText={(value) => {
                                this.onInputChange({
                                  field: "height",
                                  value,
                                  obj: "authInputs",
                                });
                              }}
                            />
                            <Text
                              style={{
                                textAlign: "center",
                                alignSelf: "center",
                              }}
                            >
                              cm
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              textColor="#000"
                              borderColor="#000"
                              placeholder="Weight"
                              activeBorderColor="#000"
                              returnKeyType={"next"}
                              style={{
                                width: "47%",
                                backgroundColor: "#F2F2F2",
                                height: 39,
                                borderRadius: 20,
                                padding: 8,
                              }}
                              value={authInputs.weight.value}
                              onChangeText={(value) => {
                                this.onInputChange({
                                  field: "weight",
                                  value,
                                  obj: "authInputs",
                                });
                              }}
                            />
                            <Text
                              style={{
                                textAlign: "center",
                                alignSelf: "center",
                              }}
                            >
                              kg
                            </Text>
                          </View>
                        </View>

                        <View style={{ width: "100%", marginTop: 5 }}>
                          <Form>
                            <Text
                              style={{
                                fontFamily: "Poppins-Regular",
                                marginTop: 4,
                                fontSize: 14,
                              }}
                            >
                              Rate you health status?
                            </Text>
                            <Item picker>
                              <Picker
                                mode="dropdown"
                                style={{ width: 250, fontWeight: "bold" }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.status}
                                onValueChange={(itemValue) => {
                                  this.setState({ status: itemValue });
                                }}
                              >
                                <Picker.Item label="Select an option" />
                                <Picker.Item label="Bad" value="Bad" />
                                <Picker.Item label="Good" value="Good" />
                                <Picker.Item
                                  label="Very Good"
                                  value="Very Good"
                                />
                                <Picker.Item label="Awesome" value="Awesome" />
                              </Picker>
                            </Item>

                            <Text
                              style={{
                                fontFamily: "Poppins-Regular",
                                marginTop: 4,
                                fontSize: 14,
                              }}
                            >
                              Chronic Medical Condition
                            </Text>
                            <Item picker>
                              <Picker
                                mode="dropdown"
                                style={{ width: 250, fontWeight: "bold" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.chronic}
                                onValueChange={(itemValue) => {
                                  this.setState({ chronic: itemValue });
                                }}
                              >
                                <Picker.Item label="Select an option" />
                                <Picker.Item label="None" value="None" />
                                <Picker.Item label="Epilesy" value="Epilesy" />
                                <Picker.Item
                                  label="Diabetes"
                                  value="Diabetes"
                                />
                                <Picker.Item
                                  label="Heart Disease"
                                  value="Heart Disease"
                                />
                                <Picker.Item label="Cancer" value="Cancer" />
                                <Picker.Item label="Stroke" value="Stroke" />
                                <Picker.Item
                                  label="Kidney Disease"
                                  value="Kidney Disease"
                                />
                                <Picker.Item
                                  label="Alzheimer's"
                                  value="Alzheimer's"
                                />
                              </Picker>
                            </Item>

                            <Text
                              style={{
                                fontFamily: "Poppins-Regular",
                                marginTop: 4,
                                fontSize: 14,
                                marginTop: 12,
                                marginBottom: 10,
                              }}
                            >
                              Briefly describe your health condition ?
                            </Text>

                            <Textarea
                              rowSpan={4}
                              bordered
                              placeholder="description should be brief..."
                              value={this.state.healthDesc}
                              onChangeText={(itemValue) => {
                                this.setState({ healthDesc: itemValue });
                              }}
                            />
                          </Form>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 10,
                            justifyContent: "space-around",
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              styles.btn,
                              { borderWidth: 1, borderColor: "#32527B" },
                            ]}
                            onPress={() => handlePress(2)}
                          >
                            <Text
                              style={[styles.btnText, { color: "#32527B" }]}
                            >
                              Back
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#32527B" }]}
                            onPress={() => handlePress(3)}
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

              <View key={4}>
                <View style={styles.container}>
                  <View style={styles.topSection}>
                    <Image
                      source={require("../../assets/images/bgShape.png")}
                      style={{
                        justifyContent: "flex-start",
                        width: 150,
                        height: 90,
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
                              "nationalID"
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
                                {
                                  borderWidth: 1,
                                  borderColor: "#32527B",
                                },
                              ]}
                              onPress={() => handlePress(2)}
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
  cardText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
});
