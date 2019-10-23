const moment = require( "moment" );

const requiresParent = ( birthday ) => {
  const today = moment().format( "YYYY-MM-DD" );
  const thirteen = moment( today ).subtract( 13, "year" ).format( "YYYY-MM-DD" );
  if ( moment( birthday ).isAfter( thirteen ) ) {
    return true;
  }
  return false;
};

const checkIfChallengeAvailable = ( date ) => {
  if ( date <= new Date() ) {
    return true;
  }
  return false;
};

const isWithinPastYear = ( reviewShownDate ) => {
  const today = moment().format( "YYYY-MM-DD" );
  const lastYear = moment( today ).subtract( 1, "year" ).format( "YYYY-MM-DD" );
  if ( moment( reviewShownDate ).isAfter( lastYear ) ) {
    return true;
  }
  return false;
};

export {
  checkIfChallengeAvailable,
  requiresParent,
  isWithinPastYear
};
