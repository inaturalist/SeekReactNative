import { StyleSheet } from "react-native";
import { colors } from "../global";

const maxColumnWidth = 455;

const viewStyles = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white,
  },
  textContainer: {
    paddingHorizontal: 33,
    paddingTop: 21,
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center",
  },
  marginGreenButtonLarge: {
    marginTop: 33,
  },
  marginBottom: {
    marginTop: 48,
  },
} );

const textStyles = StyleSheet.create( {
  header: {
    paddingLeft: 22,
  },
} );

export { viewStyles, textStyles };
