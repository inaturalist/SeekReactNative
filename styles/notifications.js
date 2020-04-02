import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
} from "./global";

export default StyleSheet.create( {
  card: {
    height: 112,
    justifyContent: "flex-start",
    marginHorizontal: 22
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  containerWhite: {
    backgroundColor: colors.white
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1,
    marginHorizontal: 23
  },
  flex: {
    flex: 1
  },
  greenDot: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 11 / 2,
    height: 11,
    width: 11
  },
  image: {
    height: 72,
    marginRight: 24,
    resizeMode: "contain",
    width: 72
  },
  messageText: {
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  row,
  textContainer: {
    width: 214
  },
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 6
  }
} );
