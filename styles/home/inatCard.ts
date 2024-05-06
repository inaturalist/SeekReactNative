import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

const maxColumnWidth = 455;

const viewStyles = StyleSheet.create( {
  center,
  secondHeader: {
    marginTop: 23,
    marginBottom: 10
  },
  marginSmall: {
    marginTop: 23
  },
  marginOpenINat: {
    marginTop: 33
  },
  row,
  container: {
    backgroundColor: colors.white,
    paddingTop: 45
  },
  topMarginWithChallenge: {
    backgroundColor: colors.white,
    paddingTop: 31
  },
  textContainer: {
    paddingHorizontal: 33
  },
  headerPadding: {
    paddingLeft: 22
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center"
  },
  marginBottom: {
    paddingBottom: 45
  }
} );

const textStyles = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 12
  },
  secondHeaderText: {
    marginLeft: 24,
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    width: 195
  },
  linkText: {
    textDecorationLine: "underline",
    alignSelf: "center",
    paddingTop: 23,
    paddingBottom: 33
  }
} );

export {
  viewStyles,
  textStyles
};
