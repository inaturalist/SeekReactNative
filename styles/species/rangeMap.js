import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  map: {
    width,
    height: height - 75
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  userLocation: {
    position: "absolute",
    right: 19,
    bottom: 19
  },
  locationIcon: {
    marginRight: 19,
    marginBottom: 19,
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.white
  },
  legendPosition: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  legend: {
    borderTopRightRadius: 40,
    backgroundColor: colors.seekForestGreen,
    height: height > 670 ? 70 : 50,
    width: 126
  },
  whiteText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 19,
    color: colors.white,
    letterSpacing: 1.12,
    fontFamily: fonts.semibold
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  innerContainer: {
    borderRadius: 40,
    backgroundColor: colors.white
  },
  legendHeader: {
    height: 56,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: colors.seekForestGreen
  },
  text: {
    marginTop: 3,
    marginLeft: 21,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black,
    fontFamily: fonts.book
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 15
  },
  backButton: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
} );
