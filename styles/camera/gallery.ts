import { StyleSheet } from "react-native";
import {
  colors,
  row,
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    flex: 1
  },
  button: {
    paddingHorizontal: 1,
    paddingTop: 2
  },
  grayContainer: {
    backgroundColor: colors.lightGray
  },
  margin: {
    marginLeft: 15
  },
  row,
  padding: {
    paddingVertical: 15,
    paddingHorizontal: 50
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: dimensions.width / 4 - 2,
    width: dimensions.width / 4 - 2
  }
} );

export {
  viewStyles,
  imageStyles
};
