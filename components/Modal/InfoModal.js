import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  TextInput,
  Platform,
  Share,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Comments from "./Comments";
import renderIf from "../renderIf";
import { data } from "../../jsonData/index";
import { Ionicons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class InfoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      userfirstname: null,
      postId: this.props.dataClick.postId,
      title: this.props.dataClick.title,
      description: this.props.dataClick.description,
      coordinates: {
        latitude: this.props.dataClick.postRegion.latitude,
        longitude: this.props.dataClick.postRegion.longitude,
      },
      town: this.props.dataClick.town,
      county: this.props.dataClick.county,
      upVotes: null,
      date: this.props.dataClick.date,
      time: this.props.dataClick.time,
      selected: null,
      // commentData: this.props.dataClick.commentData,
      commentData: this.props.dataClick.commentData,
      numComments: this.props.dataClick.numComments,
      showComments: false,
      showHideText: "Show",
      addComment: false,
      commentString: "",
      commentTextLength: 200,
      commentMaxLength: 200,
      alreadyScored: false,
    };

    this._renderImageUp = this._renderImageUp.bind(this);
    this.imagePress = this.imagePress.bind(this);
    this.addUserComment = this.addUserComment.bind(this);
    this.showPostedComments = this.showPostedComments.bind(this);
    this.onChangeCommentText = this.onChangeCommentText.bind(this);
    this.postComment = this.postComment.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.renderVerified = this.renderVerified.bind(this);
    this.shareIcon = this.shareIcon.bind(this);
    this.shareButton = this.shareButton.bind(this);
  }

  imagePress(press) {
    if (this.state.selected == press) {
      if (press == "up") {
        this.setState({ upVotes: this.state.upVotes - 1 });
        updateScore(this.state.postId, true, this.state.userId);
      }
      this.setState({ selected: "" });
    } else {
      if (press == "up") {
        this.setState({ upVotes: this.state.upVotes + 1 });
        updateScore(this.state.postId, false, this.state.userId);
      }
      this.setState({ selected: press });
    }
  }

  _renderImageUp() {
    if (this.state.selected == "up")
      return (
        <View>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMethod="resize"
            source={require("../../assets/images/main/arrowUpSelected.png")}
          />
        </View>
      );
    else
      return (
        <View style={{}}>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMethod="resize"
            source={require("../../assets/images/main/arrowUpSelected.png")}
          />
        </View>
      );
  }

  onModalClose() {
    {
    }
    this.props.toggle();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("admin");
      const id = await AsyncStorage.getItem("userID");
      const name = await AsyncStorage.getItem("name");

      if (value !== null) {
        var result = value == "true";
        this.setState({ admin: result, userId: id, userfirstname: name });
        var data = this.props.dataClick.score;

        var Scorecount = 0;
        for (var key in data) {
          if (key == id) {
            this.setState({ selected: "up" });
          }
          Scorecount++;
        }
        this.setState({ upVotes: Scorecount });
      }
    } catch (error) {}
  };

  componentWillMount() {
    this._retrieveData();
  }

  addUserComment() {
    this.setState({ addComment: !this.state.addComment });
  }

  showPostedComments() {
    this.setState({ showComments: !this.state.showComments });
    if (this.state.showHideText == "Show") {
      this.setState({ showHideText: "Hide" });
    } else {
      this.setState({ showHideText: "Show" });
    }
  }

  onChangeCommentText(text) {
    this.setState({
      commentString: text,
      commentTextLength: this.state.commentMaxLength - text.length,
    });
  }

  postComment() {
    console.log(this.state.userId);
    console.log(this.state.userfirstname);
    if (this.state.commentString == "") return;

    submitComment(
      this.state.postId,
      this.state.commentString,
      this.state.userfirstname,
      this.state.numComments
    );

    this.setState({
      commentString: "",
      commentTextLength: this.state.commentMaxLength,
      addComment: !this.state.addComment,
      numComments: this.state.numComments + 1,
    });
  }

  deletePost(postId) {
    console.log("postId:" + this.state.postId);
    removePosts(postId);

    Alert.alert(
      "Post Deleted",
      "This post has been deleted.",
      [{ text: "OK", onPress: () => this.props.toggle() }],
      { cancelable: false }
    );
  }

  renderVerified() {
    if (this.state.verified) {
      return (
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            borderWidth: 0.8,
            borderColor: "lightgrey",
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          <Image
            style={{
              height: 20,
              width: 20,
              alignItems: "center",
              alignContent: "center",
            }}
            resizeMethod="resize"
            source={require("../../assets/images/main/verify.png")}
          />
          <Text style={{ textAlign: "center", fontFamily: "Poppins-Regular" }}>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              This post has been verified.
            </Text>
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: 15,
            borderWidth: 0.8,
            borderColor: "lightgrey",
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontFamily: "Poppins-Regular" }}>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              This post has{" "}
            </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                fontFamily: "Poppins-Regular",
              }}
            >
              not
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              {" "}
              been verified.
            </Text>
          </Text>
        </View>
      );
    }
  }

  shareButton() {
    Share.share({
      message:
        "Hello, I just want to let you know that I was notified that there is an emergency in " +
        this.state.town +
        ", " +
        this.state.county +
        ". Please be careful!",
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  shareIcon() {
    let iconName;
    if (Platform.OS === "ios") {
      iconName = "ios-share";
    } else {
      iconName = "md-share";
    }
    return (
      <TouchableOpacity onPress={() => this.shareButton()}>
        <Ionicons name={iconName} size={25} color={"darkgrey"} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={{
          width: deviceWidth - deviceWidth / 8,
          height: deviceHeight - deviceHeight / 8,
          backgroundColor: "#FFF",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            <View
              style={{
                borderBottomWidth: 0.8,
                borderColor: "lightgrey",
                width: "100%",
                justifyContent: "center",
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
                {this.state.title}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingTop: 5,
                paddingBottom: 3,
                fontFamily: "Poppins-Regular",
              }}
            >
              {this.state.description}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              {this.state.town}
            </Text>
            <Text
              style={{
                fontSize: 13,
                paddingTop: 3,
                fontFamily: "Poppins-Regular",
              }}
            >
              Lat: {this.state.coordinates.latitude}
            </Text>
            <Text style={{ fontSize: 13, fontFamily: "Poppins-Regular" }}>
              Long: {this.state.coordinates.longitude}
            </Text>

            <Text
              style={{
                fontSize: 12,
                paddingTop: 5,
                fontFamily: "Poppins-Regular",
              }}
            >
              <Text style={{ fontFamily: "Poppins-Regular" }}>
                Posted on {this.state.date}
                {" at "}
                {this.state.time}
              </Text>
            </Text>

            {this.renderVerified()}
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-around",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ paddingRight: 5 }}
                onPress={() => this.imagePress("up")}
              >
                <View style={{}}>{this._renderImageUp()}</View>
              </TouchableOpacity>
              <Text style={{ fontFamily: "Poppins-Regular" }}>
                {this.state.upVotes}
              </Text>
            </View>
            {this.shareIcon()}
          </View>

          {renderIf(
            this.state.admin,
            <View
              style={{
                borderBottomWidth: 0,
                borderWidth: 0.8,
                borderColor: "lightgrey",
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => this.deletePost(this.state.postId)}
              >
                <Text
                  style={{
                    color: "blue",
                    textAlign: "center",
                    alignSelf: "center",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Remove this post
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              borderWidth: 0.8,
              borderColor: "lightgrey",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => this.showPostedComments()}>
              <Text style={{ color: "blue", fontFamily: "Poppins-Regular" }}>
                {this.state.showHideText} Comments{" ("}
                {this.state.numComments}
                {") "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addUserComment()}>
              <Text style={{ color: "blue", fontFamily: "Poppins-Regular" }}>
                Post a comment
              </Text>
            </TouchableOpacity>
          </View>
          {renderIf(
            this.state.addComment,
            <View
              style={{
                height: 100,
                borderTopWidth: 0,
                borderWidth: 0.8,
                borderColor: "lightgrey",
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "75%",
                  paddingLeft: 20,
                }}
              >
                <TextInput
                  editable={true}
                  commentMaxLength={500}
                  style={styles.descriptionInput}
                  value={this.state.commentString}
                  onChangeText={this.onChangeCommentText.bind(this)}
                  multiline={true}
                  onSubmitEditing={() => this.postComment()}
                  returnKeyType={"go"}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: "black",
                    textAlign: "right",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {this.state.commentTextLength}/{this.state.commentMaxLength}
                </Text>
              </View>
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => this.postComment()}
                  style={styles.elementsButtonStyle}
                >
                  <Text style={{ margin: 10 }}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {renderIf(
            this.state.showComments,
            <Comments
              postId={this.state.postId}
              numComments={this.state.numComments}
              commentData={this.state.commentData}
            />
          )}
        </View>
        <View style={{ borderWidth: 0.5, borderColor: "lightgrey" }}>
          <Button
            color={Platform.OS === "ios" ? "" : "#32527B"}
            onPress={() => this.onModalClose()}
            title="Close"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionInput: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    height: 60,
    padding: 5,
  },
  elementsButtonStyle: {
    backgroundColor: "grey",
    marginBottom: 10,
  },
});
