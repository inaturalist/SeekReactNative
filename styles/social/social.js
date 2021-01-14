import { StyleSheet } from "react-native";
import { colors, center, fonts, dimensions, row } from "../global";

export default StyleSheet.create( {
  center,
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  headerText: {
    alignSelf: "center",
    paddingTop: 18,
    position: "absolute"
  },
  spaceBeforeButtons: {
    marginTop: 23
  },
  spaceBetweenButtons: {
    marginTop: 23
  },
  photoSizeText: {
    color: colors.seekForestGreen,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.78
  },
  selectedPhotoSizeText: {
    fontFamily: fonts.semibold
  },
  linkText: {
    alignSelf: "center",
    color: colors.linkText,
    fontFamily: fonts.book,
    fontSize: 18,
    textDecorationLine: "underline",
    paddingVertical: 27
  },
  optionsText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginTop: 18,
    marginLeft: 24
  },
  speciesIdText: {
    fontFamily: fonts.book,
    fontSize: 16
  },
  photoTabs: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  roundedIndicator: {
    backgroundColor: colors.seekGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 4,
    width: 138
  },
  hiddenIndicator: {
    backgroundColor: colors.white,
    height: 4,
    width: 138
  },
  image: {
    backgroundColor: colors.black,
    width: dimensions.width,
    // containing the image shows an accurate watermark on the social screen
    resizeMode: "contain",
    height: dimensions.height
  },
  row,
  checkboxRow: {
    marginLeft: 12
  },
  checkbox: {
    paddingHorizontal: 12,
    paddingVertical: 17
  }
} );
