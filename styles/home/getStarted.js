import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    marginTop: 21,
    marginLeft: 22
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  textContainer: {
    marginLeft: 22,
    marginRight: 22,
    marginTop: 21
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  image: {
    width: 56,
    height: 56
  },
  text: {
    maxWidth: 245,
    fontFamily: fonts.book,
    fontSize: fontSize.smallText,
    lineHeight: 20,
    marginHorizontal: 12
  }
} );
