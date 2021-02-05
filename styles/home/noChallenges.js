// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

export default StyleSheet.create( {
  center,
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 11
  },
  largeText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24
  },
  bullets: {
    marginHorizontal: 14
  },
  bulletWidth: {
    maxWidth: 284
  },
  textWidth: {
    width: 195
  },
  noChallengeTextContainer: {
    marginLeft: 28
  },
  margin: {
    marginTop: 45
  },
  marginExtraSmall: {
    marginTop: 12
  },
  marginSmall: {
    marginTop: 23
  },
  marginRight: {
    fontSize: 23,
    marginRight: 14
  },
  marginLeft: {
    marginLeft: 24
  },
  row,
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 22
  }
} );
