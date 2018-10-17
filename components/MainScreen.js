// @flow

import React, { Component } from "react";
import inatjs from "inaturalistjs";
import Geocoder from "react-native-geocoder";

import {
  View,
  StatusBar
} from "react-native";

import ChallengeScreen from "./Challenges/ChallengeScreen";
import LoadingScreen from "./LoadingScreen";
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
  error: ?string,
  speciesCount: number,
  profileIcon: string
}

class MainScreen extends Component<Props, State> {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      taxa: [],
      loading: true,
      latitude: null,
      longitude: null,
      location: null,
      error: null,
      taxonId: null,
      speciesCount: 115
    };

    ( this: any ).capitalizeNames = this.capitalizeNames.bind( this );
    ( this: any ).updateLocation = this.updateLocation.bind( this );
    ( this: any ).setTaxonId = this.setTaxonId.bind( this );
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

  setTaxonId( taxa ) {
    if ( taxa === "plants" ) {
      this.setState( {
        taxonId: 47126
      } );
    } else if ( taxa === "amphibians" ) {
      this.setState( {
        taxonId: 20978
      } );
    } else if ( taxa === "fungi" ) {
      this.setState( {
        taxonId: 47170
      } );
    } else if ( taxa === "fish" ) {
      this.setState( {
        taxonId: 47178
      } );
    } else if ( taxa === "reptiles" ) {
      this.setState( {
        taxonId: 26036
      } );
    } else if ( taxa === "arachnids" ) {
      this.setState( {
        taxonId: 47119
      } );
    } else if ( taxa === "birds" ) {
      this.setState( {
        taxonId: 3
      } );
    } else if ( taxa === "insects" ) {
      this.setState( {
        taxonId: 47158
      } );
    } else if ( taxa === "mollusks" ) {
      this.setState( {
        taxonId: 47115
      } );
    } else if ( taxa === "mammals" ) {
      this.setState( {
        taxonId: 40151
      } );
    } else {
      this.setState ( {
        taxonId: null
      } );
    }
  }

  getGeolocation( ) {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const latitude = this.truncateCoordinates( position.coords.latitude );
      const longitude = this.truncateCoordinates( position.coords.longitude );

      this.setState( {
        latitude,
        longitude,
        location: this.reverseGeocodeLocation( latitude, longitude ),
        error: null
      }, () => this.fetchChallenges( this.state.latitude, this.state.longitude ) );
    }, ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
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

    console.log( "params: ", params );

    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const challenges = response.results.map( r => r.taxon );
      this.setTaxa( challenges );
    } ).catch( ( err ) => {
      console.log( err );
      this.setState( {
        error: err.message
      } );
    } );
  }

  reverseGeocodeLocation( latitude, longitude ) {
    Geocoder.geocodePosition( { lat: latitude, lng: longitude } ).then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      this.setState( {
        location: locality || subAdminArea
      } ); // might need an error state here
      console.log(result, "reverse geocode location result");
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
  }

  updateLocation( latitude, longitude ) {
    this.setState( {
      latitude,
      longitude,
      location: this.reverseGeocodeLocation( latitude, longitude )
    }, () => this.fetchChallenges( this.state.latitude, this.state.longitude ) );
    console.log("updated location", latitude, longitude);
  }

  results( taxa: Array<Object> ) {
    const {
      latitude,
      longitude,
      location,
      profileIcon,
      speciesCount
    } = this.state;

    const {
      navigation
    } = this.props;

    return (
      <ChallengeScreen
        taxa={taxa}
        latitude={latitude}
        longitude={longitude}
        location={location}
        capitalizeNames={this.capitalizeNames}
        profileIcon={profileIcon}
        navigation={navigation}
        speciesCount={speciesCount}
        updateLocation={this.updateLocation}
        setTaxonId={this.setTaxonId}
      />
    );
  }

  render() {
    const {
      loading,
      taxa
    } = this.state;

    const challenges = loading ? <LoadingScreen /> : this.results( taxa );

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

export default MainScreen;
