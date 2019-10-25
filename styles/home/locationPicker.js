import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  touchable,
  dimensions
} from "../global";

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingBottom: 20,
    paddingHorizontal: 23,
    paddingTop: 23
  },
  container: {
    flex: 1
  },
  footer: {
    backgroundColor: colors.white,
    marginHorizontal: 23,
    paddingBottom: dimensions.height > 670 ? 45 : 15,
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
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginBottom: 16
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
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 23
  },
  textContainer: {
    alignSelf: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? 25 : 21
  },
  touchable,
  userLocation: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
} );
