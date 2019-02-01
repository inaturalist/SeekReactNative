import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  greenHeader: {
    backgroundColor: colors.seekForestGreen,
    borderBottomWidth: 0,
    elevation: 0
  },
  whiteHeaderTitle: {
    fontSize: 22,
    color: colors.white,
    fontFamily: fonts.semibold,
    flex: 1,
    textAlign: "center",
    paddingRight: Platform.OS === "android" ? 60 : null
  },
  cameraTab: {
    backgroundColor: colors.black,
    height: 41,
    alignItems: "center"
  },
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.default,
    letterSpacing: 0.88,
    fontSize: 14
  },
  indicator: {
    position: "absolute",
    left: width / 10,
    width: width / 2.5,
    backgroundColor: colors.seekGreen
  },
  galleryHeader: {
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  }
} );
