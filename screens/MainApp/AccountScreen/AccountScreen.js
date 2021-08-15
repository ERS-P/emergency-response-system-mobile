import React, { useState, useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  Container,
  HeaderProfile,
  ProfileInfo,
  Name,
  Email,
  ProfileAvatar,
  SignOutButton,
  SignOutText,
  ProfileButton,
  Wrapper,
  Title,
  Icon,
} from "./styles";
import { logout } from "../../../api/auth";
import firebase from "firebase";

const AccountScreen = ({ navigation, route }) => {
  const [firstname, setFirstname] = useState("loading...");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("loading...");
  const [phone, setPhone] = useState("");
  const [emergencyContact1, setEmergencyContact1] = useState("");
  const [emergencyContact2, setEmergencyContact2] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const userId = user.uid;
      if (user) {
        firebase
          .database()
          .ref("users/" + userId)
          .once("value")
          .then((snapshot) => {
            const {
              firstname,
              lastname,
              email,
              phoneNumber,
              password,
              emergency_contact_1,
              emergency_contact_2,
            } = snapshot.val();
            setFirstname(firstname);
            setLastname(lastname);
            setEmail(email);
            setPhone(phoneNumber);
            setPassword(password);
            setEmergencyContact1(emergency_contact_1);
            setEmergencyContact2(emergency_contact_2);
          });
      }
    });
  });

  function handleSignOut() {
    Alert.alert("Logout", "Are you sure you want to logout", [
      { text: "No", onPress: () => console.log("No Pressed"), style: "cancel" },
      {
        text: "Yes",
        onPress: () => logout(navigation),
      },
    ]);
  }

  return (
    <Container>
      <HeaderProfile>
        <ProfileAvatar
          source={{
            uri:
              "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
          }}
        />
        <ProfileInfo>
          <Name>{`${firstname} ${lastname}`}</Name>
          <Email>{`${email}`}</Email>
        </ProfileInfo>
      </HeaderProfile>

      <ProfileButton
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("notification")}
      >
        <Icon name="envelope-o" />
        <Wrapper>
          <Title>Notifications</Title>
        </Wrapper>
        <View>
          <View
            style={{
              backgroundColor: "red",
              borderRadius: 50,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#FFFFFF", fontSize: 12, textAlign: "center" }}
            >
              6
            </Text>
          </View>
        </View>
      </ProfileButton>

      <ProfileButton style={{ margin: 2 }}>
        <Icon name="cube" />
        <Wrapper>
          <Title>Emergency Tips</Title>
        </Wrapper>
        <View>
          <View
            style={{
              backgroundColor: "red",
              borderRadius: 50,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#FFFFFF", fontSize: 12, textAlign: "center" }}
            >
              2
            </Text>
          </View>
        </View>
      </ProfileButton>

      <ProfileButton
        style={{ margin: 2 }}
        onPress={() =>
          navigation.navigate("edit_profile", { password: password })
        }
      >
        <Icon name="user" />
        <Wrapper>
          <Title>Edit Profile</Title>
        </Wrapper>
      </ProfileButton>

      <ProfileButton
        style={{ margin: 2 }}
        onPress={() => navigation.navigate("change_password")}
      >
        <Icon name="lock" />
        <Wrapper>
          <Title>Change Password</Title>
        </Wrapper>
      </ProfileButton>

      <ProfileButton
        style={{ margin: 2 }}
        onPress={() => navigation.navigate("")}
      >
        <Icon name="info" />
        <Wrapper>
          <Title>About App</Title>
        </Wrapper>
      </ProfileButton>

      <SignOutButton onPress={handleSignOut}>
        <SignOutText>Sign-out</SignOutText>
        <FontAwesome
          style={{ marginLeft: 20 }}
          name="sign-out"
          color="#03C553"
          size={20}
        />
      </SignOutButton>
    </Container>
  );
};

export default AccountScreen;
