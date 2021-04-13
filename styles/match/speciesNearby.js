// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center
} from "../global";

export default StyleSheet.create( {
  center,
  headerText: {
    alignSelf: "center",
    color: colors.seekTeal,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 20,
    marginTop: 4
  },
  largerHeight: {
    height: 231
  },
  speciesNearbyContainer: {
    backgroundColor: colors.seekTeal
  },
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 12,
    marginVertical: 15,
    maxWidth: 245,
    textAlign: "center"
  }
} );
