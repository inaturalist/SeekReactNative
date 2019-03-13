import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    marginTop: 21,
    marginLeft: 35
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  circleStyle: {
    width: 59,
    height: 59,
    position: "absolute",
    top: 40,
    right: 40
  },
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20
  },
  textContainer: {
    width: 240,
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  leftItem: {
    width: 20,
    alignItems: "center"
  },
  bullets: {
    marginTop: 8,
    fontSize: 27
  },
  checklist: {
    marginTop: 20
  },
  missionText: {
    marginLeft: 10
  },
  text: {
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  greenText: {
    marginTop: 4,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    color: colors.seekForestGreen
  }
} );
