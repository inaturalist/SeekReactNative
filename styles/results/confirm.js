import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  footer: {
    marginHorizontal: 23,
    marginTop: 20
  },
  header: {
    backgroundColor: colors.white,
    height: 62
  },
  headerText: {
    alignSelf: "center",
    marginTop: -3
  },
  image: {
    height: height / 3 * 2,
    resizeMode: "contain",
    width
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.black,
    justifyContent: "center"
  },
  loadingWheel: {
    position: "absolute",
    top: "50%",
    zIndex: 1
  },
  safeViewTop: {
    backgroundColor: colors.white,
    flex: 0
  }
} );
