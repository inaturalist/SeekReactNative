// @flow

import React, { Component } from "react";
import inatjs from "inaturalistjs";
import Geocoder from "react-native-geocoder";
import Realm from "realm";
import {
  PermissionsAndroid,
  Platform,
  View,
  SafeAreaView
} from "react-native";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../models/index";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import styles from "../styles/challenges";
import taxonIds from "../utility/taxonDict";
import {
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

    const {
      taxaName,
      id,
      taxaType,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      taxa: [],
      loading: true,
      latitude,
      longitude,
      location: null,
      error: null,
      taxaType,
      // taxonId: null,
      badgeCount: 0,
      speciesCount: 0,
      taxaName,
      id,
      badgeEarned: false
    };
  }

  setTaxa( challenges: Array<Object> ) {
    this.setState( {
      taxa: challenges,
      loading: false
    } );
  }

  getGeolocation() {
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
        error: `Couldn't fetch your current location: ${err.message}.`
      } );
    } );
  }

  requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.getGeolocation();
      } else {
        this.showError( JSON.stringify( granted ) );
      }
    } catch ( err ) {
      this.showError( err );
    }
  }

  fetchUserLocation() {
    const { latitude, longitude } = this.state;

    if ( !latitude && !longitude ) {
      if ( Platform.OS === "android" ) {
        this.requestAndroidPermissions();
      } else {
        this.getGeolocation();
      }
    } else {
      this.fetchChallenges( latitude, longitude );
    }
  }

  showError( err ) {
    this.setState( {
      error: err || "Permission to access location denied",
      loading: false
    } );
  }

  fetchChallenges( latitude: ?number, longitude: ?number ) {
    console.log( this.state.latitude, this.state.longitude, this.state.location, "location stuff before" );
    this.setState( {
      loading: true
    } );
    this.updateLocation();

    console.log( this.state.latitude, this.state.longitude, this.state.location, "location stuff after" );

    const { taxaType } = this.state;

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

    console.log( taxonIds[taxaType], "taxon id from dict" );

    if ( taxonIds[taxaType] ) {
      params.taxon_id = taxonIds[taxaType];
    }

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const existingTaxonIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        params.without_taxon_id = existingTaxonIds.join( "," );
        this.fetchTaxonForChallenges( params );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
        this.fetchTaxonForChallenges( params );
      } );
  }

  fetchSpeciesAndBadgeCount() {
    let badgeCount;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        badgeCount = realm.objects( "BadgeRealm" ).filtered( "earned == true" ).length;
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const newBadgeCount = realm.objects( "BadgeRealm" ).filtered( "earned == true" ).length;
        const speciesCount = realm.objects( "ObservationRealm" ).length;
        const badgeEarned = newBadgeCount > badgeCount;

        console.log( badgeEarned, badgeCount, newBadgeCount, "is badge earned true in main" );

        this.setState( {
          speciesCount,
          badgeEarned: badgeEarned && speciesCount !== 0,
          badgeCount: newBadgeCount
        } );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchTaxonForChallenges( params ) {
    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const challenges = response.results.map( r => r.taxon );
      this.setTaxa( challenges );
    } ).catch( ( err ) => {
      this.setState( {
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
        error: `${err}: We weren't able to determine your location. Please try again.`
      } );
    } );
  }

  updateTaxonId() {
    const { taxaType } = this.state;

    this.setState( {
      taxonId: taxonIds[taxaType]
    } );
  }

  updateLocation() {
    const { latitude, longitude } = this.state;
    this.reverseGeocodeLocation( latitude, longitude );
  }

  render() {
    const {
      taxaName,
      error,
      loading,
      latitude,
      longitude,
      location,
      profileIcon,
      badgeCount,
      speciesCount,
      taxaType,
      taxa,
      id,
      badgeEarned
    } = this.state;

    const {
      navigation
    } = this.props;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.mainContainer}>
          <NavigationEvents
            onWillFocus={() => {
              this.fetchSpeciesAndBadgeCount();
              this.fetchUserLocation();
            }}
          />
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
            taxaName={taxaName}
            error={error}
            id={id}
            badgeEarned={badgeEarned}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default MainScreen;
