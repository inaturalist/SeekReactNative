// @flow

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
  emptyText: {
    paddingTop: 14,
    paddingBottom: 31
  },
  flexGrow: {
    flexGrow: 1
  },
  padding: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "android" ? 37 : 44
  },
  hiddenSectionSeparator: {
    paddingBottom: 31
  },
  sectionWithDataSeparator: {
    paddingBottom: 22
  },
  bottomOfSectionPadding: {
    paddingBottom: 12
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flex: 1
  }
} );
