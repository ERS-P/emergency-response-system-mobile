import * as React from "react";
import { StatusBar, StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useCachedResources from "./hooks/useCachedResources";
import AppStack from "./navigation/MainAppNavigator";
import ModalContextProvider from "./context/ModalContext";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={"#32527B"} />
        <ModalContextProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </ModalContextProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Math.round(Dimensions.get("window").height),
  },
});
