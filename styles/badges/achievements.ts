import { StyleSheet } from "react-native";
import {
  colors,
  center,
  row,
  dimensions,
} from "../global";

const badgeIconWidth = Math.min( 455, dimensions.width ) / 4;

const viewStyles = StyleSheet.create( {
  center,
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
  },
  containerWhite: {
    backgroundColor: colors.white,
  },
  gridRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  margin: {
    marginTop: 12,
  },
  marginLarge: {
    marginTop: 42,
  },
  row,
  secondHeaderText: {
    marginHorizontal: 23,
    maxWidth: 150,
  },
  header: {
    minHeight: 117 + 25 + 26,
  },
  textContainer: {
    marginLeft: 22,
    paddingBottom: 26,
    paddingTop: 25,
    width: 167,
  },
  loginCardMargin: {
    marginTop: 32,
  },
  imageContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: badgeIconWidth * 3 + 12 * 3,
  },
} );

const textStyles = StyleSheet.create( {
  lightText: {
    marginBottom: 10,
  },
  number: {
    fontSize: 21,
    marginTop: 10,
    textAlign: "center",
  },
  text: {
    marginTop: 7,
  },
} );

const imageStyles = StyleSheet.create( {
  badgeIcon: {
    height: badgeIconWidth,
    resizeMode: "contain",
    width: badgeIconWidth,
    marginHorizontal: 6,
  },
  levelImage: {
    height: 117,
    resizeMode: "contain",
    width: 117,
  },
} );

export {
  imageStyles,
  viewStyles,
  textStyles,
};
