import { StyleSheet, I18nManager } from "react-native";
import { colors } from "../../global";

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  challengeDetails: {
    paddingTop: 28
  },
  green: {
    tintColor: colors.seekForestGreen
  },
  rotateRTL: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  }
} );
