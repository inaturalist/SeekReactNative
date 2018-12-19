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
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1
  },
  headerContainer: {
    backgroundColor: colors.darkBlue
  },
  photoOverlay: {
    zIndex: 1,
    position: "absolute",
    right: 5,
    top: 200
  },
  ccButton: {
    backgroundColor: colors.darkDesaturatedBlue,
    paddingRight: padding.medium,
    paddingLeft: padding.medium,
    paddingTop: padding.medium,
    paddingBottom: padding.medium,
    borderRadius: 40
  },
  largeHeaderText: {
    marginLeft: margins.medium,
    marginTop: margins.medium,
    fontSize: fontSize.mediumLargeHeader,
    color: colors.white,
    fontFamily: fonts.default
  },
  headerText: {
    marginLeft: margins.medium,
    marginTop: margins.medium,
    marginBottom: margins.medium,
    fontSize: fontSize.header,
    lineHeight: 22,
    color: colors.white,
    fontFamily: fonts.default
  },
  text: {
    marginLeft: margins.medium,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontFamily: fonts.semibold
  },
  greenText: {
    alignItems: "center",
    justifyContent: "center",
    color: colors.lightGreen
  },
  button: {
    backgroundColor: colors.darkGreen,
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.small,
    paddingTop: padding.medium,
    paddingBottom: padding.medium,
    borderRadius: 40,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: fonts.playful,
    fontSize: fontSize.buttonText,
    color: colors.darkBlue
  },
  plus: {
    paddingRight: padding.medium
  },
  ccButtonText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.text,
    color: colors.white
  },
  image: {
    width,
    height: 251
  },
  categoryContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    opacity: 0.8
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    height: 40,
    marginTop: margins.medium,
    marginBottom: margins.medium
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: margins.medium,
    marginBottom: margins.medium
  },
  smallImage: {
    width: 56,
    height: 43
  },
  greenImage: {
    width: 74,
    height: 74,
    marginBottom: margins.medium,
    backgroundColor: "transparent",
    tintColor: colors.lightGreen
  },
  infoContainer: {
    flex: 5,
    backgroundColor: colors.darkestBlue
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: margins.medium
  },
  map: {
    width: width - 30,
    height: width / 2,
    borderRadius: 5
  },
  footer: {
    flex: 0.8
  }
} );
