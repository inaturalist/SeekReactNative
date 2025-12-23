import { StyleSheet } from "react-native";
import {
  center,
} from "../global";

const viewStyles = StyleSheet.create( {
  center,
  noChallengeContainer: {
    paddingBottom: 49,
    paddingTop: 24,
  },
} );

const textStyles = StyleSheet.create( {
  lightText: {
    fontSize: 15,
    lineHeight: 18,
    marginTop: 10,
    textAlign: "center",
    width: 229,
  },
  noChallengeText: {
    textAlign: "center",
    width: 229,
  },
} );

export {
  viewStyles,
  textStyles,
};
