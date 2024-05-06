import { StyleSheet, Dimensions } from "react-native";
import { colors, row } from "../global";

const { width, height } = Dimensions.get( "window" );

const viewStyles = StyleSheet.create( {
  howText: {
    marginRight: 36,
    width: height > 570 ? 192 : 140
  },
  row,
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    marginTop: 20
  },
  tipContainer: {
    width: height > 570 ? 260 : 230
  },
  tips: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 11
  }
} );

const textStyles = StyleSheet.create( {
  bullets: {
    fontSize: 26,
    lineHeight: 21,
    marginLeft: 13,
    marginRight: 20,
    marginTop: 3
  },
  headerText: {
    marginBottom: 11,
    marginTop: 35
  }
} );

const imageStyles = StyleSheet.create( {
  topImage: {
    height: width / 2.5,
    resizeMode: "cover",
    width
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
