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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: margins.large,
    marginHorizontal: margins.medium
  },
  welcomeText: {
    fontSize: fontSize.largeHeader,
    color: colors.white,
    fontFamily: fonts.default
  },
  earnText: {
    fontSize: fontSize.header,
    marginTop: margins.small,
    marginHorizontal: margins.medium,
    marginBottom: margins.small,
    flexDirection: "row",
    flexWrap: "wrap",
    lineHeight: 24,
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
    marginHorizontal: margins.medium,
    justifyContent: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  disclaimer: {
    marginHorizontal: margins.medium,
    fontSize: fontSize.smallText,
    marginBottom: margins.small,
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
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.semibold,
    paddingTop: padding.medium,
    paddingBottom: padding.small,
    fontSize: fontSize.buttonText,
    textAlign: "center",
    justifyContent: "center"
  }
} );
