// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "../global";

const { width } = dimensions;


const viewStyles = StyleSheet.create( {
  center: {
    alignItems: "center"
  },
  container: {
    marginBottom: 32,
    marginHorizontal: 20,
    marginTop: 37
  },
  margins: {
    marginHorizontal: 20
  }
} );

const textStyles = StyleSheet.create( {
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 16,
    marginHorizontal: 27,
    marginTop: 16,
    maxWidth: 256,
    textAlign: "center"
  },
  nameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 34,
    marginTop: 9,
    textAlign: "center"
  }
} );

const imageStyles = StyleSheet.create( {
  imageStyle: {
    resizeMode: "contain"
  },
  emptyBadgeImage: {
    height: width < 366 ? ( width / 2 ) : ( 366 / 2 ),
    justifyContent: "center",
    marginBottom: 25,
    width: width < 366 ? ( width / 2 ) : ( 366 / 2 )
  }
} );

  export {
    viewStyles,
    textStyles,
    imageStyles
  };

