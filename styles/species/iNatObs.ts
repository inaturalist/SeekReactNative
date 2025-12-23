import { StyleSheet } from "react-native";
import {
  row,
  center,
} from "../global";

const viewStyles = StyleSheet.create( {
  center,
  margin: {
    marginTop: 28,
  },
  row,
  textContainer: {
    marginLeft: 36,
  },
} );

const textStyles = StyleSheet.create( {
  number: {
    marginTop: 7,
  },
} );

const imageStyles = StyleSheet.create( {
  bird: {
    height: 65,
    resizeMode: "contain",
    width: 73,
  },
} );

export {
  textStyles,
  viewStyles,
  imageStyles,
};
