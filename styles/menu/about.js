import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.seekForestGreen
  },
  image: {
    marginBottom: 15
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 22
  },
  boldText: {
    marginBottom: 15,
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 20,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    marginBottom: 15,
    color: colors.black,
    fontFamily: fonts.default,
    fontSize: 16,
    textAlign: "center"
  }
} );
