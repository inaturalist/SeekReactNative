import { StyleSheet } from "react-native";

import {
  fonts,
  colors,
  center,
  dimensions
} from "./global";

export default StyleSheet.create( {
  center,
  container: {
    flex: 1
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
  }
} );
