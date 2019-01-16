import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
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
    fontSize: fontSize.buttonText,
    fontFamily: fonts.book,
    alignItems: "flex-start",
    marginLeft: margins.medium,
    marginTop: margins.medium
  },
  button: {
    marginTop: margins.medium,
    position: "absolute",
    right: 0,
    paddingRight: padding.large
  },
  text: {
    fontSize: fontSize.smallText,
    fontFamily: fonts.default
  },
  species: {
    flex: 3,
    backgroundColor: colors.white,
    paddingBottom: padding.medium
  },
  taxonGrid: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeIcon: {
    width: 70,
    height: 70,
    alignSelf: "center"
  },
  badgeCellContents: {
    borderRadius: 5,
    overflow: "hidden"
  },
  gridCell: {
    width: 105,
    height: 138,
    paddingHorizontal: padding.medium,
    marginTop: margins.medium
  },
  gridCellContents: {
    borderRadius: 5,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowColor: colors.darkGray,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  badgeTitle: {
    height: 45,
    padding: padding.medium,
    alignItems: "center",
    justifyContent: "center"
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
  },
  noSpecies: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: margins.large
  }
} );
