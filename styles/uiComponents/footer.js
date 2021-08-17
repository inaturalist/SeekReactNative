// @flow

import { StyleSheet, Platform } from "react-native";

import { colors, row } from "../global";

import type { ViewStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  camera: {
    marginBottom: Platform.OS === "android" ? 10 : 50,
    marginLeft: 8
  },
  cameraImage: {
    height: Platform.OS === "android" ? 84 : 94,
    width: Platform.OS === "android" ? 84 : 94
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.20,
    shadowRadius: 2
  },
  container: {
    height: 74,
    justifyContent: "flex-end"
  },
  flagPadding: {
    padding: 26,
    right: 10
  },
  leftIcon: {
    left: 10,
    padding: 20
  },
  navbar: {
    backgroundColor: colors.white,
    height: 70,
    justifyContent: "space-between"
  },
  notificationPadding: {
    padding: 24,
    right: 10
  },
  rightIcon: {
    padding: 20,
    right: 10
  },
  row,
  safeArea: {
    // need this for MatchFooter
    backgroundColor: colors.white
  }
} );


const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  bird: {
    height: 33,
    resizeMode: "contain",
    tintColor: colors.seekForestGreen,
    width: 37
  }
} );

export {
  viewStyles,
  imageStyles
};
