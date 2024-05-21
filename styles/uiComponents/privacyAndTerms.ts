import { StyleSheet } from "react-native";

import {
  row,
  center
} from "../global";

const viewStyles = StyleSheet.create( {
  center,
  marginLeft: {
    marginLeft: 14
  },
  row
} );

const textStyles = StyleSheet.create( {
  textLink: {
    fontSize: 16,
    marginTop: 26,
    textDecorationLine: "underline"
  },
  signupTextLink: {
    marginTop: 23,
    textAlign: "center",
    textDecorationLine: "underline"
  }
} );

export {
  viewStyles,
  textStyles
};
