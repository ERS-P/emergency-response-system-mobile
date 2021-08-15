import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";

const firebaseConfig = {
  apiKey: "AIzaSyAnviofAwpud7RI5hOzvJPyuzqzHJ8t19A",
  authDomain: "emergency-response-system-2021.firebaseapp.com",
  databaseURL:
    "https://emergency-response-system-2021-default-rtdb.firebaseio.com",
  projectId: "emergency-response-system-2021",
  storageBucket: "emergency-response-system-2021.appspot.com",
  messagingSenderId: "414522555581",
  appId: "1:414522555581:web:29f74477e715dc3edd0bd4",
  measurementId: "G-TF1V1JZLPV",
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
  medicalInfo,
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
          medicalInfo: medicalInfo,
          token: token,
          emergency_contact_1: "",
          emergency_contact_2: "",
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
    .then((response) => {
      var user = firebase.auth().currentUser;
      var userId = user.uid;

      firebase
        .database()
        .ref("/users/" + userId)
        .once("value")
        .then(function (snapshot) {
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

export async function facebookSignIn(that) {
  await Facebook.initializeAsync("318456936574489"); // enter your Facebook App Id
  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile", "email"],
  });
  if (type === "success") {
    // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log(token);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(({ user }) => {
        // All the details about user are in here returned from firebase
        firebase
          .database()
          .ref("users")
          .once("value")
          .then((snapshot) => {
            if (snapshot.child(`${user.uid}`).exists()) {
              that.setState({ loading: false });
              that.props.navigation.navigate("main", { token: token });
            } else {
              firebase
                .database()
                .ref("users/" + user.uid)
                .set({
                  userID: user.uid,
                  email: user.email,
                  firstname: user.displayName.split(" ")[0],
                  lastname: user.displayName.split(" ")[1],
                  phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                  numPosts: 0,
                  token: that.state.token,
                  emergency_contact_1: "",
                  emergency_contact_2: "",
                });
              that.setState({ loading: false });
              that.props.navigation.navigate("main", { token: token });
            }
          });
      })
      .catch((error) => {
        that.setState({ loading: false });
        Alert.alert(error.message);
        console.log(error);
      });
  }
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

export const logout = (navigation) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      navigation.navigate("signin");
    })
    .catch((eror) => {
      console.log(e);
      Alert.alert(error.code, error.message);
    });
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
  var length;
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

export function changePassword(
  oldpassword,
  newpassword,
  confirmPassword,
  // token
) {
  const user = firebase.auth().currentUser;
  const email = user.email;
  const uid = user.uid;

  var provider = user.providerData[0].providerId;
  console.log(provider);

  var credential;
  if (provider == "password")
    credential = firebase.auth.EmailAuthProvider.credential(email, oldpassword);
  else if (provider == "facebook.com") {
    // credential = firebase.auth.FacebookAuthProvider.credential(token);
  }

  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user
        .updatePassword(newpassword)
        .then(async () => {
          await firebase
            .database()
            .ref("users/" + uid)
            .update({
              password: newpassword,
              confirmPassword: confirmPassword,
            });
          Alert.alert("Password changed successfully!");
        })
        .catch((error) => {
          Alert.alert(error.code, error.message);
        });
    })
    .catch((error) => {
      Alert.alert(error.code, error.message);
    });
}

export function editProfile(userData) {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  var provider = user.providerData[0].providerId;
  console.log(provider);

  var credential;
  if (provider == "password")
    credential = firebase.auth.EmailAuthProvider.credential(email, oldpassword);
  else if (provider == "facebook.com") {
    credential = firebase.auth.FacebookAuthProvider.credential(userData.token);
  }
  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      firebase
        .auth()
        .currentUser.updateEmail(userData.email)
        .then(() => {
          firebase
            .database()
            .ref("users/" + userId)
            .update({
              firstname: userData.firstname,
              lastname: userData.lastname,
              email: userData.email,
              phoneNumber: userData.phone,
              emergency_contact_1: userData.emergencyContact1,
              emergency_contact_2: userData.emergencyContact2,
            });
          Alert.alert("Profile details updated!");
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("An error occurred!, Try again");
        });
    })
    .catch((error) => {
      Alert.alert(error.code, error.message);
    });
}

export function removePosts(postId) {
  firebase
    .database()
    .ref("/posts/" + postId)
    .remove();
}

export const getUser = () => {
  var items;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .once("value")
        .then(function (snapshot) {
          // var first_name = snapshot.val() && snapshot.val().firstname;
          // var last_name = snapshot.val() && snapshot.val().lastname;
          // var email = snapshot.val() && snapshot.val().email;
          const { userID, firstname, lastname, phoneNumber } = snapshot.val();
          items = {
            userID,
            firstname,
            lastname,
            phoneNumber,
          };
        });
    }
  });

  return items;
};
