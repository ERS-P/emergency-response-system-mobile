import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView from "react-native-maps";
import { getUser } from "../../../api/auth";

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (e) => reject(e)
    );
  });
};

export default class AddEmergencyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: "",
      units: "",
      distance: 0,
      region: {
        latitude: 5.614818,
        longitude: -0.205874,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      title:this.props.route.params.title,
      type: this.props.route.params.type,
      description: this.props.route.params.description,
      media: this.props.route.params.media,
      damages: this.props.route.params.damages,

      pressCoordinates: {
        latitude: 5.614818,
        longitude: -0.205874,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      },
    };
    this.setDirection = this.setDirection.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setUnits = this.setUnits.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setDirection(text) {
    this.setState({ direction: text });
  }

  setDistance(text) {
    this.setState({ distance: text });
  }

  setUnits(text) {
    this.setState({ units: text });
  }

  onSubmit() {
    console.log(this.state.damages);
    Alert.alert(
      "Are you sure this is the correct location of the emergency?",
      "Please pick an option",
      [
        {
          text: "No",
          onPress: () => console.warn("NO Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => 
            this.props.navigation.navigate("submit", {
              type: this.state.type,
              media:this.state.media,
              title:this.state.title,
              damages:this.state.damages,
              // title: this.state.title,
              description: this.state.description,
              pressCoordinates: this.state.pressCoordinates,
              user: getUser
            }),
        },
      ]
    );
  }

  componentDidMount() {
    return getCurrentLocation().then((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        },
        pressCoordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={{ flex: 1, marginHorizontal: 2, marginTop: 5 }}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                marginBottom: 2,
                marginLeft: 5,
              }}
            >
              Indicate your position
            </Text>
            <View
              style={{
                marginHorizontal: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <TextInput style={styles.input} />
              <TouchableOpacity style={styles.btn}>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  Search
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingBottom: 10, marginHorizontal: 2 }}>
              <MapView
                showsUserLocation={true}
                style={{ flex: 1, height: 200 }}
                region={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                userLocationAnnotationTitle={""}
                showsUserLocation={true}
                pitchEnabled={false}
                rotateEnabled={true}
                scrollEnabled={true}
                zoomEnabled={true}
                onPress={(e) =>
                  this.setState({
                    pressCoordinates: e.nativeEvent.coordinate,
                  })
                }
                onLongPress={(e) =>
                  this.setState({
                    pressCoordinates: e.nativeEvent.coordinate,
                  })
                }
              >
                <MapView.Marker coordinate={this.state.pressCoordinates} />
              </MapView>
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
                onPress={() => this.props.navigation.navigate("info")}
              >
                <Text style={[styles.btnText, { color: "#32527B" }]}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#32527B" }]}
                onPress={this.onSubmit}
              >
                <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                  CONTINUE
                </Text>
              </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: "78%",
  },
  btn: {
    padding: 10,
    width: "20%",
    borderRadius: 8,
    backgroundColor: "#5D88BB",
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
