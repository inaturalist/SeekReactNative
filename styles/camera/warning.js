import {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  button: {
    marginBottom: 24,
    marginTop: ( fontScale > 1 ) ? null : 14,
    width: height > 570 ? 285 : 230
  },
  contentContainer: {
    alignItems: "center",
    marginTop: 31
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 62,
    justifyContent: "center"
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    textAlign: "center"
  },
  image: {
    height: 39,
    marginRight: 22,
    resizeMode: "contain",
    width: 39
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 28
  },
  text: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    lineHeight: ( fontScale > 1 ) ? null : 21
  },
  textContainer: {
    width: height > 570 ? 198 : 150
  }
} );
