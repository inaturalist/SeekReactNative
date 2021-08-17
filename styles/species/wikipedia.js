// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  back: {
    padding: 18,
    position: "absolute",
    right: 23 - 18,
    top: 0
  },
  bottom: {
    backgroundColor: colors.seekForestGreen,
    height: 60
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flexGrow: 1
  },
  selectedPressableArea: {
    backgroundColor: "rgb(176, 196, 222)"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    top: 19
  },
  blackText: {
    color: colors.black,
    fontFamily: fonts.book,
    paddingHorizontal: 24,
    paddingTop: 24,
    textAlign: "center"
  },
  donateText: {
    top: 19,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.black,
    fontFamily: fonts.book,
    paddingHorizontal: 24,
    marginVertical: 14,
    paddingVertical: 10,
    alignSelf: "center",
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
