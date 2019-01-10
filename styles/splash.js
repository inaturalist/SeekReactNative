import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  banner: {
    height: 106,
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
    width: 202,
    height: 80
  },
  headerText: {
    marginTop: 20,
    fontFamily: fonts.book,
    fontSize: fontSize.header,
    color: colors.white,
    letterSpacing: 5
  },
  text: {
    fontSize: 17,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.default,
    marginHorizontal: 35
  },
  logo: {
    width: 300,
    height: 113,
    resizeMode: "contain",
    marginBottom: 25
  }
} );
