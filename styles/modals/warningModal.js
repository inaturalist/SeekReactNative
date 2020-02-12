import {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

const { height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  button: {
    marginBottom: 24,
    marginTop: ( fontScale > 1 || height < 570 ) ? null : 14
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height < 570 ? 10 : 31
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 62,
    justifyContent: "center",
    width: 366
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
  margin: {
    marginTop: height > 570 ? 28 : 8
  },
  row,
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
