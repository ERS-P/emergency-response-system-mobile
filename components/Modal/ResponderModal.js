// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Button,
//   Dimensions,
//   Image,
//   TextInput,
//   Platform,
//   Share,
// } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// import Comments from "./Comments";
// import renderIf from "../assets/renderIf";
// import {
//   submitComment,
//   updateScore,
//   removePosts,
//   verifyPosts,
// } from "../api/auth";
// import { Ionicons } from "@expo/vector-icons";
// var deviceWidth = Dimensions.get("window").width;
// var deviceHeight = Dimensions.get("window").height;

// export default class AdminInfoModal extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userId: null,
//       userfirstname: null,
//       postId: this.props.dataClick.postId,
//       title: this.props.dataClick.title,
//       description: this.props.dataClick.description,
//       coordinates: {
//         latitude: this.props.dataClick.coordinates.latitude,
//         longitude: this.props.dataClick.coordinates.longitude,
//       },
//       town: this.props.dataClick.town,
//       county: this.props.dataClick.county,
//       upVotes: null,
//       date: this.props.dataClick.date,
//       time: this.props.dataClick.time,

//       selected: null,

//       commentData: this.props.dataClick.commentData,

//       numComments: this.props.dataClick.numComments,
//       showComments: false,
//       showHideText: "Show",

//       addComment: false,
//       commentString: "",

//       commentTextLength: 200,
//       commentMaxLength: 200,

//       alreadyScored: false,

//       verified: this.props.dataClick.verified.verified,
//     };

//     this._renderImageUp = this._renderImageUp.bind(this);

//     this.imagePress = this.imagePress.bind(this);
//     this.addUserComment = this.addUserComment.bind(this);
//     this.showPostedComments = this.showPostedComments.bind(this);
//     this.onChangeCommentText = this.onChangeCommentText.bind(this);
//     this.postComment = this.postComment.bind(this);
//     this.deletePost = this.deletePost.bind(this);
//     this.renderVerified = this.renderVerified.bind(this);
//     this.shareIcon = this.shareIcon.bind(this);
//     this.shareButton = this.shareButton.bind(this);
//     this.verifyPost = this.verifyPost.bind(this);
//   }

//   imagePress(press) {
//     if (this.state.selected == press) {
//       if (press == "up") {
//         this.setState({ upVotes: this.state.upVotes - 1 });
//         updateScore(this.state.postId, true, this.state.userId);
//       }
//       this.setState({ selected: "" });
//     } else {
//       if (press == "up") {
//         this.setState({ upVotes: this.state.upVotes + 1 });
//         updateScore(this.state.postId, false, this.state.userId);
//       }
//       this.setState({ selected: press });
//     }
//   }

//   _renderImageUp() {
//     if (this.state.selected == "up")
//       return (
//         <View style={{}}>
//           <Image
//             style={{ height: 20, width: 20 }}
//             resizeMethod="resize"
//             source={require("../assets/arrowUpSelected.png")}
//           />
//         </View>
//       );
//     else
//       return (
//         <View style={{}}>
//           <Image
//             style={{ height: 20, width: 20 }}
//             resizeMethod="resize"
//             source={require("../assets/arrowUp.png")}
//           />
//         </View>
//       );
//   }

//   onModalClose() {
//     {
//       /* Send data to server with upvote info onModalClose

//       send 'this.data.selected'

//       can do something like:
//       if (this.data.selected == "")
//         do nothing
//       if (this.data.selected == "up")
//         upVote + 1
//         send upvote to server
//       if (this.data.selected == "down")
//         downVote + 1
//       send vote to server

//       Will also have to update array in parent component to have updated selected data
//       (or can just refetch data from server)

//       */
//     }
//     this.props.toggle();
//   }

//   _retrieveData = async () => {
//     // console.log("Here");
//     try {
//       const value = await AsyncStorage.getItem("admin");
//       const id = await AsyncStorage.getItem("userID");
//       const name = await AsyncStorage.getItem("name");

//       if (value !== null) {
//         // We have data!!
//         // console.log(value);
//         var result = value == "true";
//         this.setState({ admin: result, userId: id, userfirstname: name });
//         var data = this.props.dataClick.score;
//         // console.log(data);
//         var Scorecount = 0;
//         for (var key in data) {
//           // console.log(key);
//           // console.log(id);

//           if (key == id) {
//             // console.log(key);
//             this.setState({ selected: "up" });
//           }
//           Scorecount++;
//         }
//         this.setState({ upVotes: Scorecount });
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   };

