import { Dimensions, StyleSheet, Platform } from "react-native";
import { colors, fonts, touchable } from "../global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backButton: {
    left: 23,
    top: 19
  },
  background: {
    flex: 1
  },
  button: {
    paddingHorizontal: 1,
    paddingTop: 2
  },
  buttonImage: {
    padding: 5
  },
  galleryContainer: {
    backgroundColor: colors.lightGray,
    flex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 54
  },
  headerText: {
    alignSelf: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 3 : 0
  },
  image: {
    height: width / 4 - 2,
    width: width / 4 - 2
  },
  loadingWheel: {
    justifyContent: "center",
    marginTop: height / 2 - 150
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  safeViewTop: {
    backgroundColor: colors.white,
    flex: 0
  },
  touchable
} );
