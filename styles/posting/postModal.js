// @flow

import { StyleSheet } from "react-native";
import { fonts, dimensions, colors } from "../global";



const viewStyles = StyleSheet.create( {
  container: {
    flex: 1,
    paddingBottom: dimensions.height > 570 ? 60 : 26,
    paddingHorizontal: 32,
    backgroundColor: colors.white
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  greenButton: {
    justifyContent: "flex-end"
  },
  uploadImage: {
    marginTop: 41
  }
} );

const textStyles = StyleSheet.create( {
  text: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 26,
    maxWidth: 298
  },
  headerText: {
    // modalBanner Green
    textAlign: "center",
    color: colors.seekiNatGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    lineHeight: 25,
    maxWidth: 298,
    marginTop: 19
  }
} );

export {
  viewStyles,
  textStyles
};
