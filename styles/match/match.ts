import { StyleSheet } from "react-native";
import {
  colors,
  center,
  dimensions
} from "../global";

const landscapeImageHeight = 315;

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 28,
    position: "absolute",
    zIndex: 1
  },
  buttonBlue: {
    backgroundColor: colors.seekTeal
  },
  center,
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  flex: {
    flex: 0
  },
  header: {
    height: 152,
    overflow: "visible"
  },
  headerText: {
    marginBottom: 24,
    textAlign: "center"
  },
  imageCell: {
    borderRadius: 150 / 2,
    height: 150,
    width: 150
  },
  landscapeImage: {
    height: landscapeImageHeight,
    width: landscapeImageHeight,
    borderRadius: landscapeImageHeight / 2
  },
  imageContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    marginTop: 44
  },
  linkText: {
    marginBottom: 28,
    alignSelf: "center"
  },
  marginLarge: {
    marginTop: 70
  },
  marginLandscape: {
    marginTop: 37
  },
  marginLeft: {
    marginLeft: dimensions.width < 350 ? 15 : 47
  },
  largeMargin: {
    marginLeft: dimensions.width * 0.35
  },
  marginMedium: {
    marginBottom: 28
  },
  socialIcon: {
    right: 0,
    paddingVertical: 28,
    paddingHorizontal: 23,
    position: "absolute"
  },
  speciesText: {
    marginBottom: 22,
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  },
  textContainer: {
    alignSelf: "center",
    marginHorizontal: 41,
    maxWidth: 317
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flexGrow: 1
  }
} );
