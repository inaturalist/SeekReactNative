import { StyleSheet } from "react-native";

const viewStyles = StyleSheet.create( {
  pressableArea: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 28
  },
  copiedAnimation: {
    zIndex: 1,
    position: "absolute",
    top: -35
  }
} );

export default viewStyles;
