import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  center
} from "./global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  activeDot: {
    backgroundColor: colors.white,
    borderRadius: 10 / 2,
    height: 10,
    width: 10
  },
  banner: {
    backgroundColor: colors.white,
    elevation: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 150,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    width
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 50,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? padding.iOSPadding : null,
    width: 293
  },
  buttonContainer: {
    marginBottom: height > 770 ? 74 : 34,
    padding: 20
  },
  buttonHeight: {
    height: 50
  },
  center,
  container: {
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width
  },
  dot: {
    backgroundColor: colors.darkGray,
    borderRadius: 6 / 2,
    height: 6,
    marginBottom: 3,
    marginHorizontal: 16,
    marginTop: 3,
    width: 6
  },
  image: {
    height: height > 570 ? 268 : 250,
    resizeMode: "contain",
    width: 297
  },
  image1: {
    height: height > 570 ? 304 : 250,
    resizeMode: "contain",
    width: 256
  },
  imageContainer: {
    alignItems: "center",
    marginHorizontal: 22
  },
  pagination: {
    flexDirection: "row",
    marginBottom: height > 570 ? 37 : 27,
    marginTop: height > 570 ? 57 : 27
  },
  skip: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    textAlign: "center"
  },
  skipText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: height > 570 ? 19 : 16,
    lineHeight: 24,
    maxWidth: 292,
    textAlign: "center"
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 42,
    marginTop: 29
  }
} );
