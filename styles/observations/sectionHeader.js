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
  headerRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginVertical: 10
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginTop: 4
  },
  margin: {
    marginLeft: 19
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
