import React, { Component } from "react";
import { View, Image } from "react-native";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/images/loading/preloader.gif")}
        />
        <Image
          style={{ width: 136, height: 50, paddingTop: 10 }}
          source={require("../assets/images/loading/loadingtext.gif")}
        />
      </View>
    );
  }
}
