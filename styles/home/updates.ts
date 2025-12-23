import { StyleSheet } from "react-native";
import { center, colors, row } from "../global";

const viewStyles = StyleSheet.create( {
  center,
  container: {
    backgroundColor: colors.white,
  },
  header: {
    paddingBottom: 21,
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  row,
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 68,
    marginRight: 28,
    resizeMode: "contain",
    width: 68,
  },
} );

const textStyles = StyleSheet.create( {
  text: {
    marginTop: 11,
  },
  textWidth: {
    width: 215,
  },
} );

export {
  viewStyles,
  imageStyles,
  textStyles,
};
