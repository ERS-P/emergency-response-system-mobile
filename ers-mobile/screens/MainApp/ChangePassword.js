import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authInputs: {
        oldpassword: {
          type: "password",
          value: "",
        },
        newpassword: {
          type: "password",
          value: "",
        },
        confirmpassword: {
          type: "confirmPassword",
          value: "",
        },
      },
      validForm: true,
      loading: false,
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
  }

  resetUserInputs() {
    this.setState({
      authInputs: {
        oldpassword: {
          type: "password",
          value: "",
        },
        newpassword: {
          type: "password",
          value: "",
        },
        confirmpassword: {
          type: "confirmPassword",
          value: "",
        },
      },
    });
  }

  render() {
    const { authInputs } = this.state;

    return (
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
          <Text style={styles.header}>Change Password</Text>
          <View style={{ marginHorizontal: 6 }}>
            <FormInput
              textColor="#000"
              borderColor="#000"
              secureTextEntry={true}
              placeholder="Old Password"
              activeBorderColor="#000"
              error={this.renderError("authInputs", "oldpassword", "password")}
              returnKeyType={"next"}
              value={authInputs.oldpassword.value}
              onChangeText={(value) => {
                this.onInputChange({
                  field: "oldpassword",
                  value,
                  obj: "authInputs",
                });
              }}
            />
            <FormInput
              textColor="#000"
              borderColor="#000"
              secureTextEntry={true}
              placeholder=" New Password"
              activeBorderColor="#000"
              error={this.renderError("authInputs", "newpassword", "password")}
              returnKeyType={"next"}
              value={authInputs.newpassword.value}
              onChangeText={(value) => {
                this.onInputChange({
                  field: "newpassword",
                  value,
                  obj: "authInputs",
                });
              }}
            />
            <FormInput
              textColor="#000"
              borderColor="#000"
              secureTextEntry={true}
              placeholder="Confirm New Password"
              activeBorderColor="#000"
              error={this.renderError(
                "authInputs",
                "confirmpassword",
                "password"
              )}
              returnKeyType={"next"}
              value={authInputs.confirmpassword.value}
              onChangeText={(value) => {
                this.onInputChange({
                  field: "confirmpassword",
                  value,
                  obj: "authInputs",
                });
              }}
            />
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#32527B" }]}
            >
              <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 28,
    color: "#32527B",
    fontWeight: "bold",
    marginVertical: 10,
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
    paddingVertical: 13,
    marginTop: 28,
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});