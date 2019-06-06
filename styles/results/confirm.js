import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, padding } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 62
  },
  headerText: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  },
  imageContainer: {
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width,
    height: height / 3 * 2,
    resizeMode: "contain"
  },
  footer: {
    alignItems: "center",
    marginTop: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 23,
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    width: "85%",
    height: 46
  },
  lightButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 23,
    backgroundColor: "#38976d33",
    borderRadius: 24,
    width: "85%",
    height: 46
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    color: colors.white
  },
  backButton: {
    top: 19,
    left: 23
  },
  buttonImage: {
    padding: 5
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.white
  },
  loadingWheel: {
    zIndex: 1,
    position: "absolute",
    left: "50%",
    top: "50%"
  }
} );
