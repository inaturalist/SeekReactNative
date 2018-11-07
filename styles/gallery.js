import { Dimensions, StyleSheet } from "react-native";
import { colors, padding } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  background: {
    flex: 1,
    width,
    height,
    backgroundColor: colors.lightGray
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  gallery: {
    flex: 6
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
