import { StyleSheet, Dimensions } from "react-native";
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
    position: "absolute",
    right: 27,
    top: 190,
    zIndex: 1
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
  margin: {
    marginBottom: 9
  },
  marginLarge: {
    marginTop: 39
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
    flexWrap: "nowrap",
    marginBottom: 47
  },
  smallImage: {
    height: 57,
    marginHorizontal: 20,
    resizeMode: "contain",
    width: 57
  }
} );
