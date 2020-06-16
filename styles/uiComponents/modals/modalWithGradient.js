import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  colors,
  fonts,
  row
} from "../../global";

const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  backButton: {
    marginLeft: 33,
    marginRight: 29
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
  },
  container: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    maxWidth: 366,
    overflow: "hidden"
  },
  header: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 167,
    overflow: "visible"
  },
  headerTextContainer: {
    justifyContent: "flex-end",
    marginTop: 15
  },
  imageCell: {
    borderRadius: 129 / 2,
    height: 129,
    width: 129
  },
  images: {
    marginHorizontal: 22,
    marginTop: 20
  },
  innerContainer: {
    alignItems: "center"
  },
  marginLarge: {
    marginTop: 45
  },
  marginLeft: {
    marginLeft: 17
  },
  marginMedium: {
    marginTop: 32
  },
  paddingSmall: {
    paddingTop: 9
  },
  row
} );
