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
import taxonIds from "../utility/taxonDict";
import {
  capitalizeNames,
  recalculateBadges,
  truncateCoordinates,
  getPreviousAndNextMonth
} from "../utility/helpers";

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
      errorTitle: null,
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
    recalculateBadges();
    this.fetchSpeciesAndBadgeCount();
  }

  setTaxa( challenges: Array<Object> ) {
    this.setState( {
      taxa: challenges,
      loading: false
    } );
  }

  setTaxonId( taxa ) {
    const { latitude, longitude } = this.state;

    if ( taxonIds[taxa] ) {
      this.setState( {
        taxonId: taxonIds[taxa],
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
      not_in_list_id: 945029,
      month: getPreviousAndNextMonth()
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
          badgeCount: realm.objects( "BadgeRealm" ).filtered( "earned == true" ).length
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
        errorTitle: "Bummer",
        error: `Unable to load challenges: ${err.message}`
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
      error,
      errorTitle,
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
            error={error}
            errorTitle={errorTitle}
          />
        </View>
      </View>
    );
  }
}

export default MainScreen;
