import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1
  },
  header: {
    width: 100
  },
  headerText: {
    fontSize: fontSize.header,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
  },
  text: {
    fontSize: fontSize.text,
    lineHeight: 14,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap"
  },
  button: {
    backgroundColor: colors.darkGreen,
    justifyContent: "flex-end",
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.button,
    fontSize: fontSize.button,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center"
  }
} );
