// @flow

import Realm from "realm";

import UUIDGenerator from "react-native-uuid-generator";
import { deleteBadges, checkNumberOfBadgesEarned } from "./badgeHelpers";
import { recalculateChallenges, checkNumberOfChallengesCompleted } from "./challengeHelpers";
import { createBackupUri, deleteFile } from "./photoHelpers";
import { createNotification } from "./notificationHelpers";
import realmConfig from "../models/index";
import { dirPictures } from "./dirStorage";
import { setISOTime } from "./dateHelpers";

const createUUID = async ( ): Promise<string> => {
  const uuidGen = await UUIDGenerator.getRandomUUID();
  return uuidGen.toLocaleLowerCase( );
};

const checkForPowerUsers = ( length, newLength ) => {
  if ( length < newLength ) {
    if ( newLength === 50 || newLength === 100 || newLength === 150 ) {
      createNotification( "badgeEarned" );
    }
  }
};

const addToCollection = async ( observation: {
  taxon: {
    default_photo: ?{
      medium_url: ?string
    },
    id: number,
    name: string,
    iconic_taxon_id: number,
    ancestor_ids: Array<number>
  }
}, image: {
  latitude?: number,
  longitude?: number,
  uri: string,
  time: number,
  errorCode: number,
  predictions: Array<Object>
} ) => {
  const {
    latitude,
    longitude,
    uri,
    time
  } = image;
  const { taxon } = observation;
  const backupUri = await createBackupUri( uri ); // needs to happen before calculating badges
  const uuid = await createUUID();

  checkNumberOfBadgesEarned();
  checkNumberOfChallengesCompleted();

  Realm.open( realmConfig ).then( ( realm ) => {
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
        iconicTaxonId: taxon.iconic_taxon_id,
        ancestorIds: taxon.ancestor_ids,
        defaultPhoto
      } );
      realm.create( "ObservationRealm", {
        uuidString: uuid,
        date: time ? setISOTime( time ) : new Date(),
        taxon: newTaxon,
        latitude: latitude || null,
        longitude: longitude || null
      } );
    } );
    const newLength = realm.objects( "TaxonRealm" ).length;
    checkForPowerUsers( length, newLength );
  } ).catch( ( e ) => {
    console.log( e, "error adding to collection" );
  } );
};

const removeFromCollection = ( id: number ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
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

const sortNewestToOldest = ( observations ) => {
  observations.sort( ( a, b ) => {
    if ( a.data.length > b.data.length ) {
      return -1;
    }
    return 1;
  } );
};

const createSectionList = ( realm: any, species: any, hideSections: boolean ): Array<{id: number, data: Array<Object>}> => {
  const obs = [];

  const taxaList = [47126, 20978, 47170, 47178, 26036, 47119, 3, 47158, 47115, 40151];

  taxaList.forEach( ( id ) => {
    const data = species.filtered( `taxon.iconicTaxonId == ${id}` ).sorted( "date", true );

    if ( hideSections ) {
      if ( data.length > 0 ) {
        obs.push( { id, data } );
      }
    } else {
      obs.push( { id, data } );
    }
  } );

  sortNewestToOldest( obs );

  const otherData = species
    .filtered( "taxon.iconicTaxonId == 1 OR taxon.iconicTaxonId == 47686 OR taxon.iconicTaxonId == 48222" )
    .sorted( "date", true );
  // added protozoans here because they weren't saving with iconicTaxonId == 1 on iOS

  if ( hideSections ) {
    if ( otherData.length > 0 ) {
      obs.push( { id: 1, data: otherData } );
    }
  } else {
    obs.push( { id: 1, data: otherData } );
  }

  return obs;
};

export {
  addToCollection,
  removeFromCollection,
  createSectionList,
  createUUID
};
