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
  banner: {
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  bannerImage: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 1
  },
  header: {
    flex: 0.6,
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
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: margins.medium
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: padding.medium,
    marginTop: margins.medium,
    marginBottom: margins.small
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: colors.blueShadow
  },
  cellTitle: {
    height: 45,
    backgroundColor: colors.darkBlue,
    padding: padding.medium,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: padding.extraSmall
  },
  footer: {
    flex: 0.5,
    marginTop: margins.small,
    justifyContent: "flex-end",
    height: height / 3,
    backgroundColor: colors.darkDesaturatedBlue
  },
  profile: {
    flexDirection: "row",
    flexWrap: "nowrap"
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
    paddingLeft: "25%"
  }
} );
