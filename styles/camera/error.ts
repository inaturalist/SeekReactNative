import { StyleSheet } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
  },
} );

const textStyles = StyleSheet.create( {
  errorText: {
    marginHorizontal: 41,
    textAlign: "center",
  },
} );

export {
  textStyles,
  viewStyles,
};

