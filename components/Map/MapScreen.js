import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image , Platform} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import InfoModal from "./../Modal/InfoModal";
import Permissions from "expo-permissions";
import Location from "expo-location";
import Constants from 'expo-constants'
import LoadingScreen from "../LoadingScreen";
import renderIf from "../renderIf";
import { data } from "../../jsonData/index";
import * as firebase from "firebase";

const markerImages = {
  flood: require("../../assets/images/types/flood.png"),
  fire: require("../../assets/images/main/fire.png"),
  other: require("../../assets/images/main/alert.png"),
};

var location;

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceRefresh: false,
      loaded: false,
      markers: this.props.data,
      isModalVisible: false,
      region: this.props.defaultRegion,
      selectedMarker: {
        title: "",
        description: "",
        type: "fire",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        key: "",
      },
      errorMessage: null,
      userlocation: {
        latitude: 6.201207,
        longitude: -2.691251,
      },
    };

    this.renderBtn = this.renderBtn.bind(this);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    location = await Location.getCurrentPositionAsync({});

    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      },
    });
  };

  _toggleModal = () => {
    if (this.state.isModalVisible) {
      this.setState({ selectedMarker: null });
    }

    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  _selectedInfo = (marker) => {
    this.setState({ selectedMarker: marker });

    console.log(
      "User has selected new marker: --> " +
        JSON.stringify(this.state.selectedMarker)
    );
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onMapReady = (e) => {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
  };

  // componentDidMount() {
  //   this.setState(
  //     {
  //       markers: data,
  //     },
  //     function () {}
  //   );
  // }

  // componentWillMount() {
  //   this._getLocationAsync();
  //   this.setState(
  //     {
  //       markers: data,
  //     },
  //     function () {}
  //   );

  //   setTimeout(
  //     function () {
  //       this.setState({ loaded: true });
  //     }.bind(this),
  //     2000
  //   );
  // }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
      });
    } else {
      this._getLocationAsync();
    }

    var that = this;
    var dataObjectParent = [];
    var postsRef = firebase.database().ref("/posts");
    postsRef.on("value", function (snapshot) {
      var val = snapshot.val();
      var i = 0;
      // snapshot.val() is the dictionary with all your keys/values from the '/store' path
      for (var key in snapshot.val()) {
        // var item = childSnapshot.val();
        // item.key = childSnapshot.key;

        var dataOb = snapshot.val()[key];
        dataObjectParent.push(dataOb);
        // console.log(JSON.stringify(dataOb));
      }
      // console.log(JSON.stringify(dataObjectParent));
      that.setState(
        {
          markers: dataObjectParent,
        },
        function () {
          // console.log(this.state.markers);
          // this.addGeocoding(this.state.markers);
        }
      );
    });
    setTimeout(
      function () {
        //Start the timer
        this.setState({ loaded: true });
      }.bind(this),
      5000
    );
  }

  renderBtn() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            region: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            },
          })
        }
      >
        <Image
          style={{ position: "absolute", right: 10, top: 10 }}
          resizeMethod="resize"
          source={require("../../assets/images/main/locate.png")}
        />
      </TouchableOpacity>
    );
  }
  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      console.log(this.state.errorMessage);
    } else if (this.state.location) {
      console.log(JSON.stringify(this.state.location));
    }
    return (
      <View style={{ flex: 1 }}>
        {renderIf(!this.state.loaded, <LoadingScreen />)}
        {renderIf(
          this.state.loaded,
          <View style={{ flex: 1 }}>
            <MapView
              key={this.state.forceRefresh}
              style={{ flex: 1 }}
              region={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
              }}
              initialRegion={this.state.userlocation}
              userLocationAnnotationTitle={""}
              showsMyLocationButton={true}
              showsUserLocation={true}
              onMapReady={this.onMapReady}
            >
              {this.state.markers.map((marker) => (
                <MapView.Marker
                  key={marker.key}
                  coordinate={marker.postRegion}
                  onPress={() => {
                    this._selectedInfo(marker);
                    this.setState({
                      selectedMarker: marker,
                      region: marker.postRegion,
                    });
                    this._toggleModal();
                  }}
                  image={markerImages[marker.type]}
                ></MapView.Marker>
              ))}
            </MapView>
          </View>
        )}
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() =>
            this.setState({ isModalVisible: !this.state.isModalVisible })
          }
          style={{ alignItems: "center" }}
          hideModalContentWhileAnimating={true}
        >
          <InfoModal
            toggle={this._toggleModal}
            dataClick={this.state.selectedMarker}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  opencloseContainer: {
    borderBottomWidth: 0.8,
    borderColor: "lightgrey",
    borderTopWidth: 0,
    marginLeft: -15,
    marginRight: -15,
  },
});
