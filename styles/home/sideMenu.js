import { StyleSheet } from "react-native";

import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.seekForestGreen,
    justifyContent: "space-around"
  },
  logo: {
    marginHorizontal: 34,
    width: 223,
    height: 79,
    resizeMode: "contain"
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
  image: {
    marginLeft: 34,
    marginRight: 23,
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  row: {
    marginBottom: 18,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.white
  },
  divider: {
    backgroundColor: "#63d4ab",
    height: 1,
    width: "100%"
  }
} );
