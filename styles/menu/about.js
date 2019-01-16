import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.seekForestGreen
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  headerText: {
    marginTop: 40,
    marginBottom: 13,
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.semibold
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
