import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  badges: {
    flex: 1.5,
    backgroundColor: colors.lightGray
  },
  header: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  headerText: {
    fontSize: fontSize.header,
    alignItems: "flex-start",
    marginLeft: margins.medium
  },
  button: {
    position: "absolute",
    right: 0,
    paddingRight: padding.large
  },
  text: {
    fontSize: fontSize.text
  },
  species: {
    flex: 3,
    backgroundColor: colors.white
  },
  taxonGrid: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: margins.medium
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: padding.medium,
    marginTop: margins.medium,
    marginBottom: margins.small
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden"
  },
  cellTitle: {
    height: 45,
    backgroundColor: colors.lightGray,
    padding: padding.medium,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.black,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: padding.extraSmall
  }
} );
