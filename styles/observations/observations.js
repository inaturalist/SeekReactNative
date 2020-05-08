import { StyleSheet, Platform } from "react-native";
import {
  center,
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  center,
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  padding: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "android" ? 48 : 68
  },
  sectionSeparator: {
    marginBottom: 14
  },
  separator: {
    marginBottom: 18
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 24,
    marginTop: 4,
    textAlign: "center"
  },
  top: {
    paddingTop: 24
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flex: 1
  }
} );
