import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  bullets: {
    fontSize: 27,
    marginTop: 8
  },
  checklist: {
    marginTop: 20
  },
  circleStyle: {
    height: 59,
    position: "absolute",
    right: 0,
    top: 39,
    width: 59
  },
  // circleText: {
  //   fontFamily: fonts.book,
  //   fontSize: 20
  // },
  container: {
    marginBottom: 20,
    marginTop: 21
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4
  },
  leftItem: {
    alignItems: "center",
    marginRight: 21,
    width: 20
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 16,
    width: 205
  }
} );
