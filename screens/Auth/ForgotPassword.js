import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";
import { forgotPassword } from "../../api/auth";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authInputs: {
        email: {
          type: "email",
          value: "",
        },
      },
      validForm: true,
      loading: false,
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.forgotpassword = this.forgotpassword.bind(this);
  }

  forgotpassword() {
    this.setState({ loading: true });
    this.getFormValidation({ obj: "authInputs" });
    if (this.state.validForm) {
      Keyboard.dismiss();
      const { authInputs } = this.state;
      forgotPassword(authInputs.email.value, this);
    }
    this.resetUserInputs();
  }

  resetUserInputs() {
    this.setState({
      authInputs: {
        email: { type: "email", value: "" },
      },
    });
  }

  render() {
    const { authInputs } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.container}>
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
              <Text style={styles.header}>Forgot Password</Text>
              <View style={{ marginHorizontal: 6 }}>
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
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                    marginBottom: 2,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  A confirmation message will be sent to your email
                </Text>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#32527B" }]}
                  onPress={() => this.forgotpassword()}
                >
                  {this.state.loading === false ? (
                    <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                      CONTINUE
                    </Text>
                  ) : (
                    <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                      Please wait...
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    width: "100%",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 15,
  },
  btnText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
