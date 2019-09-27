import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
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
  }
} );
