import {
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 18,
    position: "absolute",
    top: height > 670 ? 31 : 0
  },
  camera: {
    height,
    width: Platform.OS === "android" ? width + 100 : width, // this should account for offcenter photos on android
    zIndex: -1
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black,
    flex: 1
  },
  dotRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  dots: {
    marginHorizontal: width / 32
  },
  greenButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 6,
    height: 26,
    justifyContent: "center",
    width: 101
  },
  greenButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 0.94,
    paddingTop: Platform.OS === "ios" ? 6 : null
  },
  header: {
    position: "absolute",
    top: height > 670 ? 80 : 40
  },
  loading: {
    position: "absolute",
    top: height / 2 - 50
  },
  predictions: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 20,
    margin: 23,
    textAlign: "center",
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  }
} );
