import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  backgroundImage: {
    width,
    height
  },
  gallery: {
    paddingTop: 20,
    flex: 1
  },
  scroll: {
    flexWrap: "wrap",
    flexDirection: "row"
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
