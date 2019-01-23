import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  innerContainer: {
    borderRadius: 40,
    backgroundColor: colors.white
  },
  badgeHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  badgeImage: {
    marginTop: 15,
    marginBottom: 15,
    height: height > 570 ? 180 : 120,
    width: "auto",
    resizeMode: "contain"
  },
  headerText: {
    marginTop: height > 570 ? 16 : 14,
    textAlign: "center",
    fontSize: height > 570 ? 17 : 15,
    fontFamily: fonts.semibold,
    color: colors.black,
    lineHeight: height > 570 ? 24 : 22
  },
  textContainer: {
    marginHorizontal: 27,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    marginTop: height > 570 ? 16 : 14,
    fontFamily: fonts.book,
    fontSize: height > 570 ? 16 : 14,
    lineHeight: height > 570 ? 21 : 19,
    color: colors.black
  },
  logo: {
    marginTop: height > 570 ? 20 : 18,
    marginBottom: height > 570 ? 20 : 18,
    height: 61,
    width: 200,
    resizeMode: "contain"
  },
  backButton: {
    alignItems: "flex-end",
    padding: 10,
    marginRight: 20,
    marginTop: 20
  }
} );
