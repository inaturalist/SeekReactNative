import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 75,
    backgroundColor: colors.seekForestGreen,
    alignItems: "center"
  },
  headerText: {
    marginTop: 35,
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  secondHeaderText: {
    marginTop: 35,
    fontSize: 18,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  textContainer: {
    marginHorizontal: 25,
    alignItems: "center"
  },
  button: {
    marginTop: margins.medium,
    position: "absolute",
    right: 0,
    paddingRight: padding.large
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.book,
    lineHeight: 21,
    color: colors.black,
    textAlign: "center"
  },
  taxonGrid: {
    alignItems: "center",
    justifyContent: "center"
  },
  gridCell: {
    width: 105,
    height: 138,
    paddingHorizontal: padding.medium,
    marginTop: margins.medium
  },
  gridCellContents: {
    borderRadius: 5,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowColor: colors.darkGray,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  cellTitle: {
    height: 45,
    backgroundColor: colors.lightGray,
    padding: padding.medium,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.black,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: padding.extraSmall
  },
  noSpeciesHeaderText: {
    marginTop: height / 5,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
    maxWidth: 279,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  noSpeciesText: {
    marginTop: 25,
    fontSize: 16,
    fontFamily: fonts.book,
    lineHeight: 21,
    color: colors.black,
    textAlign: "center"
  },
  greenButton: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    width: "94%",
    height: 46
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    paddingTop: padding.iOSPadding,
    fontSize: fontSize.buttonText,
    color: colors.white
  }
} );
