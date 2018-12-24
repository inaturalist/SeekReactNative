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
  infoContainer: {
    flex: 5,
    backgroundColor: colors.darkestBlue
  },
  photoContainer: {
    height: 251
  },
  image: {
    width,
    height: 251
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
  headerContainer: {
    backgroundColor: colors.darkBlue
  },
  largeHeaderText: {
    marginLeft: margins.medium,
    marginTop: margins.small,
    fontSize: fontSize.mediumLargeHeader,
    color: colors.white,
    fontFamily: fonts.default
  },
  scientificHeaderText: {
    marginLeft: margins.medium,
    fontSize: fontSize.text,
    color: colors.white,
    fontFamily: fonts.default
  },
  italicText: {
    marginLeft: margins.medium,
    fontFamily: fonts.book,
    color: colors.white,
    fontStyle: "italic"
  },
  headerText: {
    marginLeft: margins.medium,
    marginTop: margins.mediumLarge,
    marginBottom: margins.small,
    fontSize: fontSize.header,
    lineHeight: 22,
    color: colors.white,
    fontFamily: fonts.default
  },
  text: {
    marginLeft: margins.medium,
    marginRight: margins.medium,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontFamily: fonts.default
  },
  ccButtonText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.text,
    color: colors.white
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
  categoryContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    opacity: 0.8
  },
  greenText: {
    alignItems: "center",
    justifyContent: "center",
    color: colors.lightGreen
  },
  greenImage: {
    width: 74,
    height: 74,
    marginBottom: margins.medium,
    backgroundColor: "transparent",
    tintColor: colors.lightGreen
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
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: margins.large,
    marginBottom: margins.medium
  },
  smallImage: {
    width: 56,
    height: 43,
    marginRight: margins.mediumLarge
  },
  footer: {
    height: 72,
    justifyContent: "center"
  }
} );
