import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  touchable
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
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 150,
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height > 670 ? 74 : 14,
    padding: 20
  },
  carousel: {
    marginTop: 20
  },
  container: {
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 57,
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
    alignItems: "center",
    bottom: height > 670 ? 190 : 130,
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0
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
    marginBottom: 30,
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
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 57,
    marginLeft: 42,
    marginRight: 42,
    marginTop: 29
  },
  touchable
} );
