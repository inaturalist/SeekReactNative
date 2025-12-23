import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  row,
} from "../global";

const { height } = Dimensions.get( "window" );

const viewStyles = StyleSheet.create( {
  button: {
    marginBottom: 21,
    marginHorizontal: 29,
    marginTop: 21,
  },
  container: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 40,
    maxWidth: 366,
  },
  headerMargin: {
    alignSelf: "center",
    marginTop: 30,
  },
  margin: {
    marginHorizontal: 29,
  },
  marginMiddle: {
    marginTop: height > 570 ? 28 : 10,
  },
  marginTop: {
    marginTop: 10,
  },
  row,
  textContainer: {
    maxWidth: height > 570 ? 194 : 150,
  },
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 68,
    marginRight: 24,
    resizeMode: "contain",
    width: 68,
  },
} );

export {
  viewStyles,
  imageStyles,
};
