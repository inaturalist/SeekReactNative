import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, padding } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  backButton: {
    left: 23,
    top: 18
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    height: 46,
    justifyContent: "center",
    marginHorizontal: 23,
    width: "85%"
  },
  buttonImage: {
    padding: 5
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding
  },
  container: {
    flex: 1
  },
  footer: {
    alignItems: "center",
    marginTop: 20
  },
  header: {
    backgroundColor: colors.white,
    height: 62
  },
  headerText: {
    alignSelf: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
  },
  image: {
    height: height / 3 * 2,
    resizeMode: "contain",
    width
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.black,
    justifyContent: "center"
  },
  lightButton: {
    alignItems: "center",
    backgroundColor: "#38976d33",
    borderRadius: 24,
    height: 46,
    justifyContent: "center",
    marginHorizontal: 23,
    width: "85%"
  },
  loadingWheel: {
    position: "absolute",
    top: "50%",
    zIndex: 1
  },
  safeViewTop: {
    backgroundColor: colors.white,
    flex: 0
  }
} );
