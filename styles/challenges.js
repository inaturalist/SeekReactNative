import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  safeContainer: {
    flex: 1,
    backgroundColor: "#0C2D3C"
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  backgroundImage: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  header: {
    marginTop: Platform.OS === "android" ? margins.medium + 10 : margins.extraSmall
  },
  headerText: {
    marginLeft: margins.medium,
    fontSize: fontSize.smallText,
    lineHeight: 14,
    color: colors.white,
    fontFamily: fonts.default
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  locationChooser: {
    paddingLeft: padding.large,
    maxWidth: 200,
    flexWrap: "nowrap"
  },
  locationChooserText: {
    flex: 1,
    maxWidth: 200,
    color: colors.white,
    fontFamily: fonts.playful,
    fontSize: fontSize.buttonText,
    fontWeight: "900"
  },
  taxonChooser: {
    paddingRight: padding.large
  },
  taxonChooserText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.text
  },
  taxonGrid: {
    alignItems: "center"
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
    marginTop: margins.medium,
    height: Platform.OS === "ios" ? 50 : 70,
    justifyContent: "flex-end",
    backgroundColor: colors.darkDesaturatedBlue
  },
  bottomRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  profileButton: {
    paddingLeft: padding.large
  },
  profileText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    marginBottom: margins.medium,
    paddingLeft: "25%"
  },
  addPhotoButton: {
    paddingRight: padding.medium
  }
} );
