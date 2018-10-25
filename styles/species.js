import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    width,
    height,
    backgroundColor: colors.darkBlue
  },
  headerContainer: {
    backgroundColor: colors.darkBlue
  },
  largeHeaderText: {
    marginLeft: margins.medium,
    marginTop: margins.medium,
    fontSize: fontSize.largeHeader,
    color: colors.white,
    fontFamily: fonts.default
  },
  headerText: {
    marginLeft: margins.medium,
    marginTop: margins.medium,
    marginBottom: margins.medium,
    fontSize: fontSize.header,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
  },
  text: {
    marginLeft: margins.medium,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white
  },
  greenText: {
    alignItems: "center",
    justifyContent: "center",
    color: colors.lightGreen
  },
  button: {
    backgroundColor: colors.darkGreen,
    justifyContent: "flex-end",
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.small,
    paddingTop: padding.medium,
    paddingBottom: padding.medium,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center"
  },
  image: {
    width,
    height: height / 2 - 100
  },
  categoryContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    opacity: 0.8
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    height: 40,
    marginTop: margins.medium,
    marginBottom: margins.medium
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: margins.medium,
    marginBottom: margins.medium
  },
  smallImage: {
    width: width / 5,
    overflow: "visible"
  },
  greenImage: {
    width: width / 4,
    marginBottom: margins.medium,
    backgroundColor: "transparent",
    tintColor: colors.lightGreen
  },
  infoContainer: {
    flex: 5,
    backgroundColor: colors.darkestBlue
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: margins.medium
  },
  map: {
    width: width - 30,
    height: width / 2,
    borderRadius: 5
  }
} );
