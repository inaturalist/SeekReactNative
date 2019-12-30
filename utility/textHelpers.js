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

export default setChallengeDetailsButtonText;
