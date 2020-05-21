import { StyleSheet, Platform } from "react-native";
import {
  colors,
  center,
  row,
  fonts,
  dimensions
} from "../global";

import { enabledLargeFonts } from "../../utility/textHelpers";

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingBottom: 18,
    paddingHorizontal: 23,
    paddingTop: 18,
    position: "absolute"
  },
  background: {
    backgroundColor: colors.lightGray,
    flex: 1
  },
  button: {
    paddingHorizontal: 1,
    paddingTop: 2
  },
  buttonImage: {
    padding: 5,
    tintColor: colors.seekForestGreen
  },
  center,
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: enabledLargeFonts() ? 13 : 18,
    letterSpacing: 1.0,
    maxWidth: dimensions.width - 100,
    paddingTop: Platform.OS === "ios" ? 5 : 0
  },
  image: {
    height: dimensions.width / 4 - 2,
    width: dimensions.width / 4 - 2
  },
  loadingWheel: {
    backgroundColor: colors.white,
    left: dimensions.width / 2 - 15,
    position: "absolute",
    top: dimensions.height / 2 - 50,
    zIndex: 1
  },
  margin: {
    marginLeft: 15
  },
  row,
  safeViewTop: {
    backgroundColor: colors.white,
    flex: 0
  }
} );
