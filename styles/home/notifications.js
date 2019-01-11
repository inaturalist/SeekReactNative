import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 40,
    marginBottom: 13,
    fontSize: fontSize.buttonText,
    color: colors.white,
    fontFamily: fonts.semibold
  },
  notificationsContainer: {
    flexGrow: 1
  },
  row: {
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    height: 96
  },
  divider: {
    backgroundColor: "#d8d8d8",
    height: 2,
    marginLeft: 22,
    marginRight: 22
  }
} );
