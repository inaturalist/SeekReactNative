import { StyleSheet } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  back: {
    padding: 18,
    position: "absolute",
    right: 23 - 18,
    top: 0
  },
  bottom: {
    backgroundColor: colors.seekForestGreen,
    height: 60
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  }
} );

const textStyles = StyleSheet.create( {
  text: {
    alignSelf: "center",
    top: 19
  }
} );

export {
  viewStyles,
  textStyles
};
