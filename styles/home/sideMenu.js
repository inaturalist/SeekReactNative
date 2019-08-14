import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from "react-native";

import { colors, fonts, padding } from "../global";

const { width, height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.seekForestGreen,
    justifyContent: "space-between"
  },
  logo: {
    alignSelf: "center",
    marginTop: 25,
    width: ( width / 2 ) * 1.5,
    height: 79,
    resizeMode: "contain"
  },
  textContainer: {
    marginBottom: ( height / 11 ) * 1.5
  },
  image: {
    marginLeft: 26,
    marginRight: 23,
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
  row: {
    height: height / 11,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  text: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 15 : 18,
    letterSpacing: 1.0,
    color: colors.white
  },
  divider: {
    backgroundColor: "#63d4ab",
    height: 1
  }
} );
