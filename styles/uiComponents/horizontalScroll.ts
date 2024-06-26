import { StyleSheet, I18nManager } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  leftArrow: {
    left: 0,
    paddingLeft: 5,
    paddingRight: 20,
    paddingVertical: 20,
    position: "absolute",
    top: 1010,
    zIndex: 1
  },
  rightArrow: {
    paddingLeft: 20,
    paddingRight: 5,
    paddingVertical: 20,
    position: "absolute",
    right: 0,
    top: 1010,
    zIndex: 1
  },
  rotate: {
    transform: [{ rotate: I18nManager.isRTL ? "0deg" : "180deg" }]
  },
  rotateRTL: {
    transform: [{ rotate: I18nManager.isRTL ? "180deg" : "0deg" }]
  },
  speciesLeftArrow: {
    top: 100
  },
  speciesPhotoContainer: {
    backgroundColor: colors.black
  },
  speciesRightArrow: {
    top: 100
  },
  yearInReviewArrow: {
    top: 70
  },
  bigContainer: {
    height: 375
  },
  smallContainer: {
    height: 250
  }
} );

export default viewStyles;
