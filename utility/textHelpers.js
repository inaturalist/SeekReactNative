// @flow

import { PixelRatio } from "react-native";

import i18n from "../i18n";

const { getFontScale } = PixelRatio;

const setChallengeDetailsButtonText = ( challenge, challengeStarted ) => {
  let buttonText;

  if ( !challengeStarted ) {
    buttonText = "challenges.start_challenge";
  } else if ( challengeStarted && challenge.percentComplete < 100 ) {
    buttonText = "challenges.open_camera";
  } else if ( challengeStarted && challenge.percentComplete === 100 ) {
    buttonText = "challenges.view_badge";
  }

  return buttonText;
};

const setCameraHelpText = ( rankToRender: ?string ) => {
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

const enabledLargeFonts = () => getFontScale() > 1;

export {
  setChallengeDetailsButtonText,
  setCameraHelpText,
  enabledLargeFonts
};
