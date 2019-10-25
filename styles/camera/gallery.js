import { Dimensions, StyleSheet, Platform } from "react-native";
import {
  colors,
  center,
  row,
  fonts,
  touchable
} from "../global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingBottom: 18,
    paddingHorizontal: 23,
    paddingTop: 18,
    position: "absolute"
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
  center,
  galleryContainer: {
    backgroundColor: colors.lightGray,
    flex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  headerContainer: {
    alignSelf: "center",
    position: "absolute",
    top: 15
  },
  headerText: {
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
    marginTop: height / 2 - 150
  },
  margin: {
    marginLeft: 15
  },
  row,
  safeViewTop: {
    backgroundColor: colors.white,
    flex: 0
  },
  touchable
} );
