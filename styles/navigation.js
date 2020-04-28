import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "./global";

import { requiresSafeArea } from "../utility/helpers";

const { width } = dimensions;

export default StyleSheet.create( {
  cameraTab: {
    backgroundColor: colors.black,
    paddingHorizontal: width / 10 - 3
  },
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.88,
    marginBottom: requiresSafeArea() ? 25 : 0
  },
  indicator: {
    backgroundColor: colors.seekGreen,
    borderRadius: 40,
    height: 2,
    left: width / 10,
    marginBottom: requiresSafeArea() ? 25 : 0,
    width: width / 2.5
  }
} );
