import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  galleryError: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center"
  },
  cameraError: {
    position: "absolute",
    top: height / 2 - 50
  },
  errorText: {
    textAlign: "center",
    marginHorizontal: 41,
    fontSize: 19,
    lineHeight: 24,
    fontFamily: fonts.medium,
    color: colors.white
  },
  blackBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black
  },
  greenButton: {
    marginTop: 38,
    backgroundColor: colors.seekForestGreen,
    width: 323,
    height: 42,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 1.0,
    color: colors.white
  }
} );
