const Realm = require( "realm" );

const realmConfig = require( "../models/index" );
const badgesDict = require( "./badgesDict" );

const recalculateBadges = () => {
  let badgeEarned = false;

  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const unearnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == false" );

      unearnedBadges.forEach( ( badge ) => {
        if ( badge.iconicTaxonId !== 0 && badge.count !== 0 ) {
          const filteredCollection = collectedTaxa.filtered( `iconicTaxonId == ${badge.iconicTaxonId}` );
          const collectionLength = Object.keys( filteredCollection );

          if ( collectionLength.length >= badge.count ) {
            realm.write( () => {
              badge.earned = true;
              badge.earnedDate = new Date();
            } );
            badgeEarned = true;
          }
        } else if ( badge.count !== 0 ) {
          if ( collectedTaxa.length >= badge.count ) {
            realm.write( () => {
              badge.earned = true;
              badge.earnedDate = new Date();
            } );
            badgeEarned = true;
          }
        }
      } );
    } ).catch( ( err ) => {
      // console.log( "[DEBUG] Failed to open realm in recalculate badges, error: ", err );
    } );
  return badgeEarned;
};

const setupBadges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( badgesDict.default );
        dict.forEach( ( badgeType ) => {
          const badges = badgesDict.default[badgeType];

          const badge = realm.create( "BadgeRealm", {
            name: badges.name,
            iconicTaxonName: badges.iconicTaxonName,
            iconicTaxonId: badges.iconicTaxonId,
            count: badges.count,
            earnedIconName: badges.earnedIconName,
            unearnedIconName: badges.unearnedIconName,
            infoText: badges.infoText,
            index: badges.index
          }, true );
        } );
      } );
    } ).catch( ( err ) => {
      // console.log( "[DEBUG] Failed to open realm in setup badges, error: ", err );
    } );
};

export {
  recalculateBadges,
  setupBadges
};