//   componentWillMount() {
//     this._retrieveData();
//   }

//   addUserComment() {
//     this.setState({ addComment: !this.state.addComment });
//   }

//   showPostedComments() {
//     this.setState({ showComments: !this.state.showComments });
//     if (this.state.showHideText == "Show") {
//       this.setState({ showHideText: "Hide" });
//     } else {
//       this.setState({ showHideText: "Show" });
//     }
//   }

//   onChangeCommentText(text) {
//     this.setState({
//       commentString: text,
//       commentTextLength: this.state.commentMaxLength - text.length,
//     });
//   }

//   postComment() {
//     console.log(this.state.userId);
//     console.log(this.state.userfirstname);
//     if (this.state.commentString == "") return;
//     // alert("comment: "+ this.state.commentString );
//     submitComment(
//       this.state.postId,
//       this.state.commentString,
//       this.state.userfirstname,
//       this.state.numComments
//     );

//     this.setState({
//       commentString: "",
//       commentTextLength: this.state.commentMaxLength,
//       addComment: !this.state.addComment,
//       numComments: this.state.numComments + 1,
//     });
//   }

//   deletePost(postId) {
//     removePosts(postId);
//     this.props.toggle();
//   }

//   verifyPost(postId, userId) {
//     verifyPosts(postId, userId);
//     this.props.toggle();
//   }

//   renderVerified() {
//     console.log("Verified: " + this.state.verified);
//     if (this.state.verified) {
//       return (
//         <View
//           style={{
//             marginTop: 15,
//             flexDirection: "row",
//             borderWidth: 0.8,
//             borderColor: "lightgrey",
//             width: "100%",
//             paddingLeft: 20,
//             paddingRight: 20,
//             justifyContent: "center",
//             paddingTop: 10,
//             paddingBottom: 10,
//             textAlign: "center",
//           }}
//         >
//           <Image
//             style={{
//               height: 20,
//               width: 20,
//               alignItems: "center",
//               alignContent: "center",
//             }}
//             resizeMethod="resize"
//             source={require("../assets/verify.png")}
//           />
//           <Text style={{ textAlign: "center" }}>
//             <Text>This post has been verified.</Text>
//           </Text>
//         </View>
//       );
//     } else {
//       return (
//         <View
//           style={{
//             marginTop: 15,
//             borderWidth: 0.8,
//             borderColor: "lightgrey",
//             width: "100%",
//             paddingLeft: 20,
//             paddingRight: 20,
//             justifyContent: "center",
//             paddingTop: 10,
//             paddingBottom: 10,
//           }}
//         >
//           <Text style={{ textAlign: "center" }}>
//             <Text>This post has </Text>
//             <Text style={{ textDecorationLine: "underline" }}>not</Text>
//             <Text> been verified.</Text>
//           </Text>
//         </View>
//       );
//     }
//   }

//   shareButton() {
//     Share.share({
//       message:
//         "Hello, I just want to let you know that I was notified that there is an emergency in " +
//         this.state.town +
//         ", " +
//         this.state.county +
//         ". Please be careful!",
//     })
//       .then((result) => console.log(result))
//       .catch((err) => console.log(err));
//   }

//   shareIcon() {
//     let iconName;
//     if (Platform.OS === "ios") {
//       iconName = "ios-share-alt";
//     } else {
//       iconName = "md-share";
//     }
//     return (
//       <TouchableOpacity onPress={() => this.shareButton()}>
//         <Ionicons  name={iconName} size={25} color={"darkgrey"} />
//       </TouchableOpacity>
//     );
//   }

//   render() {
//     // console.log(this.props.dataClick);
//     return (
//       <View
//         style={{
//           width: deviceWidth - deviceWidth / 8,
//           height: deviceHeight - deviceHeight / 8,
//           backgroundColor: "#FFF",
//         }}
//       >
//         <View style={{ flex: 1 }}>
//           <View style={{ padding: 20 }}>
//             <View
//               style={{
//                 borderBottomWidth: 0.8,
//                 borderColor: "lightgrey",
//                 width: "100%",
//                 justifyContent: "center",
//                 paddingTop: 10,
//                 paddingBottom: 5,
//               }}
//             >
//               <Text style={{ fontSize: 18 }}>{this.state.title}</Text>
//             </View>
//             <Text style={{ fontSize: 16, paddingTop: 5, paddingBottom: 3 }}>
//               {this.state.description}
//             </Text>
//             <Text>
//               {this.state.town}, {this.state.county}, USA
//             </Text>
//             <Text style={{ fontSize: 13, paddingTop: 3 }}>
//               Lat: {this.state.coordinates.latitude}
//             </Text>
//             <Text style={{ fontSize: 13 }}>
//               Long: {this.state.coordinates.longitude}
//             </Text>

