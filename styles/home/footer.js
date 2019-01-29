import { StyleSheet } from "react-native";

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
    justifyContent: "space-around",
    alignItems: "center"
  },
  cameraImage: {
    marginBottom: 50
  },
  button: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  }
} );
