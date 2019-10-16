import { StyleSheet, Platform } from "react-native";

import { colors, row } from "../global";

export default StyleSheet.create( {
  cameraImage: {
    height: Platform.OS === "android" ? 84 : 94,
    marginBottom: Platform.OS === "android" ? 10 : 50,
    marginLeft: 8,
    width: Platform.OS === "android" ? 84 : 94
  },
  container: {
    height: 74,
    justifyContent: "flex-end"
  },
  leftIcon: {
    marginLeft: 30
  },
  navbar: {
    backgroundColor: colors.white,
    height: 70,
    justifyContent: "space-between"
  },
  notificationPadding: {
    paddingLeft: 4,
    paddingRight: 3
  },
  rightIcon: {
    marginRight: 30
  },
  row,
  touchable: {
    bottom: 21,
    left: 30,
    right: 30,
    top: 21
  }
} );
