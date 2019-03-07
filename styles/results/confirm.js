import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, padding } from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 54
  },
  headerText: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  image: {
    width,
    height: width
  },
  footer: {
    alignItems: "center",
    marginTop: 50
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    width: "80%",
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
  }
} );
