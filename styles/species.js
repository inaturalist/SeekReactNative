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
  container: {
    width,
    height,
    backgroundColor: colors.darkBlue
  },
  largeHeaderText: {
    marginTop: margins.medium,
    fontSize: fontSize.largeHeader,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
  },
  headerText: {
    marginTop: margins.medium,
    fontSize: fontSize.header,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    color: colors.white
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
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center"
  },
  image: {
    width,
    height: height / 2 - 100
  },
  infoContainer: {
    flex: 5
  }
} );
