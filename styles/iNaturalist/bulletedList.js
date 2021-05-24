// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  dimensions,
  fonts
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  bulletContainer: {
    flexDirection: "row"
  },
  valuePropBullets: {
    marginLeft: 3
  },
  iconContainer: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginRight: 17
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 12
  },
  bulletText: {
    maxWidth: dimensions.width - ( 32 * 2 + 14 * 2 + 23 )
  },
  valuePropText: {
    maxWidth: dimensions.width - ( 32 * 3 + 14 * 2 + 23 )
  },
  bulletPoints: {
    fontSize: 27,
    marginHorizontal: 14,
    marginTop: 4
  }
} );

export {
  viewStyles,
  textStyles
};
