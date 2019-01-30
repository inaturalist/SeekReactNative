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
    width: 310,
    justifyContent: "center",
    alignItems: "center",
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
