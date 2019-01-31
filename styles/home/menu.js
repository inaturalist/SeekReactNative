import { StyleSheet } from "react-native";

import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.darkGray
  },
  column: {
    flex: 1,
    backgroundColor: colors.seekForestGreen,
    width: 300,
    flexDirection: "column"
  },
  image: {
    marginTop: 22,
    marginLeft: 22,
    marginBottom: 22,
    width: 221,
    height: 82,
    resizeMode: "contain"
  },
  textContainer: {
    marginLeft: 22,
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  text: {
    marginBottom: 22,
    marginRight: 4,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 0.5,
    color: colors.white
  }
} );
