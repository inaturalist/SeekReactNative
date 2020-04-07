// @flow

import React, { Component } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "@react-navigation/compat";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import {
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName,
  createJwtToken
} from "../../utility/helpers";
import { addToCollection } from "../../utility/observationHelpers";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import { resizeImage } from "../../utility/photoHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, createTimestamp } from "../../utility/dateHelpers";

type Props = {
  +route: any,
  +navigation: any
}

type State = {
  image: Object,
  taxon: Object,
  userImage: ?string,
  observation: ?Object,
  seenDate: ?string,
  error: ?string,
  match: ?boolean,
  clicked: boolean,
  numberOfHours: ?string,
  errorCode: ?number
};

class OnlineServerResults extends Component<Props, State> {
  constructor( { route }: Props ) {
    super();

    const { image } = route.params;

    this.state = {
      taxon: {},
      image,
      userImage: null,
      observation: null,
      seenDate: null,
      error: null,
      match: null,
      clicked: false,
      numberOfHours: null,
      errorCode: null
    };

    ( this:any ).checkForMatches = this.checkForMatches.bind( this );
  }

  getUserLocation() {
    const { image } = this.state;
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        image.latitude = latitude;
        image.longitude = longitude;

        this.setState( { image } );
      }
    } ).catch( ( errorCode ) => {
      this.setLocationErrorCode( errorCode );
    } );
  }

  getLocation() {
    const { image } = this.state;

    if ( !image.latitude || !image.longitude ) {
      // check to see if there are already photo coordinates
      if ( Platform.OS === "android" ) {
        checkLocationPermissions().then( ( granted ) => {
          if ( granted ) {
            this.getUserLocation();
          }
        } );
      } else {
        this.getUserLocation();
      }
    }
  }

  setMatch( match: boolean ) {
    const { clicked } = this.state;
    this.setState( { match }, () => {
      if ( clicked ) {
        this.checkForMatches();
      }
    } );
  }

  setImageUri( uri: string ) {
    this.setState( { userImage: uri }, () => this.getParamsForOnlineVision() );
  }

  setSeenDate( seenDate: ?string ) {
    this.setState( { seenDate } );
  }

  setNumberOfHours( numberOfHours: string ) {
    this.setState( { numberOfHours } );
  }

  setError( error: string ) {
    this.setState( { error } );
  }

  setLocationErrorCode( errorCode: number ) {
    this.setState( { errorCode } );
  }

  setTaxon( taxon: Object, match: boolean ) {
    this.setState( { taxon }, () => this.setMatch( match ) );
  }

  setOnlineVisionSpeciesResults( species: Object ) {
    const { taxon } = species;
    const photo = taxon.default_photo;

    getTaxonCommonName( taxon.id ).then( ( commonName ) => {
      const newTaxon = {
        taxaId: taxon.id,
        taxaName: capitalizeNames( commonName || taxon.name ),
        scientificName: taxon.name,
        speciesSeenImage: photo ? photo.medium_url : null
      };

      this.setTaxon( newTaxon, true );
      this.setState( { observation: species } );
    } );
  }

  setOnlineVisionAncestorResults( commonAncestor: Object ) {
    const { taxon } = commonAncestor;
    const photo = taxon.default_photo;

    getTaxonCommonName( taxon.id ).then( ( commonName ) => {
      const newTaxon = {
        commonAncestor: commonAncestor
          ? capitalizeNames( commonName || taxon.name )
          : null,
        taxaId: taxon.id,
        speciesSeenImage: photo ? photo.medium_url : null,
        scientificName: taxon.name,
        rank: taxon.rank_level
      };

      this.setTaxon( newTaxon, false );
    } );
  }

  getParamsForOnlineVision() {
    const {
      userImage,
      image
    } = this.state;

    const params = flattenUploadParameters( userImage, image.time, image.latitude, image.longitude );

    this.fetchScore( params );
  }

  async showMatch() {
    const { seenDate } = this.state;

    if ( !seenDate ) {
      await this.addObservation();
      this.navigateToMatch();
    } else {
      this.navigateToMatch();
    }
  }

  showNoMatch() {
    this.navigateToMatch();
  }

  resizeImage() {
    const { image } = this.state;

    resizeImage( image.uri, 299 ).then( ( userImage ) => {
      if ( userImage ) {
        this.setImageUri( userImage );
      } else {
        this.setError( "image" );
      }
    } ).catch( () => this.setError( "image" ) );
  }

  fetchScore( params: Object ) {
    const token = createJwtToken();

    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.computervision.score_image( params, options )
      .then( ( response ) => {
        const species = response.results[0];
        const commonAncestor = response.common_ancestor;

        if ( species.combined_score > 85 && species.taxon.rank === "species" ) {
          this.checkSpeciesSeen( species.taxon.id );
          this.setOnlineVisionSpeciesResults( species );
        } else if ( commonAncestor ) {
          this.setOnlineVisionAncestorResults( commonAncestor );
        } else {
          this.setMatch( false );
        }
      } ).catch( ( { response } ) => {
        if ( response.status && response.status === 503 ) {
          const gmtTime = response.headers.map["retry-after"];
          const currentTime = createTimestamp();
          const retryAfter = createTimestamp( gmtTime );

          const hours = ( retryAfter - currentTime ) / 60 / 60 / 1000;

          if ( hours ) {
            this.setNumberOfHours( hours.toFixed( 0 ) );
          }
          this.setError( "downtime" );
        } else {
          this.setError( "onlineVision" );
        }
      } );
  }

  addObservation() {
    const {
      image,
      observation
    } = this.state;

    if ( image.latitude && image.longitude ) {
      addToCollection( observation, image.latitude, image.longitude, image.uri, image.time );
    }
  }

  checkSpeciesSeen( taxaId: number ) {
    fetchSpeciesSeenDate( taxaId ).then( ( date ) => {
      this.setSeenDate( date );
    } );
  }

  checkForMatches() {
    const { match } = this.state;

    this.setState( { clicked: true } );

    if ( match === true ) {
      this.showMatch();
    } else if ( match === false ) {
      this.showNoMatch();
    }
  }

  navigateToMatch() {
    const { navigation } = this.props;
    const {
      image,
      taxon,
      seenDate,
      match,
      errorCode
    } = this.state;

    console.log( taxon, "taxon in results" );

    navigation.push( "Match", {
      image,
      taxon,
      seenDate,
      match,
      errorCode
    } );
  }

  render() {
    const {
      image,
      error,
      match,
      clicked,
      numberOfHours
    } = this.state;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => {
            this.getLocation();
            this.resizeImage();
          }}
        />
        {error
          ? (
            <ErrorScreen
              error={error}
              number={numberOfHours}
            />
          ) : (
            <ConfirmScreen
              checkForMatches={this.checkForMatches}
              clicked={clicked}
              image={image.uri}
              match={match}
            />
          )}
      </>
    );
  }
}

export default OnlineServerResults;
