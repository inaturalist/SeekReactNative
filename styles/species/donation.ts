import { StyleSheet } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  back: {
    padding: 18,
    position: "absolute",
    right: 23 - 18,
    top: 0,
  },
  bottom: {
    backgroundColor: colors.seekForestGreen,
    height: 60,
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55,
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  selectedPressableArea: {
    backgroundColor: "rgb(176, 196, 222)",
  },
} );

const textStyles = StyleSheet.create( {
  text: {
    alignSelf: "center",
    top: 19,
  },
  blackText: {
    paddingHorizontal: 24,
    paddingTop: 24,
    textAlign: "center",
  },
  donateText: {
    top: 19,
    paddingHorizontal: 24,
    marginVertical: 14,
    paddingVertical: 10,
    alignSelf: "center",
    textAlign: "center",
  },
} );

export {
  viewStyles,
  textStyles,
};
