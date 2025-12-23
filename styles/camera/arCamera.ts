import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../global";

const { height } = Dimensions.get( "window" );

const viewStyles = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 19,
    position: "absolute",
    top: height > 700 ? 31 : 0,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  settingsButton: {
    right: 0,
    paddingHorizontal: 23,
    paddingVertical: 19,
    position: "absolute",
    top: height > 700 ? 31 : 0,
  },
  camera: {
    zIndex: -1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black,
    flex: 1,
  },
} );

const imageStyles = StyleSheet.create( {
  settingsIcon: {
    tintColor: colors.white,
    height: 20,
    width: 20,
  },
} );

export {
  viewStyles,
  imageStyles,
};
