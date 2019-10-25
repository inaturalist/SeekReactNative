import {
  StyleSheet
} from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

export default StyleSheet.create( {
  center,
  lightText: {
    color: colors.errorGray,
    fontFamily: fonts.light,
    fontSize: 16,
    lineHeight: 18,
    marginTop: 11,
    width: 195
  },
  noChallengeMargin: {
    marginTop: 21
  },
  noChallengeText: {
    color: colors.errorGray,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    width: 195
  },
  noChallengeTextContainer: {
    marginLeft: 30
  },
  row
} );
