import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  badges: {
    flex: 2
  },
  headerText: {
    fontSize: fontSize.header
  },
  species: {
    flex: 2
  },
  taxonGrid: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: margins.extraLarge,
    marginBottom: margins.large
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: padding.medium,
    marginTop: margins.medium
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: colors.blueShadow
  },
  cellTitle: {
    height: 40,
    backgroundColor: colors.darkBlue,
    padding: padding.medium,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: padding.small
  }
} );
