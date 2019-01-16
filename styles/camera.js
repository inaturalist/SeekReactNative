import { StyleSheet } from "react-native";
import { colors, padding, margins } from "./global";

export default StyleSheet.create( {
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.black
  },
  main: {
    flexGrow: 1
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: padding.large
  },
  capture: {
    flex: 0,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderRadius: 100,
    alignItems: "flex-end",
    justifyContent: "center",
    borderColor: colors.darkGray,
    alignSelf: "center",
    width: 50,
    height: 50
  },
  zoomButtons: {
    zIndex: 1,
    marginTop: margins.small,
    marginLeft: margins.medium
  }
} );
