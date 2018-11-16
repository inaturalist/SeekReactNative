import { StyleSheet } from "react-native";
import { colors, padding, margins } from "./global";

export default StyleSheet.create( {
  backgroundImage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  row: {
    alignItems: "center"
  },
  blueBox: {
    marginTop: margins.medium,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 5
  },
  logoRow: {
    padding: padding.large,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  logo: {
    marginBottom: margins.medium,
    marginRight: margins.medium
  },
  text: {
    color: colors.white,
    padding: padding.medium,
    margin: margins.medium,
    textAlign: "center"
  },
  greenText: {
    color: colors.lightGreen
  },
  headerText: {
    marginRight: margins.medium
  }
} );
