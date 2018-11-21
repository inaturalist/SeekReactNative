import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  backgroundImage: {
    paddingTop: 20,
    flex: 1
  },
  header: {
    alignItems: "center",
    marginBottom: margins.medium
  },
  headerText: {
    marginTop: margins.large,
    fontSize: fontSize.header,
    lineHeight: 29,
    color: colors.white,
    fontFamily: fonts.default
  },
  gridContainer: {
    flex: 1,
    flexDirection: "column"
  },
  row: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  imageCell: {
    backgroundColor: colors.darkBlue,
    marginHorizontal: margins.extraSmall,
    marginBottom: margins.extraSmall * 2,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100
  },
  image: {
    width: 64,
    height: 64
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: fontSize.smallText
  }
} );
