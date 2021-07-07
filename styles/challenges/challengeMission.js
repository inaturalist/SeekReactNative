// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";


import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  subBullets: {
    marginTop: 15,
    marginRight: 10
  },
  circleStyle: {
    height: 59,
    width: 59
  },
  container: {
    marginBottom: 20,
    marginTop: 36
  },
  marginTop: {
    marginTop: 6
  },
  missionRow: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  textContainer: {
    flex: 1,
    paddingRight: 18
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  bullets: {
    fontSize: 29,
    marginTop: 7,
    alignItems: "center",
    marginRight: 22
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.medium,
    marginTop: 9
  },
  secondLevelBulletText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    maxWidth: 274
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 16,
    maxWidth: 274
  }
} );


const imageStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  checklist: {
    marginTop: 20,
    marginRight: 16
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};

