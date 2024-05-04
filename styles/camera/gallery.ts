import { StyleSheet } from "react-native";
import {
  colors,
  center,
  row,
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 18,
    position: "absolute",
    zIndex: 1
  },
  background: {
    backgroundColor: colors.white,
    flex: 1
  },
  button: {
    paddingHorizontal: 1,
    paddingTop: 2
  },
  center,
  grayContainer: {
    backgroundColor: colors.lightGray
  },
  header: {
    backgroundColor: colors.white,
    height: 55
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
  buttonImage: {
    padding: 5,
    tintColor: colors.seekForestGreen
  },
  image: {
    height: dimensions.width / 4 - 2,
    width: dimensions.width / 4 - 2
  }
} );

export {
  viewStyles,
  imageStyles
};
