import { StyleSheet, I18nManager } from "react-native";
import { row } from "../global";

export default StyleSheet.create( {
  badge: {
    height: 25,
    marginLeft: 10,
    resizeMode: "contain",
    width: 22
  },
  empty: {
    marginRight: -1
  },
  header: {
    height: 25,
    justifyContent: "space-between",
    marginHorizontal: 24
  },
  headerText: {
    alignSelf: "center"
  },
  margin: {
    marginLeft: 15,
    transform: [{ rotate: I18nManager.isRTL ? "90deg" : "270deg" }]
  },
  marginOpen: {
    marginLeft: 15
  },
  numberText: {
    fontSize: 18,
    letterSpacing: 0.78
  },
  row
} );
