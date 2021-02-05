// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global";

export default StyleSheet.create( {
  cellImage: {
    borderRadius: 108 / 2,
    height: 108,
    width: 108
  },
  speciesNameText: {
    paddingTop: 13,
    width: 108,
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  gridCell: {
    marginRight: 23
  },
  checkbox: {
    position: "absolute",
    right: 0,
    bottom: 91,
    zIndex: 1,
    height: 24,
    width: 24
  }
} );
