import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  carousel: {
    height: 330,
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    marginHorizontal: 72,
    width: 56 * 2,
    height: 43 * 2
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 41,
    marginTop: 42
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    color: colors.white,
    lineHeight: 35,
    fontFamily: fonts.semibold
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 34
  },
  skip: {
    fontSize: 22,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.light,
    textDecorationLine: "underline"
  },
  fullScreen: {
    width,
    height
  },
  pagination: {
    position: "absolute",
    bottom: 110,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  dot: {
    backgroundColor: colors.darkGray,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 16,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: colors.white
  }
} );
