import { StyleSheet } from "react-native";
import {
  colors,
  row,
  center,
} from "../global";

const viewStyles = StyleSheet.create( {
  center,
  marginMiddle: {
    marginRight: 29,
  },
  row,
} );

const textStyles = StyleSheet.create( {
  challengeHeader: {
    marginHorizontal: 31,
  },
  challengeName: {
    marginTop: 5,
    marginHorizontal: 31,
  },
  longText: {
    fontSize: 13,
    lineHeight: 21,
  },
  text: {
    textAlign: "center",
  },
  badgeText: {
    maxWidth: 178,
  },
} );

const imageStyles = StyleSheet.create( {
  white: {
    tintColor: colors.white,
  },
  badge: {
    height: 105,
    resizeMode: "contain",
    width: 105,
  },
  badgeSmall: {
    height: 79,
    resizeMode: "contain",
    width: 79,
  },
} );

export {
  viewStyles,
  textStyles,
  imageStyles,
};

