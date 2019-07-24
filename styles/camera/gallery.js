import { Dimensions, StyleSheet, Platform } from "react-native";
import { colors, fonts, touchable } from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  background: {
    flex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 54
  },
  headerText: {
    alignSelf: "center",
    paddingTop: Platform.OS === "ios" ? 3 : 0,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  },
  loadingWheel: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  galleryContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.lightGray
  },
  button: {
    paddingHorizontal: 1,
    paddingTop: 2
  },
  image: {
    width: width / 4 - 2,
    height: width / 4 - 2
  },
  backButton: {
    top: 19,
    left: 23
  },
  buttonImage: {
    padding: 5
  },
  safeView: {
    flex: 1
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.white
  },
  touchable
} );
