import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  dimensions,
  row
} from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  footer: {
    backgroundColor: colors.white,
    paddingBottom: dimensions.height > 670 ? 35 : 15,
    paddingTop: 15
  },
  greenCircle: {
    backgroundColor: colors.seekGreen,
    borderRadius: 281 / 2,
    height: 281,
    opacity: 0.33,
    width: 281
  },
  header: {
    backgroundColor: colors.seekForestGreen
  },
  headerText: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    maxWidth: dimensions.width - 100
  },
  image: {
    padding: 5
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 40,
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 15,
    height: 37,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingTop: 0,
    width: "91%"
  },
  inputRow: {
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 23,
    marginTop: 20
  },
  locationIcon: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 50 / 2,
    height: 50,
    justifyContent: "center",
    marginBottom: 19,
    marginRight: 19,
    width: 50
  },
  map: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  mapContainer: {
    flexGrow: 1
  },
  margin: {
    marginTop: 15
  },
  marginLarge: {
    marginTop: 20
  },
  markerFixed: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 64
  },
  markerPin: {
    height: 33,
    position: "absolute",
    width: 23
  },
  pinFixed: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginRight: 15,
    marginTop: 55
  },
  row,
  userLocation: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  white: {
    height: 19,
    resizeMode: "contain",
    tintColor: colors.white,
    width: 14
  },
  errorContainer: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: { // same as camera error text
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center"
  }
} );
