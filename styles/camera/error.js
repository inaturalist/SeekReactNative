import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
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
  }
} );
