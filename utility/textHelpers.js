import i18n from "../i18n";

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

const setAncestorRankText = ( rank ) => {
  let ancestorRank;

  if ( rank === 20 ) {
    ancestorRank = "camera.genus";
  } else if ( rank === 30 ) {
    ancestorRank = "camera.family";
  } else if ( rank === 40 ) {
    ancestorRank = "camera.order";
  } else if ( rank === 50 ) {
    ancestorRank = "camera.class";
  } else if ( rank === 60 ) {
    ancestorRank = "camera.phylum";
  } else if ( rank === 70 ) {
    ancestorRank = "camera.kingdom";
  }

  return i18n.t( ancestorRank );
};

const setCameraHelpText = ( rankToRender ) => {
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

export {
  setChallengeDetailsButtonText,
  setAncestorRankText,
  setCameraHelpText
};
