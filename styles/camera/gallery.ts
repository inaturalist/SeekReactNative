import { StyleSheet } from "react-native";
import {
  row,
  dimensions,
} from "../global";

const viewStyles = StyleSheet.create( {
  button: {
    paddingHorizontal: 1,
    paddingTop: 2,
  },
  margin: {
    marginLeft: 15,
  },
  row,
  padding: {
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: dimensions.width / 4 - 2,
    width: dimensions.width / 4 - 2,
  },
} );

export {
  viewStyles,
  imageStyles,
};
