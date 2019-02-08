import { StyleSheet } from "react-native";
import { colors, fonts } from "./global";

export default StyleSheet.create( {
  container: {
    height: 88,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "space-around",
    backgroundColor: colors.seekForestGreen
  },
  backButton: {
    marginBottom: 20
  },
  image: {
    padding: 5
  },
  text: {
    fontSize: 22,
    lineHeight: 30,
    color: colors.white,
    fontFamily: fonts.semibold,
    marginBottom: 15
  }
} );
