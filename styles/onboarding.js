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
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center"
  },
  banner: {
    height: 150,
    width,
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  image: {
    width: 293,
    height: 232,
    resizeMode: "contain"
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 41,
    marginTop: 21
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: colors.white,
    lineHeight: 35,
    fontFamily: fonts.semibold
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 52
  },
  skip: {
    fontSize: 19,
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
    bottom: 130,
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
