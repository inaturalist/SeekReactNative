import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 0.3,
    marginTop: margins.medium,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  headerText: {
    fontSize: fontSize.mediumHeader,
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
    marginHorizontal: margins.medium,
    marginBottom: margins.medium
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
    fontFamily: fonts.semibold,
    fontSize: fontSize.buttonText,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center"
  },
  matchImage: {
    alignSelf: "center",
    zIndex: 1
  },
  imageBackground: {
    backgroundColor: colors.darkDesaturatedBlue,
    width,
    height: 231,
    justifyContent: "center"
  },
  imageCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap"
  },
  imageContainer: {
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
    marginHorizontal: margins.small,
    marginTop: margins.small
  },
  footer: {
    flex: 1,
    marginTop: margins.large
  },
  centeredText: {
    textAlign: "center"
  }
} );
