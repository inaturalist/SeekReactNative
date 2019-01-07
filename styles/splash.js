import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "./global";

export default StyleSheet.create( {
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  banner: {
    marginTop: 48,
    height: 106,
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap",
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  headerText: {
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
    marginBottom: 25,
    marginHorizontal: 35
  }
} );
