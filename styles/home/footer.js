import { StyleSheet } from "react-native";

import { colors } from "../global";

export default StyleSheet.create( {
  container: {
    height: 70,
    justifyContent: "flex-end"
  },
  navbar: {
    backgroundColor: colors.white,
    height: 60,
    marginBottom: 13,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  cameraImage: {
    marginBottom: 50
  }
} );
