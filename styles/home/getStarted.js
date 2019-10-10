import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  button: {
    marginHorizontal: 23,
    marginTop: 7
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 40
  },
  contentContainer: {
    alignItems: "center",
    marginHorizontal: 29,
    marginTop: 21
  },
  headerMargin: {
    marginTop: 30
  },
  image: {
    height: 68,
    marginRight: 24,
    resizeMode: "contain",
    width: 68
  },
  margin: {
    marginTop: 21
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 28,
    marginHorizontal: 23
  },
  text: {
    fontFamily: fonts.book,
    fontSize: height > 570 ? 16 : 14,
    lineHeight: 21,
    maxWidth: height > 570 ? 194 : 150
  },
  textContainer: {
    width: 194
  }
} );
