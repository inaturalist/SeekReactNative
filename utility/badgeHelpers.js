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

const recalculateBadges = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );

      if ( collectedTaxa.length === 0 ) {
        return; // don't bother to calculate badges if there are no taxa observed
      }

      const unearnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == false" );

      unearnedBadges.forEach( ( badge ) => {
        if ( !badge || badge.count === 0 ) { // check for !badge so realm doesn't catch error
          return;
        }

        if ( badge.iconicTaxonId !== 0 ) {
          const collectionLength = collectedTaxa.filtered( `iconicTaxonId == ${badge.iconicTaxonId}` ).length;

          if ( collectionLength >= badge.count ) {
            createNewBadge( realm, badge );
          }
        } else if ( collectedTaxa.length >= badge.count ) {
          createNewBadge( realm, badge );
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to open realm in recalculate badges, error: ", err );
    } );
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

const setupBadges = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
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
              earned: badges.earned || false
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

const getBadgesEarned = async () => {
  try {
    const earned = await AsyncStorage.getItem( "badgesEarned" );
    return earned;
  } catch ( error ) {
    return ( error );
  }
};

const checkForNewBadges = async () => {
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
          .sorted( "earnedDate", true );

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

export {
  recalculateBadges,
  setupBadges,
  checkNumberOfBadgesEarned,
  checkForNewBadges,
  getBadgesEarned,
  deleteBadges
};
