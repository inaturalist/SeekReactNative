import { StyleSheet } from "react-native";
import { row, center, dimensions } from "../global";

// added decimal because this was going off the screen on Android Pixel 4
const badgeIconWidth = Math.min( 455, dimensions.width ) / 4.0005;
const landscapeMaxWidth = 455;

const viewStyles = StyleSheet.create( {
  header: {
    minHeight: 136 + 25 + 26,
  },
  center,
  row,
  levelTextContainer: {
    marginLeft: 22,
    paddingBottom: 26,
    paddingTop: 25,
    width: 170,
  },
  badgesTextContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: badgeIconWidth * 3 + 12 * 3,
  },
  badgeTextContainer: {
    width: badgeIconWidth,
    marginHorizontal: 6,
  },
  textContainer: {
    marginHorizontal: 26,
  },
  tabletContainer: {
    width: landscapeMaxWidth,
    alignSelf: "center",
  },
  map: {
    height: 189,
    marginBottom: 20,
  },
  divider: {
    height: 45,
  },
  smallDivider: {
    height: 18,
  },
} );

const textStyles = StyleSheet.create( {
  lightText: {
    marginBottom: 10,
  },
  center: {
    textAlign: "center",
  },
  caption: {
    marginTop: 16,
    textAlign: "center",
    maxWidth: 245,
  },
} );

const imageStyles = StyleSheet.create( {
  levelImage: {
    resizeMode: "contain",
    height: 136,
    width: 136,
  },
  image: {
    height: 186,
    width: dimensions.width,
    resizeMode: "cover",
  },
} );


export { viewStyles, textStyles, imageStyles };
