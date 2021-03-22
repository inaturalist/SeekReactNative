// @flow

import { PixelRatio } from "react-native";

import i18n from "../i18n";

const { getFontScale } = PixelRatio;

const setChallengeDetailsButtonText = ( challenge: { percentComplete: number }, challengeStarted?: Date ): string => {
  if ( !challengeStarted ) {
    return "challenges.start_challenge";
  } else if ( challengeStarted && challenge.percentComplete === 100 ) {
    return "challenges.view_badge";
  } else {
    return "challenges.open_camera";
  }
};

const setCameraHelpText = ( rankToRender: ?string ): string => {
  let helpText;

  if ( rankToRender === "class" || rankToRender === "order" || rankToRender === "family" ) {
    helpText = "camera.scan_class";
  } else if ( rankToRender === "genus" ) {
    helpText = "camera.scan_genus";
  } else if ( rankToRender === "species" ) {
    helpText = "camera.scan_species";
  } else {
    helpText = "camera.scan";
  }

  return i18n.t( helpText );
};

const enabledLargeFonts = ( ): boolean => getFontScale( ) > 1;

export {
  setChallengeDetailsButtonText,
  setCameraHelpText,
  enabledLargeFonts
};
