import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  column: {
    flex: 1
  },
  carousel: {
    flex: 1
  },
  image: {
    width: 190,
    height: 214
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.semibold
  },
  skip: {
    fontSize: 22,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.light,
    textDecorationLine: "underline"
  }
} );
