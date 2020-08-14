import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  bullets: {
    fontSize: 29,
    marginTop: 7
  },
  subBullets: {
    marginTop: 14,
    marginRight: 10
  },
  checklist: {
    marginTop: 19
  },
  circleStyle: {
    height: 59,
    width: 59
  },
  container: {
    marginBottom: 20,
    marginTop: 36
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.medium,
    marginTop: 4
  },
  leftItem: {
    alignItems: "center",
    marginRight: 22
  },
  missionRow: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  secondLevelBulletText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 5,
    maxWidth: 274
  },
  subBulletContainer: {
    marginLeft: 22
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 16,
    maxWidth: 274
  },
  textContainer: {
    flex: 1,
    paddingRight: 18
  }
} );
