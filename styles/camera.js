import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    backgroundColor: "transparent",
    flex: 1,
    width,
    height,
    flexDirection: "column"
  },
  main: {
    flexGrow: 1
  },
  footer: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  capture: {
    flex: 0,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderRadius: 100,
    alignItems: "flex-end",
    justifyContent: "center",
    borderColor: colors.lightGray,
    alignSelf: "center",
    width: 50,
    height: 50
  }
} );
