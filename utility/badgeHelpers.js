// @flow
import AsyncStorage from "@react-native-async-storage/async-storage";
import Realm from "realm";

import realmConfig from "../models/index";
import badgesDict from "./dictionaries/badgesDict";

const createNewBadge = ( realm, badge ) => {
  realm.write( () => {
    badge.earned = true;
    badge.earnedDate = new Date();
  } );
};

const deleteBadge = ( realm, badge ) => {
  realm.write( () => {
    badge.earned = false;
    badge.earnedDate = null;
  } );
};

const checkBadgeEarned = ( realm, badge, observationsSeen ) => {
  if ( observationsSeen >= badge.count ) {
    createNewBadge( realm, badge );
  }
};

const recalculateBadges = async ( ) => {
  const realm = await Realm.open( realmConfig );

  try {
    const collectedTaxa = realm.objects( "TaxonRealm" );
    // it's better to loop through entire badge realm here;
    // looping through unearned badges only causes the loop not to complete when some badges are set to earned
    const badges = realm.objects( "BadgeRealm" );

    badges.forEach( badge => {
      // this fixes a bug where earned was being set to false for all badges in setupBadges code
      if ( badge.earnedDate !== null ) {
        realm.write( ( ) => {
          badge.earned = true;
        } );
      }
      if ( badge.earned === true ) { return; }

      if ( badge.iconicTaxonId !== 0 ) {
        // species badges
        const collectionLength = collectedTaxa.filtered( `iconicTaxonId == ${badge.iconicTaxonId}` ).length;
        checkBadgeEarned( realm, badge, collectionLength );
      } else {
        // level badges
        checkBadgeEarned( realm, badge, collectedTaxa.length );
      }
    } );
  } catch ( e ) {
    console.log( "[DEBUG] Failed to open realm in recalculate badges, error: ", e );
  }
};

const deleteBadges = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true" );

      earnedBadges.forEach( ( badge ) => {
        if ( !badge || badge.count === 0 ) { // check for !badge so realm doesn't catch error
          return;
        }

        if ( badge.iconicTaxonId !== 0 ) {
          const collectionLength = collectedTaxa.filtered( `iconicTaxonId == ${badge.iconicTaxonId}` ).length;

          if ( collectionLength < badge.count ) {
            deleteBadge( realm, badge );
          }
        } else if ( collectedTaxa.length < badge.count ) {
          deleteBadge( realm, badge );
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to delete badges, error: ", err );
    } );
};

const setupBadges = ( ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
    realm.write( () => {
      const dict = Object.keys( badgesDict );
      dict.forEach( ( badgeType ) => {
        const badges = badgesDict[badgeType];

        try {
          realm.create( "BadgeRealm", {
            name: badges.name,
            intlName: badges.intlName,
            iconicTaxonName: badges.iconicTaxonName || null,
            iconicTaxonId: badges.iconicTaxonId || 0,
            count: badges.count,
            earnedIconName: badges.earnedIconName,
            infoText: badges.infoText,
            index: badges.index,
            // $FlowFixMe
            earned: badges.earned
          }, true );
        } catch ( e ) {
          console.log( "error creating data", e );
        }
      } );
    } );
    recalculateBadges( );
  } ).catch( ( err ) => {
    console.log( "[DEBUG] Failed to setup badges, error: ", JSON.stringify( err ) );
  } );
};

const setBadgesEarned = ( badges ) => {
  AsyncStorage.setItem( "badgesEarned", badges );
};

const checkNumberOfBadgesEarned = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" ).length;
      setBadgesEarned( earnedBadges.toString() );
      recalculateBadges();
    } ).catch( ( e ) => {
      console.log( e, "error checking number of badges earned" );
    } );
};

const getBadgesEarned = async (): Promise<string> => {
  try {
    const earned = await AsyncStorage.getItem( "badgesEarned" );
    return earned;
  } catch ( error ) {
    return ( error );
  }
};

const checkForNewBadges = async (): Promise<{
  latestBadge: ?Object,
  latestLevel: ?Object
}> => {
  const badgesEarned = await getBadgesEarned();

  return (
    new Promise( ( resolve ) => {
      Realm.open( realmConfig ).then( ( realm ) => {
        let latestBadge;
        let latestLevel;

        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" );
        const badges = earnedBadges.sorted( "earnedDate", true );

        const speciesCount = realm.objects( "TaxonRealm" ).length;
        const newestLevels = realm.objects( "BadgeRealm" )
          .filtered( "earned == true AND iconicTaxonName == null" )
          .sorted( "count", true );

        if ( badgesEarned < earnedBadges.length ) {
          [latestBadge] = badges;
        }

        if ( speciesCount === newestLevels[0].count && speciesCount !== 0 ) {
          [latestLevel] = newestLevels;
        }

        resolve( {
          latestBadge: latestBadge || null,
          latestLevel: latestLevel || null
        } );
      } ).catch( () => {
        resolve( {
          latestBadge: null,
          latestLevel: null
        } );
      } );
    } )
  );
};

const createBadgeSetList = ( badges: Array<Object> ): Array<number> => {
  const numOfSets = Math.ceil( badges.length / 5 );

  const sets = [];

  for ( let i = 0; i < numOfSets; i += 1 ) {
    sets.push( i * 5 );
  }

  return sets;
};

export {
  recalculateBadges,
  setupBadges,
  checkNumberOfBadgesEarned,
  checkForNewBadges,
  getBadgesEarned,
  deleteBadges,
  createBadgeSetList
};
