import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  mainContainer: {
    flex: 1
  },
  backgroundImage: {
    flex: 1
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  header: {
    marginTop: margins.medium,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: fontSize.mediumHeader,
    color: colors.white,
    fontFamily: fonts.default,
    marginBottom: margins.medium
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: 40
  },
  text: {
    fontSize: fontSize.text,
    lineHeight: 20,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.default
  },
  matchImage: {
    marginTop: margins.small,
    zIndex: 1
  },
  imageBackground: {
    backgroundColor: colors.darkDesaturatedBlue,
    height: 231,
    justifyContent: "center"
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap"
  },
  imageCell: {
    borderRadius: 5,
    borderColor: colors.white,
    borderWidth: 1,
    width: 135,
    height: 135
  },
  textCell: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  captionText: {
    fontSize: fontSize.text,
    color: colors.white,
    fontFamily: fonts.default,
    width: 135,
    flexWrap: "wrap",
    textAlign: "center",
    marginHorizontal: margins.small,
    marginTop: margins.small
  },
  footer: {
    marginTop: margins.small,
    justifyContent: "flex-end"
  },
  button: {
    backgroundColor: colors.darkGreen,
    marginHorizontal: margins.mediumLarge,
    marginTop: margins.medium,
    marginBottom: margins.medium,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.buttonText,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center",
    paddingTop: padding.buttonTop,
    paddingBottom: padding.buttonBottom
  }
} );
