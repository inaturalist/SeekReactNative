import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  cameraTab: {
    alignItems: "center",
    backgroundColor: colors.black,
    height: height > 570 ? 81 : 41
  },
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.88
  },
  indicator: {
    backgroundColor: colors.seekGreen,
    borderRadius: 40,
    height: 2,
    left: width / 10,
    marginBottom: height > 570 ? 25 : 0,
    position: "absolute",
    width: width / 2.5
  }
} );
