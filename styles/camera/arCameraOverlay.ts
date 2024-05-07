import { StyleSheet } from "react-native";
import { colors, dimensions } from "../global";

const viewStyles = StyleSheet.create( {
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  help: {
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 35,
    position: "absolute",
    right: 62
  },
  plantFilter: {
    bottom: 203 - 41,
    position: "absolute"
  },
  plantFilterSettings: {
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 33,
    position: "absolute",
    left: 60
  },
  shutter: {
    bottom: 0,
    paddingHorizontal: 48,
    paddingVertical: 18,
    position: "absolute"
  },
  landscapeShutter: {
    right: 0,
    // really wish I could figure out how to use flex here instead of subtracting navbar + camera icon size
    bottom: dimensions.height / 2 - 65 - 31,
    paddingHorizontal: 22,
    paddingVertical: 0
  },
  landscapeHelp: {
    right: 0,
    // really wish I could figure out how to use flex here instead of subtracting navbar + camera icon size
    bottom: dimensions.height / 2 + 50,
    paddingHorizontal: 37,
    paddingVertical: 0
  },
  landscapeHelpBubble: {
    bottom: 26 + 65 + 18,
    width: 293,
    position: "absolute",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.seekForestGreen
  },
  landscapeHelpBubbleSpecies: {
    backgroundColor: colors.seekGreen
  },
  helpBubble: {
    bottom: 26 + 65 + 18,
    width: 293,
    position: "absolute"
  }
} );

const textStyles = StyleSheet.create( {
  scanText: {
    textAlign: "center"
  },
  textShadow: {
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  }
} );

export {
  viewStyles,
  textStyles
};
