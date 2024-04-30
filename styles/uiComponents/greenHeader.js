// @flow

import { StyleSheet, I18nManager } from "react-native";
import {
  center,
  colors,
  fonts,
  dimensions,
  padding
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewHeaderStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  center,
  container: {
    backgroundColor: colors.seekForestGreen,
    flexDirection: "row",
    paddingBottom: 18,
    paddingTop: 20.5
  },
  help: {
    paddingBottom: 13,
    paddingHorizontal: 21,
    paddingTop: 13,
    position: "absolute",
    right: 0
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    maxWidth: dimensions.width - 100,
    paddingTop: padding.iOSPaddingSmall
  }
} );

export {
  textStyles,
  viewHeaderStyles
};
