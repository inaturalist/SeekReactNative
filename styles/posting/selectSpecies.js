import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  header: {
    height: 55,
    backgroundColor: colors.seekForestGreen
  },
  backButton: {
    top: 18,
    left: 23
  },
  text: {
    top: Platform.OS === "android" ? -4 : null,
    alignSelf: "center",
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0,
    fontFamily: fonts.semibold
  },
  touchable,
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    height: 63,
    backgroundColor: colors.seekForestGreen
  },
  inputField: {
    marginLeft: 11,
    width: "81%",
    backgroundColor: colors.white,
    height: 37,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 40,
    paddingLeft: 16,
    fontFamily: fonts.book,
    fontSize: 15
  },
  photoContainer: {
    backgroundColor: colors.black,
    alignItems: "center",
    height: 155
  },
  image: {
    height: 155,
    width,
    resizeMode: "contain"
  },
  roundImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginRight: 24
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12,
    marginBottom: 18
  },
  textContainer: {
    marginHorizontal: 24,
    marginTop: 27
  },
  speciesNameContainer: {
    maxWidth: 223
  },
  commonNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 21,
    color: colors.black,
    fontFamily: fonts.book
  },
  scientificNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    fontFamily: fonts.bookItalic,
    color: colors.black,
    fontSize: 16,
    lineHeight: 21
  },
  card: {
    marginBottom: 18,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  }
} );
