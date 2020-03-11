import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

export default StyleSheet.create( {
  buttonText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
  container: {
    backgroundColor: colors.seekForestGreen
  },
  header: {
    marginLeft: 22,
    marginTop: 21
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  image: {
    height: 21,
    marginRight: 13,
    resizeMode: "contain",
    width: 16
  },
  marginBottom: {
    marginBottom: 7
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
    height: 231
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderRadius: 6,
    height: 29,
    justifyContent: "center",
    paddingHorizontal: 9
  }
} );