//             <Text style={{ fontSize: 12, paddingTop: 5 }}>
//               <Text>
//                 Posted on {this.state.date}
//                 {" at "}
//                 {this.state.time}
//               </Text>
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               paddingBottom: 20,
//               justifyContent: "space-around",
//             }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <TouchableOpacity
//                 style={{ paddingRight: 5 }}
//                 onPress={() => this.imagePress("up")}
//               >
//                 <View style={{}}>{this._renderImageUp()}</View>
//               </TouchableOpacity>
//               <Text>{this.state.upVotes}</Text>
//             </View>
//             {this.shareIcon()}
//           </View>

//           {renderIf(
//             this.state.admin,
//             <View
//               style={{
//                 flexDirection: "row",
//                 borderBottomWidth: 0,
//                 borderWidth: 0.8,
//                 borderColor: "lightgrey",
//                 width: "100%",
//                 paddingLeft: 20,
//                 paddingRight: 20,
//                 justifyContent: "space-between",
//                 paddingTop: 10,
//                 paddingBottom: 10,
//               }}
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   borderRightWidth: 0.8,
//                   borderColor: "lightgrey",
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() =>
//                     this.verifyPost(this.state.postId, this.state.userId)
//                   }
//                 >
//                   <Text
//                     style={{
//                       color: "blue",
//                       textAlign: "center",
//                       alignSelf: "center",
//                     }}
//                   >
//                     Accept
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{ flex: 1 }}>
//                 <TouchableOpacity
//                   onPress={() => this.deletePost(this.state.postId)}
//                 >
//                   <Text
//                     style={{
//                       color: "blue",
//                       textAlign: "center",
//                       alignSelf: "center",
//                     }}
//                   >
//                     Reject
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           <View
//             style={{
//               flexDirection: "row",
//               borderWidth: 0.8,
//               borderColor: "lightgrey",
//               paddingLeft: 20,
//               paddingRight: 20,
//               paddingTop: 10,
//               paddingBottom: 10,
//               justifyContent: "space-between",
//             }}
//           >
//             <TouchableOpacity onPress={() => this.showPostedComments()}>
//               <Text style={{ color: "blue" }}>
//                 {this.state.showHideText} Comments{" ("}
//                 {this.state.numComments}
//                 {") "}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => this.addUserComment()}>
//               <Text style={{ color: "blue" }}>Post a comment</Text>
//             </TouchableOpacity>
//           </View>
//           {renderIf(
//             this.state.addComment,
//             <View
//               style={{
//                 height: 100,
//                 borderTopWidth: 0,
//                 borderWidth: 0.8,
//                 borderColor: "lightgrey",
//                 paddingTop: 10,
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "column",
//                   width: "75%",
//                   paddingLeft: 20,
//                 }}
//               >
//                 <TextInput
//                   editable={true}
//                   commentMaxLength={500}
//                   style={styles.descriptionInput}
//                   value={this.state.commentString}
//                   onChangeText={this.onChangeCommentText.bind(this)}
//                   multiline={true}
//                   onSubmitEditing={() => this.postComment()}
//                   returnKeyType={"go"}
//                 />
//                 <Text
//                   style={{ fontSize: 10, color: "black", textAlign: "right" }}
//                 >
//                   {this.state.commentTextLength}/{this.state.commentMaxLength}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "column", paddingLeft: 10 }}>
//                 <TouchableOpacity
//                   onPress={() => this.postComment()}
//                   style={styles.elementsButtonStyle}
//                 >
//                   <Text style={{ margin: 10 }}>Post</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           {renderIf(
//             this.state.showComments,
//             <Comments
//               postId={this.state.postId}
//               numComments={this.state.numComments}
//               commentData={this.state.commentData}
//             />
//           )}
//         </View>
//         <View style={{ borderWidth: 0.5, borderColor: "lightgrey" }}>
//           <Button
//             color={Platform.OS === "ios" ? "" : "red"}
//             onPress={() => this.onModalClose()}
//             title="Close"
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   descriptionInput: {
//     borderColor: "black",
//     borderWidth: 1,
//     backgroundColor: "white",
//     height: 60,
//     padding: 5,
//   },
//   elementsButtonStyle: {
//     backgroundColor: "grey",
//     marginBottom: 10,
//   },
// });
