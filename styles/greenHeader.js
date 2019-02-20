import { StyleSheet } from "react-native";
import { colors, fonts } from "./global";

export default StyleSheet.create( {
  container: {
    height: 88,
    backgroundColor: colors.seekForestGreen
  },
  backButton: {
    top: 48,
    left: 23
  },
  image: {
    padding: 5
  },
  textContainer: {
    top: 26,
    alignSelf: "center"
  },
  text: {
    fontSize: 22,
    lineHeight: 30,
    color: colors.white,
    fontFamily: fonts.semibold,
    marginBottom: 5
  }
} );
