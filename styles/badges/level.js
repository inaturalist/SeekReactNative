import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  backgroundColor: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  headerMargins: {
    marginBottom: Platform.OS === "android" ? 19 : 15,
    marginTop: 25
  },
  image: {
    height: height > 640 ? 258 : 215,
    marginTop: height > 570 ? 50 : 30,
    resizeMode: "contain",
    width: height > 640 ? 258 : 215
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: colors.white
  },
  modalBottom: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  modalTop: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  nameText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    marginBottom: height > 570 ? 43 : 30,
    marginTop: 32
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 20,
    marginHorizontal: 40,
    marginTop: 20,
    textAlign: "center"
  }
} );
