import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

export default StyleSheet.create( {
  container: {
    height: 60,
    backgroundColor: colors.lightGray,
    borderBottomWidth: 0.25,
    borderColor: colors.darkGray
  },
  blueContainer: {
    height: 60,
    backgroundColor: colors.darkestBlue,
    borderBottomWidth: 0.25,
    borderColor: colors.white
  },
  text: {
    fontSize: fontSize.mediumHeader,
    textAlign: "left",
    color: colors.black,
    fontFamily: fonts.default,
    marginTop: margins.medium + 5,
    marginLeft: margins.medium
  },
  blueContainerText: {
    fontSize: fontSize.mediumHeader,
    textAlign: "left",
    color: colors.white,
    fontFamily: fonts.default,
    marginTop: margins.medium + 5,
    marginLeft: margins.medium
  }
} );
