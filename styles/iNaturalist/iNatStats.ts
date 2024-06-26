import { StyleSheet, Platform } from "react-native";
import {
  colors,
  center,
  dimensions,
  row
} from "../global";

const largeIconWidth = 94;
const smallIconWidth = 58;

const landscapeMaxWidth = 455;

const viewStyles = StyleSheet.create( {
  center,
  textContainer: {
    marginHorizontal: 27
  },
  tabletContainer: {
    width: landscapeMaxWidth,
    alignSelf: "center"
  },
  landscapeContainerLargeIcon: {
    width: landscapeMaxWidth - largeIconWidth
  },
  appIconSubHeader: {
    marginLeft: 27
  },
  photoMargins: {
    marginVertical: 33
  },
  secondHeader: {
    marginTop: 23,
    marginBottom: 10
  },
  row,
  greenButtonMargins: {
    paddingTop: 17,
    paddingBottom: 42
  },
  sectionMargin: {
    marginTop: 33
  },
  smallSectionMargin: {
    marginTop: 7
  },
  linearGradient: {
    height: Platform.OS === "android" ? 225 : 152
  },
  loggedInHeaderMargin: {
    marginTop: 30 - 12
  },
  linearGradientTextContainer: {
    marginLeft: 16,
    marginVertical: 29
  },
  errorImage: {
    marginEnd: 20
  }
} );

const textStyles = StyleSheet.create( {
  secondHeaderText: {
    width: dimensions.width - ( 27 * 2 ) - smallIconWidth - 18,
    marginLeft: 18
  },
  smallerTextWidth: {
    width: dimensions.width - ( 27 * 2 ) - largeIconWidth - 26,
    marginLeft: 26
  },
  caption: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    width: 245
  },
  loginLogoutText: {
    marginTop: 19,
    marginBottom: 33
  },
  everydayObs: {
    marginTop: 16
  },
  lightText: {
    marginBottom: 2
  },
  loginNameText: {
    marginBottom: 6,
    marginTop: 11,
    width: 195
  },
  whiteText: {
    color: colors.white,
    width: 195
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 286,
    resizeMode: "cover",
    width: dimensions.width
  },
  largeIcon: {
    width: largeIconWidth,
    height: largeIconWidth
  },
  smallIcon: {
    width: smallIconWidth,
    height: smallIconWidth
  },
  profileIcon: {
    height: 86,
    width: 86,
    borderRadius: 86 / 2
  },
  iNatBadge: {
    position: "absolute",
    right: -8,
    bottom: -8,
    zIndex: 1
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
