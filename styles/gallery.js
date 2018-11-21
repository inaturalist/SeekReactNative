import { Dimensions, StyleSheet } from "react-native";
import { colors, padding } from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  galleryContainer: {
    flex: 1,
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
