import { Dimensions, StyleSheet } from "react-native";
import { colors, padding } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  galleryContainer: {
    height,
    backgroundColor: colors.lightGray
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row"
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
