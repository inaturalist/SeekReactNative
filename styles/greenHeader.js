import { StyleSheet } from "react-native";
import { colors, fonts } from "./global";

export default StyleSheet.create( {
  container: {
    height: 75,
    backgroundColor: colors.seekForestGreen
  },
  backButton: {
    top: 38,
    left: 23
  },
  image: {
    padding: 5
  },
  textContainer: {
    top: 16,
    alignSelf: "center"
  },
  text: {
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0,
    fontFamily: fonts.semibold,
    marginBottom: 16
  }
} );
