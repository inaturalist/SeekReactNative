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
  itemSeparator: {
    marginBottom: 18
  },
  padding: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "android" ? 24 : 44
  },
  sectionSeparator: {
    paddingBottom: 14
  },
  sectionWithDataSeparator: {
    paddingBottom: 14 / 2
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4,
    textAlign: "center"
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flex: 1
  }
} );
