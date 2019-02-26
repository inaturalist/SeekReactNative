import { StyleSheet, Dimensions } from "react-native";

import { colors, fonts, padding } from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.seekForestGreen,
    justifyContent: "flex-start"
  },
  logo: {
    marginTop: 40,
    marginHorizontal: 34,
    width: 223,
    height: 79,
    resizeMode: "contain"
  },
  textContainer: {
    marginTop: 40,
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
    height: ( width > 350 ) ? 75 : 45,
    width: 300,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  text: {
    paddingTop: padding.iOSPadding,
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
