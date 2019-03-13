import { StyleSheet, Platform } from "react-native";

import { colors } from "../global";

export default StyleSheet.create( {
  container: {
    height: 74,
    justifyContent: "flex-end"
  },
  navbar: {
    backgroundColor: colors.white,
    height: 70,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cameraImage: {
    marginBottom: Platform.OS === "android" ? 10 : 50,
    width: Platform.OS === "android" ? 84 : 94,
    height: Platform.OS === "android" ? 84 : 94
  },
  button: {
    marginHorizontal: 26,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
} );
