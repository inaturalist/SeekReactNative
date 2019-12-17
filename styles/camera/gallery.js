import { StyleSheet, Platform } from "react-native";
import {
  colors,
  center,
  row,
  fonts,
  dimensions
} from "../global";

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
    height: dimensions.width / 4 - 2,
    width: dimensions.width / 4 - 2
  },
  loading: {
    left: dimensions.width / 2 - 15,
    position: "absolute",
    top: dimensions.height / 2,
    zIndex: 1
  },
  loadingWheel: {
    marginTop: dimensions.height / 2 - 125
  },
  margin: {
    marginLeft: 15
  },
  row,
  safeViewTop: {
    backgroundColor: colors.white,
    flex: 0
  }
} );
