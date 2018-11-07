import { Dimensions, StyleSheet } from "react-native";
import { colors, padding } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.lightGray,
    height,
    width,
    flexDirection: "column"
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  gallery: {
    flex: 4
  },
  button: {
    paddingHorizontal: padding.extraSmall,
    paddingTop: padding.small
  },
  image: {
    width: width / 4 - 2,
    height: width / 4 - 2
  }
} );
