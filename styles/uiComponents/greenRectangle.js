// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, padding } from "../global";

export default StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    paddingVertical: 6
  },
  greenButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 0.89,
    paddingHorizontal: 10,
    paddingTop: padding.iOSButtonPadding
  }
} );
