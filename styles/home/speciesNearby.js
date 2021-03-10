// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row,
  padding
} from "../global";

export default StyleSheet.create( {
  buttonText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1,
    paddingTop: padding.iOSButtonPadding
  },
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.seekForestGreen
  },
  header: {
    marginBottom: 22,
    marginLeft: 23,
    marginTop: 23
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  image: {
    height: 21,
    marginLeft: 10,
    marginRight: 13,
    resizeMode: "contain",
    tintColor: colors.white,
    width: 16
  },
  marginBottom: {
    marginBottom: 23
  },
  marginLeft: {
    marginLeft: 22
  },
  paddingBottom: {
    paddingBottom: 15
  },
  paddingTop: {
    paddingTop: 15
  },
  row,
  speciesNearbyContainer: {
    backgroundColor: colors.speciesNearbyGreen,
    height: 223
  },
  speciesNearbyPadding: {
    backgroundColor: colors.seekForestGreen,
    paddingBottom: 20
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingBottom: 4,
    paddingHorizontal: 9,
    paddingTop: 4
  },
  locationPickerButton: {
    paddingBottom: 15,
    marginLeft: 22
  }
} );
