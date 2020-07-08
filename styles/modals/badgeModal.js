import { StyleSheet, Dimensions, I18nManager } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

const setImageWidth = () => {
  if ( width < 366 ) {
    return width / 2;
  }
  return 366 / 2;
};

const setCarouselWidth = () => {
  if ( width < 325 ) {
    return width;
  }
  // Android Pixel XL has 411.5 width
  // iPhone XS has 375 width
  // iPhone SE has 320 width
  return width - ( width * 0.1 );
};

export default StyleSheet.create( {
  arrow: {
    padding: 27,
    position: "absolute",
    right: 0,
    top: 190 - 27,
    transform: [{ rotate: I18nManager.isRTL ? "180deg" : "0deg" }],
    zIndex: 1
  },
  bullets: {
    color: colors.seekForestGreen,
    fontSize: 37,
    marginHorizontal: 41
  },
  carousel: {
    alignItems: "center",
    maxWidth: 366,
    width: setCarouselWidth()
  },
  image: {
    height: setImageWidth(),
    justifyContent: "center",
    marginBottom: 25,
    width: setImageWidth()
  },
  imageStyle: {
    resizeMode: "contain"
  },
  leftArrow: {
    left: 0,
    padding: 27,
    position: "absolute",
    top: 190 - 27,
    transform: [{ rotate: I18nManager.isRTL ? "0deg" : "180deg" }],
    zIndex: 1
  },
  margin: {
    marginBottom: 9
  },
  marginBottom: {
    marginBottom: 27
  },
  marginLarge: {
    marginTop: 39
  },
  marginMedium: {
    marginBottom: 11
  },
  nameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    marginHorizontal: 27,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  smallImage: {
    height: 57,
    marginHorizontal: 20,
    resizeMode: "contain",
    width: 57
  },
  transparent: {
    color: colors.white
  }
} );
