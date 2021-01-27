// @flow

import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  center: {
    alignItems: "center"
  },
  centerSelf: {
    alignSelf: "center"
  },
  container: {
    marginBottom: 32,
    marginHorizontal: 20,
    marginTop: 37
  },
  image: {
    height: width < 366 ? ( width / 2 ) : ( 366 / 2 ),
    justifyContent: "center",
    marginBottom: 25,
    width: width < 366 ? ( width / 2 ) : ( 366 / 2 )
  },
  imageStyle: {
    resizeMode: "contain"
  },
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
  margins: {
    marginHorizontal: 20
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
