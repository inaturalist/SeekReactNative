import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    height: 530,
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: colors.white
  },
  header: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  carousel: {
    alignItems: "center",
    width: width - ( width * 0.1 )
  },
  image: {
    marginBottom: 25,
    height: width / 2,
    justifyContent: "center",
    width: width / 2
  },
  imageStyle: {
    resizeMode: "contain"
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 47
  },
  smallImage: {
    height: 57,
    width: 57,
    resizeMode: "contain",
    marginHorizontal: 20
  },
  headerText: {
    marginHorizontal: 27,
    marginBottom: 9,
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12,
    lineHeight: 24
  },
  text: {
    textAlign: "center",
    marginHorizontal: 27,
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  center: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    height: 70,
    width: 209
  },
  backButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  nameText: {
    marginTop: 6,
    marginHorizontal: 27,
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  italicText: {
    marginTop: 16,
    marginHorizontal: 27,
    textAlign: "center",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 25,
    color: colors.black
  }
} );
