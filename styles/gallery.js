import { Dimensions, StyleSheet } from "react-native";

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
    paddingTop: 20,
    flex: 1
  },
  button: {
    paddingHorizontal: 1,
    paddingTop: 2
  },
  image: {
    width: width / 4 - 2,
    height: width / 4 - 2
  }
} );
