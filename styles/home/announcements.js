// @flow

import { StyleSheet } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white
  },
  marginGreenButtonLarge: {
    marginTop: 33
  },
  marginBottom: {
    marginTop: 48
  }
} );

const textStyles = StyleSheet.create( {
  header: {
    paddingLeft: 22,
    paddingBottom: 21
  }
} );

export { viewStyles, textStyles };
