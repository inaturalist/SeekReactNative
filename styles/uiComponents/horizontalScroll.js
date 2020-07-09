import { StyleSheet, I18nManager } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  leftArrow: {
    left: 0,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 20,
    paddingTop: 20,
    position: "absolute",
    top: 117,
    zIndex: 1
  },
  photoContainer: {
    height: 375
  },
  rightArrow: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 5,
    paddingTop: 20,
    position: "absolute",
    right: 0,
    top: 117,
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
    backgroundColor: colors.black,
    height: 250
  },
  speciesRightArrow: {
    top: 100
  }
} );
