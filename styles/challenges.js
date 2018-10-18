import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

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
    marginLeft: 15,
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
    paddingLeft: 15
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
    paddingRight: 15
  },
  taxonChooserText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.text
  },
  taxonGrid: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 40
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: 6,
    marginTop: 15
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: colors.blueShadow
  },
  cellTitle: {
    height: 40,
    backgroundColor: colors.darkBlue,
    padding: 5,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: 3
  },
  footer: {
    height: 50,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.darkDesaturatedBlue
  },
  profileButton: {
    position: "absolute",
    left: 0,
    bottom: 5,
    paddingLeft: 15
  },
  addPhotoButton: {
    position: "absolute",
    right: 0,
    bottom: 5,
    paddingRight: 15
  },
  profileText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    bottom: 5,
    paddingLeft: "30%"
  }
} );
