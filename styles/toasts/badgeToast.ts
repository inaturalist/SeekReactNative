import { StyleSheet } from "react-native";
import { colors, dimensions } from "../global";

const viewStyles = StyleSheet.create( {
  animatedStyle: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  progress: {
    height: 59,
    position: "absolute",
    right: 24,
    width: 59,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 21,
    backgroundColor: colors.white,
  },
  topContainer: {
    zIndex: 1,
  },
} );

const textStyles = StyleSheet.create( {
  description: {
    marginTop: 1,
  },
  headerText: {
    marginTop: 16,
    maxWidth: dimensions.width - 59 - ( 24 * 2 ),
  },
  view: {
    marginTop: 8,
    marginBottom: 21,
  },
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 75,
    width: 75,
    resizeMode: "contain",
    position: "absolute",
    right: 17,
  },
} );

export {
  viewStyles,
  textStyles,
  imageStyles,
};
