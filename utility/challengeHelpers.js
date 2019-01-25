const Realm = require( "realm" );

const taxonDict = require( "./taxonDict" );
const missionsDict = require( "./missionsDict" );
const realmConfig = require( "../models/index" );
const challengesDict = require( "./challengesDict" );

const recalculateChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "completed == false AND started == true" );

      incompleteChallenges.forEach( ( challenge ) => {
        realm.write( () => {
          realm.delete( challenge.numbersObserved );
          // deleting numbers observed each time to update with fresh results
          const { index } = challenge;
          const numbersPerMission = missionsDict.default[index];

          Object.keys( numbersPerMission ).forEach( ( taxa ) => {
            if ( taxa === "all" ) {
              console.log( numbersPerMission );
              if ( collectedTaxa.length <= numbersPerMission[taxa] ) {
                challenge.numbersObserved.push( collectedTaxa.length );
              } else {
                challenge.numbersObserved.push( numbersPerMission[taxa] );
              }
            } else {
              const taxaId = taxonDict.default[taxa];
              const filteredCollection = collectedTaxa.filtered( `iconicTaxonId == ${taxaId}` );
              const collectionLength = Object.keys( filteredCollection );
              if ( collectionLength.length <= numbersPerMission[taxa] ) {
                challenge.numbersObserved.push( collectionLength.length );
              } else {
                challenge.numbersObserved.push( numbersPerMission[taxa] );
              }
            }
          } );
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to recalculate challenges: ", err );
    } );
};


const calculatePercent = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" );

      challenges.forEach( ( challenge ) => {
        const seen = challenge.numbersObserved.reduce( ( a, b ) => a + b, 0 );
        const percent = ( seen / challenge.totalSpecies ) * 100;

        realm.write( () => {
          challenge.percentComplete = percent;
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to calculate percent: ", err );
    } );
};

const startChallenge = ( index ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${index}` );

      challenges.forEach( ( challenge ) => {
        realm.write( () => {
          challenge.started = true;
        } );
      } );
    } ).catch( ( err ) => {
      // console.log( "[DEBUG] Failed to start challenge: ", err );
    } );
};


const setupChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( challengesDict.default );
        dict.forEach( ( challengesType ) => {
          const challenges = challengesDict.default[challengesType];

          const challenge = realm.create( "ChallengeRealm", {
            name: challenges.name,
            month: challenges.month,
            description: challenges.description,
            totalSpecies: challenges.totalSpecies,
            unearnedIconName: challenges.unearnedIconName,
            earnedIconName: challenges.earnedIconName,
            missions: challenges.missions,
            index: challenges.index
          }, true );
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup challenges: ", err );
    } );
};

export {
  recalculateChallenges,
  calculatePercent,
  startChallenge,
  setupChallenges
};
