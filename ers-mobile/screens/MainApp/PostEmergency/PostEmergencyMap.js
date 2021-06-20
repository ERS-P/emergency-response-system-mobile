// import React, { Component } from "react";
// import {
//   TouchableWithoutFeedback,
//   StyleSheet,
//   Text,
//   View,
//   KeyboardAvoidingView,
//   Alert,
//   Keyboard,
// } from "react-native";
// import MapView from "react-native-maps";
// import { Button } from "react-native-elements";
// import { theme } from "../../core/theme";

// export const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position),
//       (e) => reject(e)
//     );
//   });
// };

// export default class AddEmergencyMap extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       direction: "",
//       units: "",
//       distance: 0,
//       region: {
//         latitude: 5.614818,
//         longitude: -0.205874,
//         latitudeDelta: 0.3,
//         longitudeDelta: 0.3,
//       },
//       type: this.props.navigation.state.params.type,
//       description: this.props.navigation.state.params.description,
//       title: this.props.navigation.state.params.title,
//       maxLength: 500,

//       pressCoordinates: {
//         latitude: 5.614818,
//         longitude: -0.205874,
//         latitudeDelta: 0.3,
//         longitudeDelta: 0.3,
//       },
//     };
//     this.setDirection = this.setDirection.bind(this);
//     this.setDistance = this.setDistance.bind(this);
//     this.setUnits = this.setUnits.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   setDirection(text) {
//     this.setState({ direction: text });
//   }

//   setDistance(text) {
//     this.setState({ distance: text });
//   }

//   setUnits(text) {
//     this.setState({ units: text });
//   }

//   onSubmit() {
//     Alert.alert(
//       "Are you sure this is the correct location of the emergency?",
//       "Please pick an option",
//       [
//         {
//           text: "No",
//           onPress: () => console.warn("NO Pressed"),
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () =>
//             this.props.navigation.navigate("fifth", {
//               type: this.state.type,
//               title: this.state.title,
//               description: this.state.description,
//               pressCoordinates: this.state.pressCoordinates,
//             }),
//         },
//       ]
//     );
//     // console.log(JSON.stringify(this.state.pressCoordinates));
//   }

//   static navigationOptions = {
//     title: "Add Location Info",
//     headerStyle: {
//       backgroundColor: theme.colors.primary,
//     },
//     headerTintColor: "#fff",
//   };

//   componentDidMount() {
//     return getCurrentLocation().then((position) => {
//       this.setState({
//         region: {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: 0.3,
//           longitudeDelta: 0.3,
//         },
//         pressCoordinates: {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         },
//       });
//     });
//   }

//   capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   render() {
//     let direction = [
//       { value: "North" },
//       { value: "South" },
//       { value: "East" },
//       { value: "West" },
//       { value: "North-West" },
//       { value: "North-East" },
//       { value: "South-West" },
//       { value: "South-East" },
//     ];
//     let units = [
//       { value: "Feet" },
//       { value: "Yard(s)" },
//       { value: "Meter(s)" },
//       { value: "Mile(s)" },
//     ];
//     let numbers = [
//       { value: 1 },
//       { value: 5 },
//       { value: 10 },
//       { value: 20 },
//       { value: 30 },
//       { value: 40 },
//       { value: 50 },
//       { value: 100 },
//     ];

//     return (
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//         <TouchableWithoutFeedback
//           style={{ flex: 1, flexDirection: "column" }}
//           onPress={() => Keyboard.dismiss()}
//         >
//           <View
//             style={{
//               flex: 1,
//             }}
//           >
//             <View
//               style={{
//                 flex: 0,
//                 textAlign: "center",
//                 alignItems: "center",
//                 paddingTop: 10,
//               }}
//             >
//               <Text style={{ fontSize: 30 }}>
//                 {this.capitalize(this.props.navigation.state.params.type)}
//               </Text>
//             </View>
//             <View style={{ flex: 1, flexDirection: "column", padding: 15 }}>
//               <Text style={{ textAlign: "center", paddingTop: 10 }}>
//                 Using your location to
//               </Text>
//               <Text style={{ textAlign: "center", paddingBottom: 10 }}>
//                 determine the emergencies location:
//               </Text>
//               <View style={{ flex: 1, paddingBottom: 25 }}>
//                 <MapView
//                   showsUserLocation={true}
//                   style={{ flex: 1, height: 250 }}
//                   region={{
//                     latitude: this.state.region.latitude,
//                     longitude: this.state.region.longitude,
//                     latitudeDelta: 0.005,
//                     longitudeDelta: 0.005,
//                   }}
//                   userLocationAnnotationTitle={""}
//                   showsUserLocation={true}
//                   pitchEnabled={false}
//                   rotateEnabled={false}
//                   scrollEnabled={false}
//                   zoomEnabled={false}
//                   onPress={(e) =>
//                     this.setState({
//                       pressCoordinates: e.nativeEvent.coordinate,
//                     })
//                   }
//                   onLongPress={(e) =>
//                     this.setState({
//                       pressCoordinates: e.nativeEvent.coordinate,
//                     })
//                   }
//                 >
//                   <MapView.Marker coordinate={this.state.pressCoordinates} />
//                 </MapView>
//               </View>

//               <Text>
//                 Press anywhere on the map to set the exact location of this
//                 emergency.
//               </Text>
//               <Button
//                 style={{ paddingTop: 10 }}
//                 title="Continue"
//                 onPress={this.onSubmit}
//               />
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
// });
