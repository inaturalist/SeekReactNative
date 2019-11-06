import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  backButton: {
    left: 23,
    paddingBottom: 18,
    paddingTop: 18
  },
  card: {
    marginBottom: 18
  },
  commonNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 21
  },
  container: {
    flex: 1
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  headerMargins: {
    marginBottom: 18
  },
  image: {
    height: 155,
    resizeMode: "contain",
    width
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 40,
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 15,
    height: 37,
    marginLeft: 11,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingTop: 0,
    width: "81%"
  },
  photoContainer: {
    alignItems: "center",
    backgroundColor: colors.black,
    height: 155
  },
  roundImage: {
    borderRadius: 80 / 2,
    height: 80,
    marginRight: 24,
    width: 80
  },
  row: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 63,
    justifyContent: "center"
  },
  scientificNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 5
  },
  speciesNameContainer: {
    maxWidth: 223
  },
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "android" ? 18 : 20,
    position: "absolute"
  },
  textContainer: {
    marginHorizontal: 24,
    marginTop: 27
  },
  touchable
} );
