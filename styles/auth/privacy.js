// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";



const viewStyles = StyleSheet.create( {
  textContainer: {
    marginBottom: 27,
    marginHorizontal: 29,
    marginTop: 27
  }
} );

const textStyles = StyleSheet.create( {
  list: {
    marginLeft: -15
  },
  headerText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 20
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 20
  }
} );

export {
  textStyles,
  viewStyles
};
