import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import {
  todayNotificationData,
  yesterdayNotificationData,
} from "../../jsonData";
import NotificationItem from "../../components/NotificationItem";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotification: true,
    };
  }
  render() {
    return (
      <>
        {this.state.showNotification === false ? (
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/main/alarm.png")}
              style={{ height: 200, width: 210 }}
            />
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20 }}>
              No notification received(0)
            </Text>
          </View>
        ) : (
          <SafeAreaView>
            <ScrollView style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
              <View style={{ marginVertical: 6 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Today</Text>
              </View>
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={todayNotificationData}
                  renderItem={({ item }) => <NotificationItem item={item} />}
                  keyExtractor={(item) => String(item.id)}
                />
              </View>
              <View style={{ marginVertical: 6 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Yesterday
                </Text>
              </View>
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={yesterdayNotificationData}
                  renderItem={({ item }) => <NotificationItem item={item} />}
                  keyExtractor={(item) => String(item.id)}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
