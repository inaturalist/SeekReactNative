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
    height
  },
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: colors.darkBlue,
    flexDirection: "column",
    justifyContent: "center"
  },
  header: {
    height: 100,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  },
  headerText: {
    marginLeft: margins.medium,
    fontSize: fontSize.smallText,
    lineHeight: 12,
    color: colors.white,
    fontFamily: fonts.default,
    position: "absolute",
    bottom: 30
  },
  locationChooser: {
    position: "absolute",
    bottom: 5,
    paddingLeft: padding.large
  },
  locationChooserText: {
    color: colors.white,
    fontFamily: fonts.playful,
    fontSize: fontSize.buttonText,
    fontWeight: "900"
  },
  taxonChooser: {
    position: "absolute",
    bottom: 5,
    right: 0,
    paddingRight: padding.large
  },
  taxonChooserText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.text
  },
  taxonGrid: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: margins.extraLarge,
    marginBottom: margins.large
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: padding.medium,
    marginTop: margins.medium
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: colors.blueShadow
  },
  cellTitle: {
    height: 40,
    backgroundColor: colors.darkBlue,
    padding: padding.medium,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: padding.small
  },
  footer: {
    flex: 0.5,
    marginTop: margins.small,
    justifyContent: "flex-end",
    height: height / 3,
    backgroundColor: colors.darkDesaturatedBlue
  },
  profileButton: {
    zIndex: 1,
    marginBottom: margins.extraSmall,
    paddingLeft: padding.large
  },
  addPhotoButton: {
    zIndex: 1,
    position: "absolute",
    right: 0,
    marginBottom: margins.extraSmall,
    paddingRight: padding.large
  },
  profileText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    marginBottom: margins.medium,
    paddingLeft: "30%"
  }
} );
