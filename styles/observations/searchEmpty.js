import { StyleSheet } from "react-native";
import { colors, fonts, center } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 65
  },
  margin: {
    marginTop: 50
  },
  headerText: {
    textAlign: "center",
    fontFamily: fonts.medium,
    color: colors.black,
    fontSize: 19,
    lineHeight: 24,
    width: 247
  }
} );
