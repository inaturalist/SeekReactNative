import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

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
    height: height > 570 ? 81 : 41,
    alignItems: "center"
  },
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    letterSpacing: 0.88,
    fontSize: 14
  },
  indicator: {
    position: "absolute",
    left: width / 10,
    width: width / 2.5,
    borderRadius: 40,
    height: 2,
    marginBottom: height > 570 ? 25 : 0,
    backgroundColor: colors.seekGreen
  },
  galleryHeader: {
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  }
} );
