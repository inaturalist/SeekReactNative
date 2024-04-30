import { StyleSheet, I18nManager } from "react-native";
import {
  center,
  colors,
  dimensions,
  padding
} from "../global";

const viewHeaderStyles = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  center,
  container: {
    backgroundColor: colors.seekForestGreen,
    flexDirection: "row",
    paddingBottom: 18,
    paddingTop: 20.5
  },
  help: {
    paddingBottom: 13,
    paddingHorizontal: 21,
    paddingTop: 13,
    position: "absolute",
    right: 0
  }
} );

const textStyles = StyleSheet.create( {
  text: {
    maxWidth: dimensions.width - 100,
    paddingTop: padding.iOSPaddingSmall
  }
} );

export {
  textStyles,
  viewHeaderStyles
};
