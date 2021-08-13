import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAKzxEU3WrctWL7atxggl8wgJrnDoA8btE",
  authDomain: "emergency-response-sys-3fcca.firebaseapp.com",
  projectId: "emergency-response-sys-3fcca",
  storageBucket: "emergency-response-sys-3fcca.appspot.com",
  databaseURL:
    "https://emergency-response-sys-3fcca-default-rtdb.firebaseio.com/",
  messagingSenderId: "333209295911",
  appId: "1:333209295911:web:a61054a9f6fbce12748202",
  measurementId: "G-5C9LMGXMZ9",
};

firebase.initializeApp(firebaseConfig);

export function createUser({
  first_name,
  last_name,
  email,
  phone,
  password,
  confirmPassword,
  nationalID,
  stateLicense,
  branch,
  department,
  responder,
  token,
}) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      const userID = data.user.uid;
      firebase
        .database()
        .ref("users/" + userID)
        .set({
          userID: userID,
          email: email,
          password: password,
          firstname: first_name,
          lastname: last_name,
          nationalID: nationalID,
          phoneNumber: phone,
          stateLicense: stateLicense,
          confirmPassword: confirmPassword,
          numPosts: 0,
          branch: branch,
          department: department,
          responder: responder,
          token: token,
        });
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(
          function () {
            // Email sent.
          },
          function (error) {
            // An error happened.
          }
        );
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
        return false;
      } else {
        alert("Error code:" + errorCode + "\n" + errorMessage);

        return false;
      }
    });
  return true;
}

export function signUserIn(providedEmail, providedPassword, that) {
  var errorMessage = "";
  firebase
    .auth()
    .signInWithEmailAndPassword(providedEmail, providedPassword)
    .then(function (response) {
      var userId = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("/users/" + userId)
        .once("value")
        .then(function (snapshot) {
          var first_name = snapshot.val() && snapshot.val().firstname;
          var last_name = snapshot.val() && snapshot.val().lastname;
          var email = providedEmail;
          var admin = snapshot.val() && snapshot.val().admin;

          AsyncStorage.setItem("first_name", first_name);
          AsyncStorage.setItem("last_name", last_name);
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("userID", userId);
          AsyncStorage.setItem("admin", "" + admin);
          that.setState({ loading: false });
          that.props.navigation.navigate("main");
        });
    })
    .catch(function (error) {
      // Handle Errors here.
      that.setState({ loading: false });

      errorMessage = error.message;
      Alert.alert(errorMessage);
      console.log(error);
    });
  return;
}

export function forgotPassword(email, that) {
  var errorMessage = "";

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      that.setState({ loading: false });
      Alert.alert("Please check your email...");
    })
    .catch(function (error) {
      that.setState({ loading: false });
      errorCode = error.code;
      errorMessage = error.message;
      Alert.alert(errorMessage);
    });
  return;
}

export const logout = async (that) => {
  try {
    await firebase.auth().signOut();
    that.props.navigation.navigate("signin");
  } catch (e) {
    console.log(e);
  }
};

export function submitEmergencyInfo(
  postTitle,
  postDescription,
  postImage,
  postSeverity,
  postType,
  postScore,
  posterUserID,
  postRegion,
  postVerified,
  town
) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + mm;
  if (mm < 10) mm = "0" + mm;
  today = mm + "/" + dd + "/" + yyyy;
  var time = new Date()
    .toLocaleTimeString()
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  var data = {
    title: postTitle,
    description: postDescription,
    type: postType,
    score: postScore,
    postImage: postImage,
    postSeverity: postSeverity,
    posterUserID: posterUserID,
    postRegion: postRegion,
    verified: postVerified,
    postId: null,
    numComments: 0,
    town: town,
    verified: {
      verified: false,
      verifier: "",
    },
    date: today,
    time: time,
  };

  var ref = firebase.app().database().ref();

  var postsRef = ref.child("posts");
  // Create a new ref and log it’s push key
  var postsRef = postsRef.push(data);
  console.log("post key", postsRef.key);
  firebase
    .database()
    .ref("/posts/" + postsRef.key)
    .update({
      postId: postsRef.key,
    });
  var length = 0;
  firebase
    .database()
    .ref("/posts/")
    .once("value")
    .then(function (snapshot) {
      length = (snapshot.val() && snapshot.val().legnth) || "Anonymous";
    });

  return true;
}

export function getEmergencyData() {
  var items = [];
  var postsRef = firebase.database().ref("/posts");
  postsRef.on("value", function (snapshot) {
    for (var key in snapshot.val()) {
      var dataOb = snapshot.val()[key];
      if (typeof dataOb === "object") items.push(dataOb);
    }
  });
  return items;
}

export function getNumPosts() {
  var i = 0;

  firebase
    .database()
    .ref("/posts/")
    .on("value", (snapshot) => {
      // get children as an array
      for (var key in snapshot.val()) {
        if (snapshot.val()[key].verified.verified == false) i++;
      }
    });

  return i;
}

export function getMyPosts(userId) {
  var items = [];
  var count = 0;
  firebase
    .database()
    .ref("/posts/")
    .on("value", (snapshot) => {
      // get children as an array
      for (var key in snapshot.val()) {
        var dataOb = snapshot.val()[key];
        if (typeof dataOb === "object") {
          const posterUserID = Object.values("posterUserID");
          if (posterUserID == userId) count++;
        }
      }
    });

  return count;
}

export function changePassword(oldpassword, newpassword, confirmPassword) {
  const userID = AsyncStorage.getItem("userID");

  firebase
    .database()
    .ref("users/" + userID)
    .update({
      password: newpassword,
      confirmPassword: confirmPassword,
    });
}

export function editProfile() {}

export function getProfile() {
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       firebase
  //             .database()
  //             .ref("users/" + user.uid)
  //             .once("value")
  //             .then(function (snapshot) {
  //               var first_name = snapshot.val() && snapshot.val().firstname;
  //               // var last_name = snapshot.val() && snapshot.val().lastname;
  //               // var email = snapshot.val() && snapshot.val().email;

  // +
  //               // console.log(user.firstname);
  //               // return first_name;
  //             })
  //             .catch((error) => {
  //               console.log("");
  //             });
  // }
  return false;
  // });
}

export function removePosts(postId) {
  firebase
    .database()
    .ref("/posts/" + postId)
    .remove();
}

// export function getUser() {
//   const user = firebase.auth().currentUser;

//   if (user) {
//     firebase
//       .database()
//       .ref("/users/" + user)
//       .once("value")
//       .then(function (snapshot) {
//         // var first_name = snapshot.val() && snapshot.val().firstname;
//         // var last_name = snapshot.val() && snapshot.val().lastname;
//         // var email = snapshot.val() && snapshot.val().email;
//         const items = {
//           ...snapshot.val()
//         }

//         console.log(items);
//          return items;
//       })
//       .catch((error) => {
//         console.log("");
//       });
//   }
// }
