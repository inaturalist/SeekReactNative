// @flow

import React, { Component } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "@react-navigation/compat";

import {
  getTaxonCommonName,
  checkForIconicTaxonId
} from "../../utility/helpers";
import { addToCollection } from "../../utility/observationHelpers";
import FullPhotoLoading from "./FullPhotoLoading";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate } from "../../utility/dateHelpers";

const threshold = 0.7;

type Props = {
  +route: any,
  +navigation: any
}

type State = {
  image: Object,
  taxon: Object,
  observation: Object,
  seenDate: ?string,
  match: ?boolean,
  errorCode: ?number
};

class OfflineARResults extends Component<Props, State> {
  constructor( { route }: Props ) {
    super();

    const { image } = route.params;

    this.state = {
      taxon: {},
      image,
      observation: null,
      seenDate: null,
      match: null,
      errorCode: null
    };
  }

  setLocationErrorCode( errorCode: number ) {
    this.setState( { errorCode } );
  }

  getUserLocation() {
    const { image } = this.state;
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        image.latitude = latitude;
        image.longitude = longitude;

        this.setState( { image }, () => this.setARCameraVisionResults() );
      } else {
        this.setARCameraVisionResults();
      }
    } ).catch( ( errorCode ) => {
      this.setLocationErrorCode( errorCode );
      this.setARCameraVisionResults();
    } );
  }

  setSeenDate( seenDate: string ) {
    this.setState( { seenDate } );
  }

  setMatch( match: boolean ) {
    this.setState( { match }, () => this.showMatch() );
  }

  setTaxon( taxon: Object, match: boolean ) {
    this.setState( { taxon }, () => this.setMatch( match ) );
  }

  setCommonAncestor( ancestor: Object, speciesSeenImage: ?string ) {
    getTaxonCommonName( ancestor.taxon_id ).then( ( commonName ) => {
      const newTaxon = {
        commonAncestor: commonName || ancestor.name,
        taxaId: ancestor.taxon_id,
        speciesSeenImage,
        scientificName: ancestor.name,
        rank: ancestor.rank
      };

      this.setTaxon( newTaxon, false );
    } );
  }

  setARCameraVisionResults() {
    const { image } = this.state;

    const ancestorIds = [];

    if ( Platform.OS === "ios" ) {
      image.predictions.forEach( ( prediction ) => {
        ancestorIds.push( Number( prediction.taxon_id ) );
      } );
    }
    // adding ancestor ids to take iOS camera experience offline

    const species = image.predictions.find( leaf => ( leaf.rank === 10 && leaf.score > threshold ) );

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
        observation: {
          taxon: {
            default_photo: taxa && taxa.default_photo ? taxa.default_photo : null,
            id: taxaId,
            name: species.name,
            preferred_common_name: commonName,
            iconic_taxon_id: iconicTaxonId,
            ancestor_ids: species.ancestor_ids
          }
        }
      } );

      const newTaxon = {
        taxaId,
        taxaName: commonName || species.name,
        scientificName: species.name,
        speciesSeenImage:
          taxa && taxa.taxon_photos[0]
            ? taxa.taxon_photos[0].photo.medium_url
            : null
      };

      this.setTaxon( newTaxon, true );
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
    const { image } = this.state;
    const reversePredictions = image.predictions.reverse();

    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank !== 100 ) {
      this.fetchAdditionalAncestorInfo( ancestor );
    } else {
      this.setMatch( false );
    }
  }

  addObservation() {
    const {
      image,
      observation
    } = this.state;

    if ( image.latitude && image.longitude ) {
      // bug, user location isn't loading fast enough & sometimes is null
      addToCollection( observation, image );
    }
  }

  checkSpeciesSeen( taxaId: number ) {
    fetchSpeciesSeenDate( taxaId ).then( ( date ) => {
      this.setSeenDate( date );
    } );
  }

  requestAndroidPermissions() {
    const { image } = this.state;

    if ( !image.latitude || !image.longitude ) {
      // Android photo gallery images should already have lat/lng
      if ( Platform.OS === "android" ) {
        checkLocationPermissions().then( ( granted ) => {
          if ( granted ) {
            this.getUserLocation();
          } else {
            this.setLocationErrorCode( 1 );
            this.setARCameraVisionResults();
          }
        } );
      } else {
        this.getUserLocation();
      }
    } else {
      this.setARCameraVisionResults();
    }
  }

  navigateToMatch() {
    const { navigation } = this.props;
    const {
      taxon,
      image,
      seenDate,
      errorCode
    } = this.state;

    navigation.push( "Match", {
      taxon,
      image,
      seenDate,
      errorCode
    } );
  }

  render() {
    const { image } = this.state;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => {
            this.requestAndroidPermissions();
          }}
        />
        <FullPhotoLoading uri={image.uri} />
      </>
    );
  }
}

export default OfflineARResults;
