import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

export const Container = styled.ScrollView.attrs({
  showVerticalScroll: false,
})`
  flex: 1;
`;

export const Name = styled.Text`
  font-family: "Poppins-Regular";
  color: black;
  font-size: 18px;
`;

export const Email = styled.Text`
  font-family: "Poppins-Regular";
  color: #444;
  font-size: 15px;
`;

export const ProfileAvatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

export const HeaderProfile = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background: #fff;
`;

export const ProfileInfo = styled.View`
  flex-direction: column;
  margin-left: 20px;
`;

export const SignOutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 20px;
`;

export const SignOutText = styled.Text`
  font-family: "Poppins-Regular";
  color: rgba(255, 0, 0, 0.6);
  font-size: 20px;
`;

export const ProfileButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 15px;
  color: #444;
`;

export const Icon = styled(FontAwesome).attrs({
  color: "#444",
  size: 22,
})`
  width: 25px;
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-left: 20px;
`;
