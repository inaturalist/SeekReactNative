import { StyleSheet } from "react-native";
import {
  colors,
} from "../../global";

const maxColumnWidth = 455;

const viewStyles = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white,
  },
  marginGreenButton: {
    marginTop: 22,
  },
  marginGreenButtonLarge: {
    marginTop: 33,
  },
  marginBottom: {
    marginTop: 48,
  },
  textContainer: {
    paddingHorizontal: 33,
    paddingTop: 21,
  },
  paddingAboveText: {
    paddingTop: 15,
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center",
  },
} );

const textStyles = StyleSheet.create( {
  header: {
    paddingLeft: 22,
  },
} );

export {
  textStyles,
  viewStyles,
};
