import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row,
  center
} from "../global";

export default StyleSheet.create( {
  bird: {
    height: 65,
    resizeMode: "contain",
    width: 73
  },
  center,
  headerMargins: {
    marginBottom: 23,
    marginTop: 45
  },
  margin: {
    marginTop: 28
  },
  number: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 20,
    lineHeight: 21,
    marginTop: 7
  },
  row,
  secondHeaderText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24
  },
  textContainer: {
    marginLeft: 36
  }
} );
