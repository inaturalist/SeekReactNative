import { StyleSheet } from "react-native";
import { dimensions } from "../global";

const viewStyles = StyleSheet.create( {
  header: {
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
  },
  marginBottom: {
    marginBottom: dimensions.width < 350 ? 15 : 39,
  },
  marginTop: {
    marginTop: dimensions.width < 350 ? 10 : 24,
  },
} );

const textStyles = StyleSheet.create( {
  text: {
    marginHorizontal: 24,
    marginTop: dimensions.width < 350 ? 12 : 18,
    textAlign: "center",
  },
  headerText: {
    marginHorizontal: 24,
    textAlign: "center",
  },
  bannerText: {
    paddingTop: 10,
    textAlign: "center",
    lineHeight: 34,
  },
} );

const imageStyles = StyleSheet.create( {
  logo: {
    height: 70,
    resizeMode: "contain",
    width: 209,
  },
  headerImage: {
    alignItems: "center",
    height: dimensions.width < 350 ? 200 : 232,
    width: "100%",
  },
  badge: {
    height: dimensions.width < 350 ? 140 : 158,
    marginTop: 25,
    width: dimensions.width < 350 ? 140 : 158,
  },
  seekBanner: {
    bottom: dimensions.width < 350 ? 12 : 29,
    height: 48,
    position: "absolute",
    width: 300,
  },
  iNatLogo: {
    height: 45,
    width: 246,
  },
  natGeoLogo: {
    height: 45,
    width: 153,
  },
} );

  export {
    viewStyles,
    textStyles,
    imageStyles,
  };

