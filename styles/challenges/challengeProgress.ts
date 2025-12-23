import { StyleSheet } from "react-native";
import {
  row,
  dimensions,
} from "../global";

const { height, width } = dimensions;

const viewStyles = StyleSheet.create( {
  card: {
    paddingVertical: 12,
  },
  row,
  startButton: {
    alignItems: "center",
    width: 59,
    marginHorizontal: height > 570 ? 25 : 10,
  },
  textContainer: {
    width: height > 570 ? width - ( 110 * 2 ) : 170,
  },
} );

const textStyles = StyleSheet.create( {
  messageText: {
    fontSize: 13,
    lineHeight: 21,
  },
  startText: {
    textAlign: "center",
  },
  titleText: {
    marginBottom: 1,
  },
} );

const imageStyles = StyleSheet.create( {
  challengeBadgeIcon: {
    height: 60,
    marginHorizontal: height > 570 ? 25 : 10,
    resizeMode: "contain",
    width: 60,
  },
} );

export {
  textStyles,
  viewStyles,
  imageStyles,
};
