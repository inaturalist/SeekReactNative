// @flow

import React, { Component } from "react";
import inatjs from "inaturalistjs";
import Geocoder from "react-native-geocoder";
import Realm from "realm";
import {
  View
} from "react-native";

import realmConfig from "../models/index";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import styles from "../styles/challenges";
import { capitalizeNames, truncateCoordinates } from "../utility/helpers";

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
      bannerText: ` collected!`,
      loading: true,
      latitude: null,
      longitude: null,
      location: null,
      error: null,
      taxaType: "All species",
      taxonId: null,
      badgeCount: 0,
      speciesCount: 0
    };

    ( this: any ).updateLocation = this.updateLocation.bind( this );
    ( this: any ).setTaxonId = this.setTaxonId.bind( this );
  }

  componentDidMount() {
    this.getGeolocation();
    this.fetchSpeciesAndBadgeCount();

    console.log( this.props.navigation, 'navigation');
  }

  setTaxa( challenges: Array<Object> ) {
    this.setState( {
      taxa: challenges,
      loading: false
    } );
  }

  setTaxonId( taxa ) {
    const { latitude, longitude } = this.state;

    if ( taxa === "plants" ) {
      this.setState( {
        taxonId: 47126,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "amphibians" ) {
      this.setState( {
        taxonId: 20978,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "fungi" ) {
      this.setState( {
        taxonId: 47170,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "fish" ) {
      this.setState( {
        taxonId: 47178,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "reptiles" ) {
      this.setState( {
        taxonId: 26036,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "arachnids" ) {
      this.setState( {
        taxonId: 47119,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "birds" ) {
      this.setState( {
        taxonId: 3,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "insects" ) {
      this.setState( {
        taxonId: 47158,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "mollusks" ) {
      this.setState( {
        taxonId: 47115,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else if ( taxa === "mammals" ) {
      this.setState( {
        taxonId: 40151,
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => this.fetchChallenges( latitude, longitude ) );
    } else {
      this.setState( {
        taxonId: null,
        loading: true,
        taxaType: "All species"
      }, () => this.fetchChallenges( latitude, longitude ) );
    }
  }

  getGeolocation( ) {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const latitude = truncateCoordinates( position.coords.latitude );
      const longitude = truncateCoordinates( position.coords.longitude );

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

  fetchChallenges( latitude: ?number, longitude: ?number ) {
    const { taxonId } = this.state;

    const params = {
      verifiable: true,
      photos: true,
      per_page: 9,
      lat: latitude,
      lng: longitude,
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank: "species",
      include_only_vision_taxa: true,
      not_in_list_id: 945029
    };

    if ( taxonId ) {
      params.taxon_id = taxonId;
    }

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const existingTaxonIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        params.without_taxon_id = existingTaxonIds.join( "," );
        this.fetchTaxonForChallenges( params );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
        this.fetchTaxonForChallenges( params );
      } );
  }

  fetchSpeciesAndBadgeCount() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        this.setState( {
          speciesCount: realm.objects( "ObservationRealm" ).length,
          badgeCount: realm.objects( "BadgeRealm" ).length
        } );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchTaxonForChallenges( params ) {
    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const challenges = response.results.map( r => r.taxon );
      this.setTaxa( challenges );
    } ).catch( ( err ) => {
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
      location: this.reverseGeocodeLocation( latitude, longitude ),
      loading: true
    }, () => this.fetchChallenges( this.state.latitude, this.state.longitude ) );
  }

  render() {
    const {
      speciesSeen,
      bannerText,
      loading,
      latitude,
      longitude,
      location,
      profileIcon,
      badgeCount,
      speciesCount,
      taxaType,
      taxa
    } = this.state;

    const {
      navigation
    } = this.props;

    return (
      <View style={ { flex: 1 } }>
        <View style={ styles.container }>
          <ChallengeScreen
            taxa={taxa}
            taxaType={taxaType}
            latitude={latitude}
            loading={loading}
            longitude={longitude}
            location={location}
            profileIcon={profileIcon}
            navigation={navigation}
            badgeCount={badgeCount}
            speciesCount={speciesCount}
            updateLocation={this.updateLocation}
            setTaxonId={this.setTaxonId}
            speciesSeen={speciesSeen}
            bannerText={bannerText}
          />
        </View>
      </View>
    );
  }
}

export default MainScreen;
