import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: margins.large
  },
  welcomeText: {
    fontSize: fontSize.largeHeader,
    color: colors.white,
    fontFamily: fonts.default
  },
  earnText: {
    fontSize: fontSize.header,
    marginTop: margins.medium,
    marginBottom: margins.medium,
    marginHorizontal: margins.large,
    flexDirection: "row",
    flexWrap: "wrap",
    lineHeight: 27,
    color: colors.white,
    fontFamily: fonts.default
  },
  tipContainer: {
    marginBottom: margins.small
  },
  tipList: {
    marginBottom: margins.small,
    marginLeft: "10%",
    marginRight: "20%",
    flexDirection: "row"
  },
  checkMark: {
    fontSize: fontSize.mediumHeader,
    color: colors.lightGreen,
    fontFamily: fonts.checkboxes,
    marginRight: margins.medium
  },
  tips: {
    fontSize: fontSize.text,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap"
  },
  disclaimerContainer: {
    marginTop: margins.medium,
    marginHorizontal: margins.large,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  disclaimer: {
    fontSize: fontSize.smallText,
    marginBottom: margins.medium,
    lineHeight: 15,
    color: colors.white,
    fontFamily: fonts.default
  },
  button: {
    backgroundColor: colors.white,
    color: colors.black,
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.small,
    paddingTop: padding.small,
    paddingBottom: padding.extraSmall,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.buttonText,
    textAlign: "center",
    justifyContent: "center"
  }
} );
