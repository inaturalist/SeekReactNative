// @flow

import React, { Component } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "react-navigation";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName,
  createJwtToken
} from "../../utility/helpers";
import { fetchAccessToken } from "../../utility/loginHelpers";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import { resizeImage } from "../../utility/photoHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, createTimestamp } from "../../utility/dateHelpers";

type Props = {
  +navigation: any
}

type State = {
  uri: string,
  time: Date,
  latitude: number,
  longitude: number,
  userImage: ?string,
  speciesSeenImage: ?string,
  observation: ?Object,
  taxaId: ?number,
  taxaName: ?string,
  commonAncestor: ?string,
  seenDate: ?string,
  error: ?string,
  scientificName: ?string,
  match: ?boolean,
  clicked: boolean,
  numberOfHours: ?string,
  errorCode: ?number,
  rank: ?number,
  isLoggedIn: ?boolean
};

class OnlineServerResults extends Component<Props, State> {
  constructor( { navigation }: Props ) {
    super();

    const {
      uri,
      time,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      uri,
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
      error: null,
      scientificName: null,
      match: null,
      clicked: false,
      numberOfHours: null,
      errorCode: null,
      rank: null,
      isLoggedIn: null
    };

    ( this:any ).checkForMatches = this.checkForMatches.bind( this );
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

  getLocation() {
    const { latitude, longitude } = this.state;

    if ( !latitude || !longitude ) { // check to see if there are already photo coordinates
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

  setOnlineVisionSpeciesResults( species: Object ) {
    const { taxon } = species;
    const photo = taxon.default_photo;

    getTaxonCommonName( taxon.id ).then( ( commonName ) => {
      this.setState( {
        observation: species,
        taxaId: taxon.id,
        taxaName: capitalizeNames( commonName || taxon.name ),
        scientificName: taxon.name,
        speciesSeenImage: photo ? photo.medium_url : null
      }, () => this.setMatch( true ) );
    } );
  }

  setOnlineVisionAncestorResults( commonAncestor: Object ) {
    const { taxon } = commonAncestor;
    const photo = taxon.default_photo;

    getTaxonCommonName( taxon.id ).then( ( commonName ) => {
      this.setState( {
        commonAncestor: commonAncestor
          ? capitalizeNames( commonName || taxon.name )
          : null,
        taxaId: taxon.id,
        speciesSeenImage: photo ? photo.medium_url : null,
        scientificName: taxon.name,
        rank: taxon.rank_level
      }, () => this.setMatch( false ) );
    } );
  }

  getParamsForOnlineVision() {
    const {
      userImage,
      time,
      latitude,
      longitude
    } = this.state;

    const params = flattenUploadParameters( userImage, time, latitude, longitude );

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
    const { uri } = this.state;

    resizeImage( uri, 299 ).then( ( userImage ) => {
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

        if ( species.combined_score > 85 ) {
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
      userImage,
      taxaName,
      taxaId,
      speciesSeenImage,
      commonAncestor,
      seenDate,
      uri,
      scientificName,
      latitude,
      longitude,
      time,
      match,
      errorCode,
      rank,
      isLoggedIn
    } = this.state;

    navigation.push( "Match", {
      userImage,
      uri,
      taxaName,
      taxaId,
      speciesSeenImage,
      seenDate,
      scientificName,
      latitude,
      longitude,
      time,
      commonAncestor,
      match,
      errorCode,
      rank,
      isLoggedIn
    } );
  }

  render() {
    const {
      uri,
      error,
      match,
      clicked,
      numberOfHours
    } = this.state;
    const { navigation } = this.props;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => {
            this.getLoggedIn();
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
              image={uri}
              match={match}
            />
          )}
      </>
    );
  }
}

export default OnlineServerResults;
