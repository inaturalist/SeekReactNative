import { StyleSheet } from "react-native";
import { colors, center } from "../global";

const viewStyles = StyleSheet.create( {
  center,
  background: {
    backgroundColor: colors.white,
  },
  challengeBackground: {
    flex: 1,
    paddingTop: 99,
  },
  marginLarge: {
    marginTop: 37,
  },
  marginMedium: {
    marginTop: 28,
  },
  marginSmall: {
    marginTop: 21,
  },
  opContainer: {
    alignSelf: "center",
    marginTop: 23,
  },
  textContainer: {
    paddingHorizontal: 35,
  },
  whiteContainer: {
    backgroundColor: colors.white,
  },
  loadingWheelContainer: {
    height: 223,
    justifyContent: "center",
  },
  speciesNearbyErrorContainer: {
    paddingVertical: 15,
  },
} );

const textStyles = StyleSheet.create( {
  photographerText: {
    textAlign: "center",
    marginTop: 29,
  },
  viewText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  speciesNearbyErrorText: {
    maxWidth: 245,
    textAlign: "center",
  },
} );

const imageStyles = StyleSheet.create( {
  iNatLogo: {
    height: 35,
    top: 32,
    width: 191,
  },
  logo: {
    alignSelf: "center",
    height: 58,
    position: "absolute",
    resizeMode: "contain",
    top: 20,
    width: 116,
  },
  natGeoLogo: {
    width: 142,
    height: 41,
  },
  myGardenLogo: {
    width: 145,
    height: 48,
  },
  myGardenContainer: {
    alignSelf: "center",
    width: "100%",
    height: 85,
    marginTop: 23,
    resizeMode: "contain",
  },
} );

  export {
    viewStyles,
    textStyles,
    imageStyles,
  };

