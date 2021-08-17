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
  letterSpacing: Platform.OS === "ios" ? 1.0 : 0
};

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  inputIOSContainer: pickerContainer,
  viewContainer: {
    alignItems: "center"
  },
  inputAndroidContainer: pickerContainer,
  carot: {
    marginRight: 15
  },
  // $FlowFixMe
  inputIOS: pickerText,
  // $FlowFixMe
  inputAndroid: pickerText
} );

export default viewStyles;
