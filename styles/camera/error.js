// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";



const viewStyles = StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center"
  }
} );

const textStyles = StyleSheet.create( {
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};

