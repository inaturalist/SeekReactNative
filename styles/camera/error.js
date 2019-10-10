import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  blackBackground: {
    alignItems: "center",
    backgroundColor: colors.black,
    height: "100%",
    justifyContent: "center",
    width: "100%"
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding
  },
  cameraError: {
    position: "absolute",
    top: height / 2 - 50
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center"
  },
  galleryError: {
    alignItems: "center",
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: "center"
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 42,
    justifyContent: "center",
    marginTop: 38,
    width: 323
  }
} );
