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
    paddingHorizontal: 23,
    paddingVertical: 18,
    position: "absolute"
  },
  background: {
    backgroundColor: colors.white,
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
  grayContainer: {
    backgroundColor: colors.lightGray,
    flexGrow: 1
  },
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
  margin: {
    marginLeft: 15
  },
  row,
  padding: 50
} );
