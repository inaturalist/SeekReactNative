// @flow

import React, { Component } from "react";
import { View, Platform } from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import Realm from "realm";
import moment from "moment";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models";
import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import config from "../../config";
import styles from "../../styles/results/confirm";
import {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName
} from "../../utility/helpers";
import { fetchTruncatedUserLocation, checkLocationPermissions } from "../../utility/locationHelpers";
import { resizeImage } from "../../utility/photoHelpers";
import createUserAgent from "../../utility/userAgent";

type Props = {
  +navigation: any
}

class OnlineServerResults extends Component<Props> {
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
      rank: null
    };

    this.checkForMatches = this.checkForMatches.bind( this );
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
            this.getGeolocation();
          }
        } );
      } else {
        this.getGeolocation();
      }
    }
  }

  setMatch( match ) {
    const { clicked } = this.state;
    this.setState( { match }, () => {
      if ( clicked ) {
        this.checkForMatches();
      }
    } );
  }

  setImageUri( uri ) {
    this.setState( { userImage: uri }, () => this.getParamsForOnlineVision() );
  }

  setSeenDate( seenDate ) {
    this.setState( { seenDate } );
  }

  setNumberOfHours( numberOfHours ) {
    this.setState( { numberOfHours } );
  }

  setError( error ) {
    this.setState( { error } );
  }

  setLocationErrorCode( errorCode ) {
    this.setState( { errorCode } );
  }

  setOnlineVisionSpeciesOnlineServerResults( species ) {
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

  setOnlineVisionAncestorResults( commonAncestor ) {
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
      this.navigateTo( "Match" );
    } else {
      this.navigateTo( "Match" );
    }
  }

  showNoMatch() {
    this.navigateTo( "Match" );
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

  createJwtToken() {
    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const token = jwt.encode( claims, config.jwtSecret, "HS512" );
    return token;
  }

  fetchScore( params ) {
    const token = this.createJwtToken();

    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.computervision.score_image( params, options )
      .then( ( response ) => {
        const species = response.results[0];
        const commonAncestor = response.common_ancestor;

        if ( species.combined_score > 85 ) {
          this.checkDateSpeciesSeen( species.taxon.id );
          this.setOnlineVisionSpeciesResults( species );
        } else if ( commonAncestor ) {
          this.setOnlineVisionAncestorResults( commonAncestor );
        } else {
          this.setMatch( false );
        }
      } ).catch( ( { response } ) => {
        if ( response.status && response.status === 503 ) {
          const gmtTime = response.headers.map["retry-after"];
          const currentTime = moment();
          const retryAfter = moment( gmtTime );

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

  checkForMatches() {
    const { match } = this.state;

    this.setState( { clicked: true } );

    if ( match === true ) {
      this.showMatch();
    } else if ( match === false ) {
      this.showNoMatch();
    }
  }

  navigateTo( route ) {
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
      rank
    } = this.state;

    navigation.push( route, {
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
      rank
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
      <View style={styles.container}>
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
              navigation={navigation}
              number={numberOfHours}
            />
          ) : (
            <ConfirmScreen
              checkForMatches={this.checkForMatches}
              clicked={clicked}
              image={uri}
              match={match}
              navigation={navigation}
            />
          )}
      </View>
    );
  }
}

export default OnlineServerResults;
