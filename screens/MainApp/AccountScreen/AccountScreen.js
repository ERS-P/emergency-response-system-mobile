import React, { Component } from "react";
import { Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons/";
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
import { logout , getProfile} from "../../../api/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:getProfile()
    }
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    Alert.alert("Logout", "Are you sure you want to logout", [
      { text: "No", onPress: () => console.log("No Pressed"), style: "cancel" },
      {
        text: "Yes",
        onPress: () => logout(this),
      },
    ]);
  }

  render() {
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
            <Name>
             Appau Samuel
            </Name>
            <Email>appausamuel90@gmail.com</Email>
          </ProfileInfo>
        </HeaderProfile>

        <ProfileButton
          style={{ margin: 10 }}
          onPress={() => this.props.navigation.navigate("notification")}
        >
          <Icon name="envelope-o" />
          <Wrapper>
            <Title>Notifications</Title>
          </Wrapper>
        </ProfileButton>

        <ProfileButton style={{ margin: 2 }}>
          <Icon name="cube" />
          <Wrapper>
            <Title>Emergency Units</Title>
          </Wrapper>
        </ProfileButton>

        <ProfileButton
          style={{ margin: 2 }}
          onPress={() => this.props.navigation.navigate("")}
        >
          <Icon name="info" />
          <Wrapper>
            <Title>About App</Title>
          </Wrapper>
        </ProfileButton>

        <ProfileButton
          style={{ margin: 2 }}
          onPress={() => this.props.navigation.navigate("edit_profile")}
        >
          <Icon name="user" />
          <Wrapper>
            <Title>Edit Profile</Title>
          </Wrapper>
        </ProfileButton>

        <ProfileButton
          style={{ margin: 2 }}
          onPress={() => this.props.navigation.navigate("change_password")}
        >
          <Icon name="lock" />
          <Wrapper>
            <Title>Change Password</Title>
          </Wrapper>
        </ProfileButton>

        <SignOutButton onPress={this.handleSignOut}>
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
  }
}
