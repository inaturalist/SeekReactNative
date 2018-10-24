import { Dimensions, StyleSheet } from "react-native";
import { padding } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    height
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
