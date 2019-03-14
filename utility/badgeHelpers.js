const Realm = require( "realm" );
const { AsyncStorage, Alert } = require( "react-native" );

const realmConfig = require( "../models/index" );
const badgesDict = require( "./badgesDict" );

const recalculateBadges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const unearnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == false" );

      unearnedBadges.forEach( ( badge ) => {
        if ( badge.iconicTaxonId !== 0 && badge.count !== 0 ) {
          const collectionLength = collectedTaxa.filtered( `iconicTaxonId == ${badge.iconicTaxonId}` ).length;

          if ( collectionLength >= badge.count ) {
            realm.write( () => {
              badge.earned = true;
              badge.earnedDate = new Date();
            } );
          }
        } else if ( badge.count !== 0 ) {
          if ( collectedTaxa.length >= badge.count ) {
            realm.write( () => {
              badge.earned = true;
              badge.earnedDate = new Date();
            } );
          }
        }
      } );
    } ).catch( () => {
      // console.log( "[DEBUG] Failed to open realm in recalculate badges, error: ", err );
    } );
};

const setupBadges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( badgesDict.default );
        dict.forEach( ( badgeType ) => {
          // Alert.alert( badgeType, "badge type" );
          const badges = badgesDict.default[badgeType];
          // Alert.alert( JSON.stringify( badges ), "badges" );

          try {
            const badge = realm.create( "BadgeRealm", {
              name: badges.name,
              intlName: badges.intlName,
              iconicTaxonName: badges.iconicTaxonName,
              iconicTaxonId: badges.iconicTaxonId,
              count: badges.count,
              earnedIconName: badges.earnedIconName,
              unearnedIconName: badges.unearnedIconName,
              infoText: badges.infoText,
              index: badges.index
              // earned: badges.earned
            }, true );
            // Alert.alert( JSON.stringify( badge ), "created badge" );
          } catch ( e ) {
            // const badges = realm.objects( "BadgeRealm" )
            Alert.alert( "error creating data", e );
          }
        } );
      } );
    } ).catch( ( err ) => {
      Alert.alert( "[DEBUG] Failed to setup badges, error: ", JSON.stringify( err ) );
    } );
};

const setBadgesEarned = ( badges ) => {
  AsyncStorage.setItem( "badgesEarned", badges );
};

const setLevelsEarned = ( levels ) => {
  AsyncStorage.setItem( "levelsEarned", levels );
};

const checkNumberOfBadgesEarned = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" ).length;
      const earnedLevels = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName == null" ).length;
      setBadgesEarned( earnedBadges.toString() );
      setLevelsEarned( earnedLevels.toString() );
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

const getLevelsEarned = async () => {
  try {
    const earned = await AsyncStorage.getItem( "levelsEarned" );
    return earned;
  } catch ( error ) {
    return ( error );
  }
};

export {
  recalculateBadges,
  setupBadges,
  checkNumberOfBadgesEarned,
  getBadgesEarned,
  getLevelsEarned
};
