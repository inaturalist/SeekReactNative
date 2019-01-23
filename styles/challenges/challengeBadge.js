import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    borderRadius: 40,
    backgroundColor: colors.white
  },
  badgeHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  badgeImage: {
    marginTop: 15,
    marginBottom: 15,
    height: 180,
    width: "auto",
    resizeMode: "contain"
  },
  headerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 17,
    fontFamily: fonts.semibold,
    color: colors.black,
    lineHeight: 24
  },
  textContainer: {
    marginHorizontal: 27,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
    height: 61,
    width: 200,
    resizeMode: "contain"
  },
  backButton: {
    alignItems: "flex-end",
    padding: 10,
    marginRight: 20,
    marginTop: 20
  }
} );
