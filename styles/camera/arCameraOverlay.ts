import { StyleSheet } from "react-native";
import { colors } from "../global";

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
  plantFilter: {
    bottom: 203 - 41,
    position: "absolute"
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
  },
  cameraControlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 31
  },
  leftControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 100
  },
  rightControls: {
    justifyContent: "center",
    width: 100,
    alignItems: "center"
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
