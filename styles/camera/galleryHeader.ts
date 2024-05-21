import { StyleSheet } from "react-native";
import { baseTextStyles } from "../textStyles";

const pickerContainer = {
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "nowrap",
  paddingHorizontal: 30
};

const viewStyles = StyleSheet.create( {
  inputIOSContainer: pickerContainer,
  viewContainer: {
    alignItems: "center"
  },
  inputAndroidContainer: pickerContainer,
  carot: {
    marginRight: 15
  },
  inputIOS: baseTextStyles.picker,
  inputAndroid: baseTextStyles.picker
} );

export default viewStyles;
