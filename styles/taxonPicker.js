import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  header: {
    justifyContent: "flex-start"
  },
  gridContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  imageCell: {
    paddingHorizontal: 1,
    paddingTop: 2,
    width: width / 3 - 2,
    height: width / 3 - 2
  },
  image: {
    backgroundColor: "#37535e",
    width: "50%",
    height: "50%"
  }
} );
