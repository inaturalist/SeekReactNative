import { StyleSheet } from "react-native";
import { colors, center, fonts, dimensions } from "../global";

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
  textContainer: {
    marginHorizontal: 24
  },
  spaceAfterButtons: {
    marginTop: 27
  },
  spaceBeforeButtons: {
    marginTop: 35
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
    textDecorationLine: "underline"
  },
  optionsText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
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
  imageBackground: {
    minHeight: 375
  },
  image: {
    width: dimensions.width,
    height: dimensions.height,
    resizeMode: "contain"
  }
  // image: {
  //   height: ( height / 3 ) * 2,
  //   resizeMode: "contain",
  //   width
  // },
  // imageContainer: {
  //   alignItems: "center",
  //   backgroundColor: colors.black,
  //   justifyContent: "center"
  // },
  // loadingWheel: {
  //   position: "absolute",
  //   top: "50%",
  //   zIndex: 1
  // }
} );
