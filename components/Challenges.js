import React, { Component } from "react";
import inatjs from "inaturalistjs";

import {
  View,
  StatusBar,
  ActivityIndicator
} from "react-native";

import ChallengeGrids from "./ChallengeGrids";
import styles from "../styles/challenges";

class Challenges extends Component {
  constructor() {
    super();

    this.state = {
      taxa: [],
      loading: true
    };

    this.capitalizeNames = this.capitalizeNames.bind( this );
  }

  componentDidMount() {
    const params = {
      verifiable: true,
      photos: true,
      per_page: 9,
      lat: 40.7128, // 37.7749, San Francisco hardcoded for testing
      lng: -74.0060, // -122.4194, San Francisco hardcoded for testing
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

  setTaxa( challenges ) {
    this.setState( {
      taxa: challenges,
      loading: false
    } );
  }

  capitalizeNames( name ) {
    const titleCaseName = name.split( " " )
      .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
      .join( " " );
    return titleCaseName;
  }

  loading( ) {
    return (
      <View style={ styles.loadingWheel }>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  results( taxa ) {
    return (
      <ChallengeGrids
        taxa={taxa}
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
