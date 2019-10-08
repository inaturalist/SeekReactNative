import { StyleSheet, Platform } from "react-native";

import { colors, row } from "../global";

export default StyleSheet.create( {
  button: {
    marginHorizontal: 26,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  cameraImage: {
    height: Platform.OS === "android" ? 84 : 94,
    marginBottom: Platform.OS === "android" ? 10 : 50,
    width: Platform.OS === "android" ? 84 : 94
  },
  container: {
    height: 74,
    justifyContent: "flex-end"
  },
  navbar: {
    backgroundColor: colors.white,
    height: 70,
    justifyContent: "space-between"
  },
  row,
  touchable: {
    bottom: 21,
    left: 30,
    right: 30,
    top: 21
  }
} );
