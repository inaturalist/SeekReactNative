import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding,
  margins
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  list: {
    flex: 3
  },
  taxonGrid: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: margins.medium
  },
  badgeIcon: {
    width: 70,
    height: 70,
    alignSelf: "center"
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
    overflow: "hidden",
    shadowColor: colors.blueShadow
  },
  cellTitle: {
    height: 45,
    padding: padding.medium,
    alignItems: "center",
    justifyContent: "center",
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
