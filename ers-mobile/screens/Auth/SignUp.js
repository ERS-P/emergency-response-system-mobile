import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import PagerView from "react-native-pager-view";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";
import CheckBox from "react-native-check-box";

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
      validForm: true,
      loading: false,
      responder: false,
    };
    this.pagerRef = React.createRef();
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.signup = this.signup.bind(this);
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
      };

      // this.props.navigation.navigate("BottomRoutes");
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
    if (this.state.responder) {
      return (
        <View style={{ flexDirection: "column", marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 10,
              paddingBottom: 5,
              fontFamily: "Poppins-Regular",
            }}
          >
            If you are a Paramedic,Law Enforcement, Firefighter, emergency
            response agency, or any other first responder, please provide your
            state license.
          </Text>

          <FormInput
            mode="outlined"
            returnKeyType={"done"}
            placeholder="State License"
            onChangeText={(value) => this.setState({ stateLicense: value })}
            ref={(input) => {
              this.dlTextInput = input;
            }}
            value={this.state.stateLicense}
          />
        </View>
      );
    } else {
      return;
    }
  }
  render() {
    const handlePress = (pageNumber) => {
      this.getFormValidation({ obj: "authInputs" });
      if (this.state.validForm) {
        Keyboard.dismiss();
        this.pagerRef.current.setPage(pageNumber);
        this.resetUserInputs();
      }
    };

    const handleDone = () => {
      this.getFormValidation({ obj: "authInputs" });
      if (this.state.validForm) {
        Keyboard.dismiss();
        this.props.navigation.navigate("signin");
        this.resetUserInputs();
      }
    };
    const { authInputs } = this.state;

    return (
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
                </View>
                <View style={styles.footer}>
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
                        <Text style={[styles.btnText, { color: "#32527B" }]}>
                          Back
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#32527B" }]}
                        onPress={() => handlePress(1)}
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
                </View>
                <View style={styles.footer}>
                  <Text style={styles.header}>SignUp</Text>

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
                        <Text style={[styles.btnText, { color: "#32527B" }]}>
                          Back
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#32527B" }]}
                        onPress={() => handleDone()}
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
          </PagerView>
        </View>
      </TouchableWithoutFeedback>
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
  },
  header: {
    fontSize: 25,
    color: "#32527B",
    fontWeight: "500",
    marginTop: 30,
    marginBottom: 10,
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
