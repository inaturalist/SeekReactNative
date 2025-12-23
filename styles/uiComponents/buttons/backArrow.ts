import { StyleSheet, I18nManager } from "react-native";
import { colors } from "../../global";

const viewStyles = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  challengeDetails: {
    paddingTop: 28,
  },
  rotateRTL: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
} );

const imageStyles = StyleSheet.create( {
  green: {
    tintColor: colors.seekForestGreen,
  },
} );

export {
  imageStyles,
  viewStyles,
};
