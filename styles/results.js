import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 1,
    width,
    marginTop: margins.medium,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  headerText: {
    fontSize: fontSize.header,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default,
    marginBottom: margins.medium,
    marginLeft: margins.medium,
    marginTop: margins.extraSmall
  },
  text: {
    fontSize: fontSize.text,
    lineHeight: 20,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap",
    alignSelf: "center",
    marginBottom: margins.medium
  },
  captionText: {
    fontSize: fontSize.text,
    lineHeight: 14,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap",
    marginTop: margins.medium
  },
  button: {
    backgroundColor: colors.darkGreen,
    justifyContent: "flex-end",
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.small,
    paddingTop: padding.medium,
    paddingBottom: padding.medium,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.button,
    fontSize: fontSize.button,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center"
  },
  matchImage: {
    alignSelf: "center",
    zIndex: 1
  },
  imageBackground: {
    flex: 2,
    backgroundColor: colors.darkDesaturatedBlue,
    width,
    paddingTop: padding.large,
    paddingBottom: padding.large,
    justifyContent: "center"
  },
  imageCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap"
  },
  textCell: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap"
  },
  imageContainer: {
    borderColor: colors.white,
    borderWidth: 1,
    width: width / 3 - 10,
    height: width / 3 - 10
  },
  footer: {
    flex: 2
  }
} );
