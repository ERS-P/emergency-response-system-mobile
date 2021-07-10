import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: this.props.borderColor,
      isSecureEntry: true,
    };
  }

  renderError() {
    const { error, errorStyle } = this.props;
    if (error) {
      return (
        <Animatable.Text
          animation="wobble"
          duration={500}
          useNativeDriver
          style={[styles.inputError, errorStyle]}
        >
          {error}
        </Animatable.Text>
      );
    }
  }

  onFocus() {
    this.setState({
      borderColor: this.props.activeBorderColor,
    });
  }

  onBlur() {
    this.setState({
      borderColor: this.props.borderColor,
    });
  }

  render() {
    const {
      error,
      style,
      containerStyle,
      textColor,
      fontSize,
      selectionColor,
      leftIcon,
      leftIconStyle,
      rightIcon,
      rightIconStyle,
      placeholder,
      placeholderTextColor,
      keyboardType,
      autoCapitalize,
      maxLength,
      numberOfLines,
      spellCheck,
      autoCorrect,
      secureTextEntry,
      autoComplete,
      returnKeyType,
      value,
      ...props
    } = this.props;

    const inputStyles = [
      styles.textbox,
      { borderBottomColor: this.state.borderColor },
      textColor && { color: textColor },
      fontSize && { fontSize: fontSize },
      leftIcon && { paddingLeft: 24 * 3.3 },
      rightIcon && { paddingRight: 24 * 3.3 },
      style,
    ];

    return (
      <View style={containerStyle}>
        {<View style={[styles.inputLeftIcon, leftIconStyle]}>{leftIcon}</View>}
        <TextInput
          style={[inputStyles]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          spellCheck={spellCheck}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          value={value}
          underlineColorAndroid="transparent"
          returnKeyType={returnKeyType || "done"}
          selectionColor={selectionColor || "#000"}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          {...props}
        />
        {rightIcon ? (
          <TouchableOpacity>
            <View style={[styles.inputRightIcon, rightIconStyle]}>
              {rightIcon}
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    width: 16 * 2,
    height: 16 * 2,
    top: 16,
    right: 0,
  },
  textWhite: {
    color: "#fff",
  },
  textbox: {
    color: "#000",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 26,
    fontSize: 15,
    color: "#000",
    backgroundColor: "#f2f2f2",
    marginTop: 25,
    height: 50,
  },
  inputError: {
    color: "#ee0701",
    bottom: 19,
    right: 10,
    position: "absolute",
    fontSize: 12,
  },
  inputLeftIcon: {
    // position:'absolute',
    left: 0,
    top: 10,
    paddingHorizontal: 24,
  },
  inputRightIcon: {
    position: "absolute",
    right: 0,
    bottom: 14,
    paddingHorizontal: 24,
  },
});
