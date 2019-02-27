import { StyleSheet, Platform } from "react-native";

import { colors } from "../global";

export default StyleSheet.create( {
  container: {
    justifyContent: "center"
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
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  }
} );
