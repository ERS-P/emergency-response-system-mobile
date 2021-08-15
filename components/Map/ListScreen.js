import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import ListView from "deprecated-react-native-listview";
import Modal from "react-native-modal";
import InfoModal from "./../Modal/InfoModal";
import { data } from "../../jsonData/index";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

const markerImages = {
  flood: require("../../assets/images/types/flood.png"),
  fire: require("../../assets/images/main/fire.png"),
  // first-aid:
  // violence:,
  // accident:,
  other: require("../../assets/images/main/alert.png"),
};


const list = [];
export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(list),
      isModalVisible: false,
      selectedMarker: {
        title: "",
        description: "",
        type: "fire",
        postRegion: {
          latitude: 0,
          longitude: 0,
        },
        key: "",
      },
      responder: false,
      userId: null,
    };

    this.itemsRef = firebase.database().ref("/posts");
    this.renderItem = this.renderItem.bind(this);
    this.forceRefreshFunc = this.forceRefreshFunc.bind(this);
  }

  setItemsFromFirebase(itemsRef) {
    itemsRef.on("value", (snapshot) => {
      // get children as an array
      var items = [];
      for (var key in snapshot.val()) {
        var dataOb = snapshot.val()[key];
        if (typeof dataOb === "object") items.push(dataOb);
      }

      this.setState({
        dataSource: this.ds.cloneWithRows(items),
      });
    });
  }

  forceRefreshFunc() {
    return;
  }

  // componentDidMount() {
  //   this.setState({
  //     dataSource: this.ds.cloneWithRows(data),
  //   });
  // }
  componentDidMount() {
    this.setItemsFromFirebase(this.itemsRef);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this._selectedInfo(item)}
        key={item.id}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 100,
              height: 95,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <Image source={markerImages[item.type]} />
          </View>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 20 }}>
            <Text
              style={{
                fontSize: 15,
                width: "98%",
                fontFamily: "Poppins-Regular",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              Type: {this.capitalize(item.type)}
            </Text>

            <Text style={{ fontFamily: "Poppins-Regular" }}>
              Lat: {item.postRegion.latitude}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              Long: {item.postRegion.longitude}
            </Text>
          </View>
          <View
            style={{
              right: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="right" size={30} color="#000000" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
            func={this.forceRefreshFunc}
          />
        </Modal>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
        />
      </View>
    );
  }

  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  _selectedInfo = (data) => {
    this.setState({
      selectedMarker: data,
    });
    this._toggleModal();
  };

  //Given type and data return the view component
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  },
});
