// @flow

import React, { Component } from "react";
import { View, Platform } from "react-native";
import inatjs from "inaturalistjs";
import Realm from "realm";
import moment from "moment";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models";
import styles from "../../styles/results/results";
import {
  addToCollection,
  getTaxonCommonName,
  checkForIconicTaxonId
} from "../../utility/helpers";
import { resizeImage } from "../../utility/photoHelpers";
import { fetchAccessToken } from "../../utility/loginHelpers";
import FullPhotoLoading from "./FullPhotoLoading";
import { fetchTruncatedUserLocation, checkLocationPermissions } from "../../utility/locationHelpers";
import createUserAgent from "../../utility/userAgent";

type Props = {
  +navigation: any
}

class OfflineARResults extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      uri,
      predictions,
      latitude,
      longitude,
      backupUri,
      time
    } = navigation.state.params;

    this.state = {
      threshold: 0.7,
      predictions,
      uri,
      backupUri,
      time,
      latitude,
      longitude,
      userImage: null,
      speciesSeenImage: null,
      observation: null,
      taxaId: null,
      taxaName: null,
      commonAncestor: null,
      seenDate: null,
      scientificName: null,
      imageForUploading: null,
      match: null,
      isLoggedIn: null,
      errorCode: null,
      rank: null
    };
  }

  setLocationErrorCode( errorCode ) {
    this.setState( { errorCode }, () => this.resizeImage() );
  }

  getGeolocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.setState( {
          latitude,
          longitude
        } );
      }
      this.resizeImage();
    } ).catch( ( errorCode ) => {
      this.setLocationErrorCode( errorCode );
    } );
  }

  setLoggedIn( isLoggedIn ) {
    this.setState( { isLoggedIn } );
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setImageForUploading( imageForUploading ) {
    this.setState( { imageForUploading } );
  }

  setImageUri( uri ) {
    this.setState( { userImage: uri }, () => this.setARCameraVisionResults() );
  }

  setSeenDate( seenDate ) {
    this.setState( { seenDate } );
  }

  setMatch( match ) {
    this.setState( { match }, () => this.checkForMatches() );
  }

  setCommonAncestor( ancestor, speciesSeenImage ) {
    getTaxonCommonName( ancestor.taxon_id ).then( ( commonName ) => {
      this.setState( {
        commonAncestor: commonName || ancestor.name,
        taxaId: ancestor.taxon_id,
        speciesSeenImage,
        scientificName: ancestor.name,
        rank: ancestor.rank
      }, () => this.setMatch( false ) );
    } );
  }

  setARCameraVisionResults() {
    const { predictions, threshold } = this.state;

    const ancestorIds = [];

    if ( Platform.OS === "ios" ) {
      predictions.forEach( ( prediction ) => {
        ancestorIds.push( Number( prediction.taxon_id ) );
      } );
    }
    // adding ancestor ids to take iOS camera experience offline

    const species = predictions.find( leaf => ( leaf.rank === 10 && leaf.score > threshold ) );

    if ( species ) {
      if ( Platform.OS === "ios" ) {
        species.ancestor_ids = ancestorIds.sort();
      }
      this.checkDateSpeciesSeen( Number( species.taxon_id ) );
      this.fetchAdditionalSpeciesInfo( species );
    } else {
      this.checkForCommonAncestor();
    }
  }

  setSpeciesInfo( species, taxa ) {
    const taxaId = Number( species.taxon_id );

    const iconicTaxonId = checkForIconicTaxonId( species.ancestor_ids );

    getTaxonCommonName( species.taxon_id ).then( ( commonName ) => {
      this.setState( {
        taxaId,
        taxaName: commonName || species.name,
        scientificName: species.name,
        observation: {
          taxon: {
            default_photo: taxa && taxa.default_photo ? taxa.default_photo : null,
            id: taxaId,
            name: species.name,
            preferred_common_name: commonName,
            iconic_taxon_id: iconicTaxonId,
            ancestor_ids: species.ancestor_ids
          }
        },
        speciesSeenImage:
          taxa && taxa.taxon_photos[0]
            ? taxa.taxon_photos[0].photo.medium_url
            : null
      }, () => this.setMatch( true ) );
    } );
  }

  async showMatch() {
    const { seenDate } = this.state;

    if ( !seenDate ) {
      await this.addObservation();
      this.navigateTo( "Match" );
    } else {
      this.navigateTo( "Match" );
    }
  }

  showNoMatch() {
    this.navigateTo( "Match" );
  }

  checkForMatches() {
    const { match } = this.state;

    if ( match === true ) {
      this.showMatch();
    } else if ( match === false ) {
      this.showNoMatch();
    }
  }

  fetchAdditionalSpeciesInfo( species ) {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( species.taxon_id, options ).then( ( response ) => {
      const taxa = response.results[0];
      this.setSpeciesInfo( species, taxa );
    } ).catch( () => {
      this.setSpeciesInfo( species );
    } );
  }

  fetchAdditionalAncestorInfo( ancestor ) {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( ancestor.taxon_id, options ).then( ( response ) => {
      const taxa = response.results[0];
      const speciesSeenImage = taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
      this.setCommonAncestor( ancestor, speciesSeenImage );
    } ).catch( () => {
      this.setCommonAncestor( ancestor );
    } );
  }

  checkForCommonAncestor() {
    const { predictions, threshold } = this.state;
    const reversePredictions = predictions.reverse();

    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank !== 100 ) {
      this.fetchAdditionalAncestorInfo( ancestor );
    } else {
      this.setMatch( false );
    }
  }

  resizeImage() {
    const { uri } = this.state;

    resizeImage( uri, 299 ).then( ( userImage ) => {
      if ( userImage ) {
        this.setImageUri( userImage );
      } else {
        console.log( "error resizing image" );
      }
    } ).catch( () => console.log( "error resizing image" ) );
  }

  resizeImageForUploading() {
    const { uri } = this.state;

    resizeImage( uri, 2048 ).then( ( userImage ) => {
      if ( userImage ) {
        this.setImageForUploading( userImage );
      } else {
        console.log( "error resizing image" );
      }
    } ).catch( () => console.log( "error resizing image" ) );
  }

  addObservation() {
    const {
      latitude,
      longitude,
      observation,
      uri,
      backupUri,
      time
    } = this.state;

    if ( latitude && longitude ) {
      addToCollection( observation, latitude, longitude, uri, time, backupUri );
    }
  }

  checkDateSpeciesSeen( taxaId ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const seenTaxaIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        if ( seenTaxaIds.includes( taxaId ) ) {
          const seenTaxa = realm.objects( "ObservationRealm" ).filtered( `taxon.id == ${taxaId}` );
          const seenDate = moment( seenTaxa[0].date ).format( "ll" );
          this.setSeenDate( seenDate );
        } else {
          this.setSeenDate( null );
        }
      } ).catch( () => {
        this.setSeenDate( null );
      } );
  }

  requestAndroidPermissions() {
    if ( Platform.OS === "android" ) {
      checkLocationPermissions().then( ( granted ) => {
        if ( granted ) {
          this.getGeolocation();
        } else {
          this.setLocationErrorCode( 1 );
        }
      } );
    } else {
      this.getGeolocation();
    }
  }

  navigateTo( route ) {
    const { navigation } = this.props;
    const {
      userImage,
      taxaName,
      taxaId,
      time,
      speciesSeenImage,
      commonAncestor,
      seenDate,
      imageForUploading,
      scientificName,
      latitude,
      longitude,
      match,
      isLoggedIn,
      errorCode,
      rank
    } = this.state;

    navigation.push( route, {
      userImage,
      image: imageForUploading,
      taxaName,
      taxaId,
      time,
      speciesSeenImage,
      seenDate,
      scientificName,
      latitude,
      longitude,
      commonAncestor,
      match,
      isLoggedIn,
      errorCode,
      rank
    } );
  }

  render() {
    const { uri } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.requestAndroidPermissions();
            this.getLoggedIn();
            this.resizeImageForUploading();
          }}
        />
        <FullPhotoLoading uri={uri} />
      </View>
    );
  }
}

export default OfflineARResults;
