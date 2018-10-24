import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "15%"
  },
  headerText: {
    marginTop: "15%",
    fontSize: fontSize.header,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
  },
  gridContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  imageCell: {
    width: width / 3 - 2,
    height: width / 3 - 2
  },
  image: {
    backgroundColor: colors.darkBlue,
    width: "80%",
    height: "80%"
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    color: colors.white
  }
} );
