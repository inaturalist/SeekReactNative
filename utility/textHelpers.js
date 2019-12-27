import i18n from "../i18n";

const setChallengeDetailsButtonText = ( challenge, challengeStarted ) => {
  let buttonText;

  if ( !challengeStarted ) {
    buttonText = i18n.t( "challenges.start_challenge" );
  } else if ( challengeStarted && challenge.percentComplete < 100 ) {
    buttonText = i18n.t( "challenges.open_camera" );
  } else if ( challengeStarted && challenge.percentComplete === 100 ) {
    buttonText = i18n.t( "challenges.view_badge" );
  }

  return buttonText;
};

export default setChallengeDetailsButtonText;
