// @flow

import React, { Component } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "react-navigation";

import {
  addToCollection,
  getTaxonCommonName,
  checkForIconicTaxonId
} from "../../utility/helpers";
import FullPhotoLoading from "./FullPhotoLoading";
import { fetchAccessToken } from "../../utility/loginHelpers";
import { fetchTruncatedUserLocation, truncateCoordinates } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate } from "../../utility/dateHelpers";

type Props = {
  +navigation: any
}

type State = {
  threshold: number,
  predictions: Array<Object>,
  uri: string,
  time: string,
  latitude: number,
  longitude: number,
  speciesSeenImage: ?string,
  observation: Object,
  taxaId: ?number,
  taxaName: ?string,
  commonAncestor: ?string,
  seenDate: ?string,
  scientificName: ?string,
  match: ?boolean,
  errorCode: ?number,
  rank: ?number,
  isLoggedIn: ?boolean
};

class OfflineARResults extends Component<Props, State> {
  constructor( { navigation }: Props ) {
    super();

    const {
      uri,
      predictions,
      latitude,
      longitude,
      time
    } = navigation.state.params;

    this.state = {
      threshold: 0.7,
      predictions,
      uri,
      time,
      latitude,
      longitude,
      speciesSeenImage: null,
      observation: null,
      taxaId: null,
      taxaName: null,
      commonAncestor: null,
      seenDate: null,
      scientificName: null,
      match: null,
      errorCode: null,
      rank: null,
      isLoggedIn: null
    };
  }

  setLoggedIn( isLoggedIn: boolean ) {
    this.setState( { isLoggedIn } );
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setLocationErrorCode( errorCode: number ) {
    this.setState( { errorCode } );
  }

  getUserLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.setState( {
          latitude,
          longitude
        } );
      }
    } ).catch( ( errorCode ) => {
      this.setLocationErrorCode( errorCode );
    } );
  }

  setSeenDate( seenDate: string ) {
    this.setState( { seenDate } );
  }

  setMatch( match: boolean ) {
    this.setState( { match }, () => this.showMatch() );
  }

  setCommonAncestor( ancestor: Object, speciesSeenImage: ?string ) {
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
      this.checkSpeciesSeen( Number( species.taxon_id ) );
      this.fetchAdditionalSpeciesInfo( species );
    } else {
      this.checkForCommonAncestor();
    }
  }

  setSpeciesInfo( species: Object, taxa: Object ) {
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
    const { seenDate, match } = this.state;

    if ( !seenDate && match ) {
      await this.addObservation();
      this.navigateToMatch();
    } else {
      this.navigateToMatch();
    }
  }

  fetchAdditionalSpeciesInfo( species: Object ) {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( species.taxon_id, options ).then( ( response ) => {
      const taxa = response.results[0];
      this.setSpeciesInfo( species, taxa );
    } ).catch( () => {
      this.setSpeciesInfo( species );
    } );
  }

  fetchAdditionalAncestorInfo( ancestor: Object ) {
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

  addObservation() {
    const {
      latitude,
      longitude,
      observation,
      uri,
      time
    } = this.state;

    if ( latitude && longitude ) {
      addToCollection( observation, latitude, longitude, uri, time );
    }
  }

  checkSpeciesSeen( taxaId: number ) {
    fetchSpeciesSeenDate( taxaId ).then( ( date ) => {
      this.setSeenDate( date );
    } );
  }

  requestAndroidPermissions() {
    const { latitude, longitude } = this.state;

    if ( !latitude || !longitude ) { // Android photo gallery images should already have lat/lng
      if ( Platform.OS === "android" ) {
        checkLocationPermissions().then( ( granted ) => {
          if ( granted ) {
            this.getUserLocation();
          } else {
            this.setLocationErrorCode( 1 );
          }
        } );
      } else {
        this.getUserLocation();
      }
    }
  }

  navigateToMatch() {
    const { navigation } = this.props;
    const {
      taxaName,
      taxaId,
      time,
      speciesSeenImage,
      commonAncestor,
      seenDate,
      uri,
      scientificName,
      latitude,
      longitude,
      match,
      errorCode,
      rank,
      isLoggedIn
    } = this.state;

    navigation.push( "Match", {
      userImage: uri,
      uri,
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
      errorCode,
      rank,
      isLoggedIn
    } );
  }

  render() {
    const { uri } = this.state;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => {
            this.getLoggedIn();
            this.setARCameraVisionResults();
            this.requestAndroidPermissions();
          }}
        />
        <FullPhotoLoading uri={uri} />
      </>
    );
  }
}

export default OfflineARResults;
