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
    top: 42,
    width: 59
  },
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4
  },
  header: {
    marginTop: 21
  },
  leftItem: {
    alignItems: "center",
    width: 20
  },
  missionText: {
    marginLeft: 10,
    width: 205
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
    marginTop: 16
  },
  textContainer: {
    marginBottom: 20,
    width: 240
  }
} );
