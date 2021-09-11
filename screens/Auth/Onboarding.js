import * as React from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import OnboardingScreenInstance from "../../components/Onboarding/OnboardingScreenInstance";
import OnboardingScrollIndicator from "../../components/Onboarding/OnboardingScrollIndicator";
import Button from "../../components/Button";

export default function OnboardingScreen() {
  const navigator = useNavigation();
  const pagerRef = React.useRef();

  const handlePress = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };
  const handleDone = () => {
    navigator.navigate("authmain");
  };
  const handleScrollIndicatorPress = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  const screenInstanceConfig = {
    firstScreen: {
      backgroundImageURI: require("../../assets/images/bg-intro.png"),
      subText: "Sign up for free and report an emergency situation around you",
    },
    secondScreen: {
      backgroundImageURI: require("../../assets/images/emergency-call.png"),
      subText:
        "Make an emergency call via the application with a minimal approach",
    },
    thirdScreen: {
      backgroundImageURI: require("../../assets/images/notification.png"),
      subText: "Receive emergency reports and tips via the application",
    },
  };
  return (
    <View style={styles.container}>
      <PagerView initialPage={0} ref={pagerRef} style={styles.pagerView}>
        <View key={1}>
          <View style={styles.textIndicatorWrapper}>
            <OnboardingScreenInstance
              backgroundImageURI={
                screenInstanceConfig.firstScreen.backgroundImageURI
              }
              subText={screenInstanceConfig.firstScreen.subText}
            />
            <View style={styles.scrollIndicator}>
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(0)}
                optionalStyles={styles.circleActive}
              />
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(1)}
              />
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(2)}
              />
            </View>
            <View style={styles.footer}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                welcome to emergency response system!
              </Text>
              <Button
                bgColor="#32527B"
                title="Next"
                pressHandler={() => handlePress(1)}
              />
            </View>
          </View>
        </View>

        <View key={2}>
          <View style={styles.textIndicatorWrapper}>
            <OnboardingScreenInstance
              backgroundImageURI={
                screenInstanceConfig.secondScreen.backgroundImageURI
              }
              subText={screenInstanceConfig.secondScreen.subText}
            />
            <View style={styles.scrollIndicator}>
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(0)}
              />
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(1)}
                optionalStyles={styles.circleActive}
              />
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(2)}
              />
            </View>
            <View style={styles.footer}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                welcome to emergency response system!
              </Text>
              <Button
                bgColor="#32527B"
                title="Next"
                pressHandler={() => handlePress(2)}
              />
            </View>
          </View>
        </View>

        <View key={3}>
          <View style={styles.textIndicatorWrapper}>
            <OnboardingScreenInstance
              backgroundImageURI={
                screenInstanceConfig.thirdScreen.backgroundImageURI
              }
              subText={screenInstanceConfig.thirdScreen.subText}
            />
            <View style={styles.scrollIndicator}>
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(0)}
              />
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(1)}
              />
              <OnboardingScrollIndicator
                handlePress={() => handleScrollIndicatorPress(2)}
                optionalStyles={styles.circleActive}
              />
            </View>
            <View style={styles.footer}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                welcome to emergency response system!
              </Text>
              <Button
                bgColor="#32527B"
                title="Get started"
                pressHandler={handleDone}
              />
            </View>
          </View>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    backgroundColor: "#091416",
    width: 10,
    height: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  circleActive: {
    backgroundColor: "#70dbe3",
    width: 10,
    height: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
  pagerView: {
    flex: 1,
    margin: 0,
  },
  scrollIndicator: {
    flexDirection: "row",
    position: "absolute",
    top: 440,
    marginHorizontal: 150,
  },
  textIndicatorWrapper: {
    flex: 1,
    backgroundColor: "#32527B",
  },
});
