// @flow

import { StyleSheet, I18nManager } from "react-native";
import { colors } from "../../global";

import type { ViewStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  challengeDetails: {
    paddingTop: 28
  },
  rotateRTL: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  green: {
    tintColor: colors.seekForestGreen
  }
} );

export {
  imageStyles,
  viewStyles
};
