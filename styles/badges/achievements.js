import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  badgeIcon: {
    height: width < 455 ? ( width / 4 ) : ( 455 / 4 ),
    resizeMode: "contain",
    width: width < 455 ? ( width / 4 ) : ( 455 / 4 )
  },
  center,
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  containerWhite: {
    backgroundColor: colors.white
  },
  gridCell: {
    height: width < 455 ? ( width / 4 ) : ( 455 / 4 ),
    marginHorizontal: 6,
    width: width < 455 ? ( width / 4 ) : ( 455 / 4 )
  },
  header: {
    flex: 1
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  levelImage: {
    height: 117,
    resizeMode: "contain",
    width: 117
  },
  lightText: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.78,
    marginBottom: 10
  },
  margin: {
    marginTop: 12
  },
  marginLarge: {
    marginTop: 42
  },
  number: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 22,
    marginTop: 10,
    textAlign: "center"
  },
  row,
  secondHeaderText: {
    marginHorizontal: 23,
    maxWidth: 150
  },
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 7
  },
  textContainer: {
    marginLeft: 22,
    paddingBottom: 26,
    paddingTop: 25,
    width: 167
  }
} );
