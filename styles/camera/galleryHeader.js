// @flow

import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

import { enabledLargeFonts } from "../../utility/textHelpers";

const pickerContainer = {
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "nowrap",
  paddingHorizontal: 30
};

const pickerText = {
  color: colors.seekForestGreen,
  fontFamily: fonts.semibold,
  fontSize: enabledLargeFonts() ? 13 : 18,
  letterSpacing: Platform.OS === "ios" ? 1.0 : null
};

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 18,
    position: "absolute",
    zIndex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  inputIOS: pickerText,
  inputIOSContainer: pickerContainer,
  viewContainer: {
    alignItems: "center"
  },
  inputAndroid: pickerText,
  inputAndroidContainer: pickerContainer,
  carot: {
    marginRight: 15
  }
} );
