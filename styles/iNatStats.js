import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  dimensions
} from "./global";

export default StyleSheet.create( {
  bird: {
    height: dimensions.height > 570 ? 65 : 45,
    position: "absolute",
    resizeMode: "contain",
    right: 4,
    top: 5,
    width: 73
  },
  caption: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    width: 245
  },
  center,
  explainImage: {
    marginBottom: 33,
    resizeMode: "contain",
    width: dimensions.width - 54
  },
  headerMargin: {
    marginBottom: 24
  },
  heatMap: {
    height: 227,
    width: dimensions.width
  },
  image: {
    height: 286,
    resizeMode: "cover",
    width: dimensions.width
  },
  logo: {
    height: 33,
    resizeMode: "contain",
    width: 183
  },
  logoContainer: {
    alignSelf: "center",
    paddingTop: 20,
    position: "absolute"
  },
  missionContainer: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    marginBottom: 46,
    marginHorizontal: 27,
    marginTop: 24
  },
  missionHeaderText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 19,
    lineHeight: 24,
    marginBottom: 10
  },
  missionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 30,
    marginBottom: 23,
    marginTop: 7
  },
  photoContainer: {
    height: 375
  }
} );
