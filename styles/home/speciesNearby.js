import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  buttonContainer: {
    marginBottom: 15,
    marginLeft: 22,
    marginTop: 30
  },
  buttonRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 15
  },
  buttonText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    height: 422
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
  speciesNearbyContainer: {
    backgroundColor: colors.speciesNearbyGreen,
    height: 231
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 18
  },
  textContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 22,
    marginRight: 22
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderRadius: 6,
    height: 29,
    justifyContent: "center",
    paddingHorizontal: 9
  }
} );
