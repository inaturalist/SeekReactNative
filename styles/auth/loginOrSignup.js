// @flow

import { StyleSheet } from "react-native";

import {
  fonts,
  colors,
  center,
  dimensions
} from "../global";


const viewStyles = StyleSheet.create( {
  center,
  container: {
    flex: 1
  },
  margin: {
    marginTop: dimensions.height > 570 ? 64 : 34
  },
  marginSmall: {
    marginTop: 25
  },
  scrollContainer: {
    flexGrow: 1
  }
} );

const textStyles = StyleSheet.create( {
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 19,
    marginHorizontal: 30,
    maxWidth: 317,
    textAlign: "center"
  }
} );

const imageStyles = StyleSheet.create( {
  logo: {
    height: 107,
    resizeMode: "contain",
    width: dimensions.width - 70
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};

