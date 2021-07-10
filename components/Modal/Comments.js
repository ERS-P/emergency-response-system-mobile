import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { data } from "../../jsonData/index";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.commentData,
      postId: this.props.postId,
      numComments: this.props.numComments,
    };
  }
  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.dataSource}
        // renderRow={this.renderItem}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          return (
            <View style={styles.container}>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{item.item.name}</Text>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.time}>{item.item.date}</Text>
                    <Text style={styles.time}>{item.item.time}</Text>
                  </View>
                </View>
                <Text
                  rkType="primary3 mediumLine"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {item.item.comment}
                </Text>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    height: 300,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
    textAlign: "right",
    fontFamily: "Poppins-Regular",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
  },
});
