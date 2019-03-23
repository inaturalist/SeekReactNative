import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.white,
    borderRadius: 40,
    height: 453
  },
  headerText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  contentContainer: {
    marginTop: 10,
    marginHorizontal: 29
  },
  row: {
    height: 100,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 68,
    height: 68,
    resizeMode: "contain",
    marginRight: 24
  },
  textContainer: {
    width: 194
  },
  text: {
    maxWidth: 194,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    width: 292,
    height: 46,
    marginTop: 21,
    marginBottom: 21,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: fonts.semibold,
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0
  }
} );
