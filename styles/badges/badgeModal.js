import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  outerContainer: {
    flex: 1
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.seekTeal,
    alignItems: "center",
    justifyContent: "center",
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
  safeViewTop: {
    flex: 0
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  }
} );
