// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type {
  ViewStyleProp,
  TextStyleProp
} from "react-native/Libraries/StyleSheet/StyleSheet";

const maxColumnWidth = 455;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white
  },
  textContainer: {
    paddingHorizontal: 33,
    paddingTop: 21
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center"
  },
  marginGreenButtonLarge: {
    marginTop: 33
  },
  marginBottom: {
    marginTop: 48
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  header: {
    paddingLeft: 22
  }
} );

export { viewStyles, textStyles };
