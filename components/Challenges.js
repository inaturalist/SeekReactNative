// @flow

import React, { Component } from "react";
import inatjs from "inaturalistjs";

import {
  View,
  StatusBar,
  ActivityIndicator
} from "react-native";

import ChallengeGrids from "./ChallengeGrids";
import styles from "../styles/challenges";

type Props = {
  navigation: any
}

type State = {
  taxa: Array<Object>,
  loading: boolean,
  latitude: ?number,
  longitude: ?number,
  location: string,
  error: ?string
}

class Challenges extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      taxa: [],
      loading: true,
      latitude: null,
      longitude: null,
      location: "San Francisco",
      error: null
    };

    ( this: any ).capitalizeNames = this.capitalizeNames.bind( this );
  }

  componentDidMount() {
    this.getGeolocation();
  }

  setTaxa( challenges: Array<Object> ) {
    this.setState( {
      taxa: challenges,
      loading: false
    } );
  }

  getGeolocation( ) {
    const {
      error,
      latitude,
      longitude
    } = this.state;

    navigator.geolocation.getCurrentPosition( ( position ) => {
      this.setState( {
        latitude: this.truncateCoordinates( position.coords.latitude ),
        longitude: this.truncateCoordinates( position.coords.longitude ),
        error: null
      } );
    }, ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );

    if ( !error ) {
      this.fetchChallenges( latitude, longitude );
    }
  }

  truncateCoordinates( coordinate: number ) {
    return Number( coordinate.toFixed( 2 ) );
  }

  capitalizeNames( name: string ) {
    const titleCaseName = name.split( " " )
      .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
      .join( " " );
    return titleCaseName;
  }

  fetchChallenges( latitude: ?number, longitude: ?number ) {
    const params = {
      verifiable: true,
      photos: true,
      per_page: 9,
      lat: latitude, // 37.7749, San Francisco hardcoded for testing
      lng: longitude, // -122.4194, San Francisco hardcoded for testing
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank: "species",
      include_only_vision_taxa: true,
      not_in_list_id: 945029
    };

    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const challenges = response.results.map( r => r.taxon );
      this.setTaxa( challenges );
    } );
  }

  loading( ) {
    return (
      <View style={ styles.loadingWheel }>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  results( taxa: Array<Object> ) {
    const {
      location
    } = this.state;

    return (
      <ChallengeGrids
        taxa={taxa}
        location={location}
        capitalizeNames={this.capitalizeNames}
      />
    );
  }

  render() {
    const {
      taxa,
      loading
    } = this.state;

    const challenges = loading ? this.loading( ) : this.results( taxa );

    return (
      <View style={ { flex: 1 } }>
        <View style={ styles.container }>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#4F6D7A"
          />
          { challenges }
        </View>
      </View>
    );
  }
}

export default Challenges;
