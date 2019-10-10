import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  button: {
    marginBottom: 21,
    marginHorizontal: 29,
    marginTop: height > 570 ? 21 : 10
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 40
  },
  contentContainer: {
    alignItems: "center",
    marginHorizontal: 29,
    marginTop: height > 570 ? 10 : 0
  },
  headerMargin: {
    alignSelf: "center",
    marginTop: 30
  },
  image: {
    height: 68,
    marginRight: 24,
    resizeMode: "contain",
    width: 68
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: height > 570 ? 100 : 120
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
