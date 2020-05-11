import { StyleSheet } from "react-native";
import {
  center,
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  center,
  lightText: {
    color: colors.errorGray,
    fontFamily: fonts.light,
    fontSize: 16,
    lineHeight: 18,
    marginTop: 10,
    textAlign: "center",
    width: 229
  },
  noChallengeContainer: {
    paddingBottom: 49,
    paddingTop: 24
  },
  noChallengeText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    textAlign: "center",
    width: 229
  }
} );
