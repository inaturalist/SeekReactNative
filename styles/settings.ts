import { StyleSheet } from "react-native";
import {
  colors,
  row,
  center,
  padding,
  dimensions
} from "./global";
import { baseTextStyles } from "./textStyles";

const { width } = dimensions;

const greenButton = {
  ...baseTextStyles.button,
  backgroundColor: colors.seekForestGreen,
  borderRadius: 6,
  paddingBottom: 11,
  paddingHorizontal: 18,
  textAlign: "center" as const,
  paddingTop: 12
};

const buttonContainer = {
  paddingVertical: 19,
  alignItems: "center" as const
};

const viewStyles = StyleSheet.create( {
  center,
  checkBox: {
    paddingRight: 10.3
  },
  checkboxRow: {
    marginTop: 17
  },
  leftMargin: {
    marginBottom: 5,
    marginLeft: 10
  },
  margin: {
    marginTop: 35
  },
  marginGreenButton: {
    marginTop: 19
  },
  marginHorizontal: {
    justifyContent: "space-between",
    marginHorizontal: 28
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  },
  marginMedium: {
    marginTop: 22
  },
  marginSmall: {
    marginTop: 15
  },
  marginTop: {
    marginTop: 24
  },
  padding: {
    paddingTop: padding.iOSPaddingSmall
  },
  radioButtonSmallMargin: {
    paddingTop: 19 / 2
  },
  radioMargin: {
    paddingVertical: 19 / 2,
    paddingLeft: 20
  },
  donateMarginBottom: {
    paddingTop: 35 - 19
  },
  radioButtonMarginBottom: {
    paddingTop: 35 - ( 19 / 2 )
  },
  row,
  switch: {
    paddingVertical: 19 / 2,
    marginRight: 16
  },
  inputIOS: greenButton,
  inputIOSContainer: buttonContainer,
  inputAndroid: greenButton,
  inputAndroidContainer: buttonContainer
} );

const textStyles = StyleSheet.create( {
  seasonalityRadioButtonText: {
    maxWidth: width - ( 28 * 2 ) - 30 - 10.3,
    marginTop: -3
  },
  autoCaptureText: {
    paddingTop: padding.iOSPaddingSmall,
    maxWidth: width - ( 28 * 2 ) - 30 - 10.3
  }
} );

export {
  textStyles,
  viewStyles
};
