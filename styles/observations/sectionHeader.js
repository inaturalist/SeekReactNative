import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

export default StyleSheet.create( {
  badge: {
    height: 25,
    marginLeft: 10,
    resizeMode: "contain",
    width: 22
  },
  empty: {
    marginRight: -1
  },
  header: {
    height: 39,
    justifyContent: "space-between",
    marginHorizontal: 24
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginTop: Platform.OS === "ios" ? 6 : 0
  },
  margin: {
    marginLeft: 15,
    transform: [{ rotate: "270deg" }]
  },
  marginOpen: {
    marginLeft: 15
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.78,
    marginTop: Platform.OS === "ios" ? 4 : 0
  },
  row
} );
