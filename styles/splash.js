import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around"
  },
  banner: {
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 106,
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    width
  },
  header: {
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 18,
    letterSpacing: 5.62,
    marginTop: 20
  },
  image: {
    height: 80,
    resizeMode: "contain",
    width: 202
  },
  logo: {
    height: 113,
    marginBottom: 25,
    resizeMode: "contain",
    width: 300
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
    marginHorizontal: 35,
    textAlign: "center"
  }
} );
