import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  backgroundImage: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  banner: {
    zIndex: 1,
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  bannerImage: {
    position: "absolute",
    top: 25,
    left: 10,
    zIndex: 1
  },
  header: {
    height: 50
  },
  headerText: {
    marginLeft: margins.medium,
    fontSize: fontSize.smallText,
    lineHeight: 14,
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
    flex: 1,
    flexGrow: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  gridCell: {
    width: 105,
    height: 138,
    paddingHorizontal: padding.medium
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden"
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
    marginTop: margins.small,
    justifyContent: "flex-end",
    height: 50,
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
