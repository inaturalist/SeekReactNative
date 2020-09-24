import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import { enabledLargeFonts } from "../../utility/textHelpers";

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 18,
    position: "absolute",
    zIndex: 1
  },
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  inputIOS: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: enabledLargeFonts() ? 13 : 18,
    letterSpacing: 1.0,
    paddingLeft: 30,
    paddingVertical: 15,
    paddingRight: 45
  },
  inputIOSContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    maxWidth: 250
  },
  viewContainer: {
    alignItems: "center"
  },
  inputAndroid: {
    textTransform: "uppercase",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: enabledLargeFonts() ? 13 : 18,
    letterSpacing: 1.0
  },
  inputAndroidContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingHorizontal: 30
  },
  carot: {
    marginRight: 15
  }
} );
