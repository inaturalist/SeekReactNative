import { StyleSheet } from "react-native";

import {
  fonts,
  colors,
  padding,
  dimensions
} from "./global";

export default StyleSheet.create( {
  // buttonText: {
  //   color: colors.seekForestGreen,
  //   fontFamily: fonts.semibold,
  //   fontSize: 18,
  //   letterSpacing: 1.0,
  //   lineHeight: 24,
  //   paddingHorizontal: 26,
  //   paddingTop: padding.iOSPadding,
  //   textAlign: "center"
  // },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    height: 107,
    resizeMode: "contain",
    width: dimensions.width - 70
  },
  margin: {
    marginTop: dimensions.height > 570 ? 64 : 34
  },
  marginSmall: {
    marginTop: 25
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 19,
    marginHorizontal: 30,
    maxWidth: 317,
    textAlign: "center"
  },
  // whiteButton: {
  //   alignItems: "center",
  //   backgroundColor: colors.white,
  //   borderRadius: 34,
  //   height: 52,
  //   justifyContent: "center",
  //   maxWidth: 317,
  //   width: dimensions.width - 70
  // },
  // whiteButtonLarge: {
  //   borderRadius: 100,
  //   height: 79
  // }
} );
