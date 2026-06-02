import { Platform, StyleSheet } from "react-native";

import { enabledLargeFonts } from "../../../utility/textHelpers";
import {
  center,
  colors,
  dimensions,
} from "../../global";

const viewStyles = StyleSheet.create( {
  button: {
    backgroundColor: colors.red,
    borderRadius: 40,
    height: enabledLargeFonts() ? 79 : 46,
    width: 243,
  },
  center,
  extraPadding: {
    paddingHorizontal: 26,
  },
  largeButton: {
    height: 79,
    width: 278,
  },
  login: {
    maxWidth: 317,
    width: dimensions.width - 70,
  },
} );

const textStyles = StyleSheet.create( {
  buttonText: {
    paddingTop: Platform.OS === "ios" ? 3 : 0,
    textAlign: "center",
  },
} );

export {
  textStyles,
  viewStyles,
};
