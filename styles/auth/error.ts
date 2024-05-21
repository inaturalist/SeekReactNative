import { StyleSheet } from "react-native";
import {
  colors,
  dimensions,
  row
} from "../global";

const viewStyles = StyleSheet.create( {
  errorMargin: {
    justifyContent: "center",
    marginBottom: dimensions.height > 570 ? 27 : 18,
    marginHorizontal: dimensions.height > 570 ? 34 : 20,
    marginTop: dimensions.height > 570 ? 30 : 21
  },
  row,
  smallerMargin: {
    marginTop: dimensions.height > 570 ? 19 : 10
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 24,
    marginRight: 15,
    resizeMode: "contain",
    tintColor: colors.seekiNatGreen,
    width: 27
  }
} );

export {
  viewStyles,
  imageStyles
};
