import { StyleSheet } from "react-native";
import {
  center,
  row
} from "../global";

const viewStyles = StyleSheet.create( {
  background: {
    height: 223
  },
  center,
  greenButton: {
    paddingTop: 25
  },
  row
} );

const textStyles = StyleSheet.create( {
  text: {
    marginLeft: 12,
    maxWidth: 245,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
