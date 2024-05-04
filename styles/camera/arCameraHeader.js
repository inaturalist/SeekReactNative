// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  dimensions,
  row,
  center
} from "../global";

const { height } = dimensions;



const viewStyles = StyleSheet.create( {
  portraitDotsRow: {
    width: 262,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  greenButton: {
    alignItems: "center"
  },
  header: {
    position: "absolute",
    top: height > 700 ? 89 : 58
  },
  landscapeHeader: {
    borderRadius: 20,
    backgroundColor: colors.seekForestGreen,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  landscapeHeaderSpecies: {
    backgroundColor: colors.seekGreen
  },
  landscapeDots: {
    backgroundColor: colors.white,
    borderRadius: 10 / 2,
    height: 10,
    marginHorizontal: 16,
    width: 10
  },
  landscapeDotsGreen: {
    backgroundColor: colors.speciesNearbyGreen,
    borderRadius: 6 / 2,
    height: 6,
    marginBottom: 3,
    marginHorizontal: 16,
    marginTop: 3,
    width: 6
  },
  row,
  center,
  noLeftMargin: {
    marginLeft: 0
  },
  noRightMargin: {
    marginRight: 0
  }
} );

const textStyles = StyleSheet.create( {
  predictions: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 20,
    margin: 22,
    textAlign: "center",
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  scientificName: {
    fontFamily: fonts.semiboldItalic
  }
} );

export {
  textStyles,
  viewStyles
};
