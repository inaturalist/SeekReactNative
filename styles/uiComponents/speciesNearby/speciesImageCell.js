import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global";

export default StyleSheet.create( {
  cellImage: {
    borderRadius: 108 / 2,
    height: 108,
    width: 108
  },
  cellTitle: {
    flexDirection: "row",
    height: 92,
    justifyContent: "center",
    paddingTop: 13,
    width: 108
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  gridCell: {
    marginHorizontal: 14
  }
} );
