import Realm from "realm";

import UUIDGenerator from "react-native-uuid-generator";
import { sortNewestToOldest, capitalizeNames } from "./helpers";
import { deleteBadges, checkNumberOfBadgesEarned } from "./badgeHelpers";
import { recalculateChallenges, checkNumberOfChallengesCompleted } from "./challengeHelpers";
import iconicTaxaIds from "./dictionaries/iconicTaxonDictById";
import { createBackupUri, deleteFile } from "./photoHelpers";
import { createNotification } from "./notificationHelpers";
import realmConfig from "../models/index";
import { dirPictures } from "./dirStorage";
import { setISOTime } from "./dateHelpers";

const createUUID = async () => {
  try {
    const uuidGen = await UUIDGenerator.getRandomUUID();
    return uuidGen;
  } catch ( e ) {
    return null;
  }
};

const checkForPowerUsers = ( length, newLength ) => {
  if ( length < newLength ) {
    if ( newLength === 50 || newLength === 100 || newLength === 150 ) {
      createNotification( "badgeEarned" );
    }
  }
};

const addToCollection = async ( observation, latitude, longitude, uri, time ) => {
  const { taxon } = observation;
  const backupUri = await createBackupUri( uri ); // needs to happen before calculating badges
  const uuid = await createUUID();

  checkNumberOfBadgesEarned();
  checkNumberOfChallengesCompleted();

  Realm.open( realmConfig )
    .then( ( realm ) => {
      const { length } = realm.objects( "TaxonRealm" );

      realm.write( () => {
        let defaultPhoto;
        const p = taxon.default_photo;
        if ( uri ) {
          defaultPhoto = realm.create( "PhotoRealm", {
            squareUrl: p ? p.medium_url : null,
            mediumUrl: uri,
            backupUri
          } );
        }
        const newTaxon = realm.create( "TaxonRealm", {
          id: taxon.id,
          name: taxon.name,
          preferredCommonName:
            taxon.preferred_common_name
              ? capitalizeNames( taxon.preferred_common_name )
              : null,
          iconicTaxonId: taxon.iconic_taxon_id,
          ancestorIds: taxon.ancestor_ids,
          defaultPhoto
        } );
        realm.create( "ObservationRealm", {
          uuidString: uuid,
          date: time ? setISOTime( time ) : new Date(),
          taxon: newTaxon,
          latitude,
          longitude,
          placeName: null
        } );
      } );
      const newLength = realm.objects( "TaxonRealm" ).length;
      checkForPowerUsers( length, newLength );
    } ).catch( ( e ) => {
      console.log( e, "error adding to collection" );
    } );
};

const removeFromCollection = ( id ) => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      realm.write( () => {
        const obsToDelete = realm.objects( "ObservationRealm" ).filtered( `taxon.id == ${id}` );
        const taxonToDelete = obsToDelete[0].taxon;
        const photoObjToDelete = taxonToDelete.defaultPhoto;

        const { backupUri } = photoObjToDelete;

        if ( backupUri !== null ) { // for simulators and pre-backup observations
          const uri = backupUri.split( "Pictures/" ); // should work for both iOS and Android
          const backupFilepath = `${dirPictures}/${uri[1]}`;
          deleteFile( backupFilepath );
        }

        realm.delete( photoObjToDelete );
        realm.delete( obsToDelete );
        realm.delete( taxonToDelete );
        deleteBadges();
        recalculateChallenges();
      } );
    } ).catch( ( e ) => {
      console.log( e, "error removing from collection" );
    } );
};

const createSectionList = ( realm ) => {
  const observations = [];
  const species = realm.objects( "ObservationRealm" );

  const taxaIdList = Object.keys( iconicTaxaIds ).reverse();
  taxaIdList.pop();

  taxaIdList.forEach( ( id ) => {
    const data = species
      .filtered( `taxon.iconicTaxonId == ${id}` )
      .sorted( "date", true );

    const badgeCount = realm.objects( "BadgeRealm" )
      .filtered( `iconicTaxonId == ${id} AND earned == true` ).length;

    observations.push( {
      id,
      data: data.length > 0 ? data : [],
      badgeCount,
      open: true
    } );
  } );

  sortNewestToOldest( observations );

  const otherData = species
    .filtered( "taxon.iconicTaxonId == 1 OR taxon.iconicTaxonId == 47686 OR taxon.iconicTaxonId == 48222" )
    .sorted( "date", true );
  // added protozoans here because they weren't saving with iconicTaxonId == 1 on iOS

  observations.push( {
    id: 1,
    data: otherData,
    badgeCount: -1,
    open: true
  } );

  return species.length > 0 ? observations : [];
};

export {
  addToCollection,
  removeFromCollection,
  createSectionList
};
