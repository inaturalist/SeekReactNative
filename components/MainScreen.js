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

    const { taxaName } = navigation.state.params;

    this.state = {
      taxa: [],
      loading: true,
      latitude: null,
      longitude: null,
      location: null,
      error: null,
      taxaType: "All species",
      taxonId: null,
      badgeCount: 0,
      speciesCount: 0,
      taxaName
    };

    ( this: any ).updateLocation = this.updateLocation.bind( this );
    ( this: any ).setTaxonId = this.setTaxonId.bind( this );
  }

  componentDidMount() {
    if ( Platform.OS === "android" ) {
      this.requestAndroidPermissions();
    } else {
      this.getGeolocation();
    }
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
    const { navigation } = this.props;

    if ( taxonIds[taxa] ) {
      this.setState( {
        taxonId: taxonIds[taxa],
        loading: true,
        taxaType: capitalizeNames( taxa )
      }, () => {
        navigation.navigate( "Main", { taxaName: null } );
        this.fetchChallenges( latitude, longitude );
      } );
    } else {
      this.setState( {
        taxonId: null,
        loading: true,
        taxaType: "All species"
      }, () => {
        navigation.navigate( "Main", { taxaName: null } );
        this.fetchChallenges( latitude, longitude );
      } );
    }
  }

  getGeolocation( ) {
    const { location } = this.state;

    if ( !location ) {
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

  showError( err ) {
    this.setState( {
      error: err || "Permission to access location denied",
      loading: false
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

  updateLocation( latitude, longitude, location ) {
    const { navigation } = this.props;

    this.setState( {
      latitude,
      longitude,
      location,
      loading: true
    }, () => {
      navigation.navigate( "Main", { taxaName: null } );
      this.fetchChallenges( this.state.latitude, this.state.longitude ) 
    } );
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
      taxa
    } = this.state;

    const {
      navigation
    } = this.props;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <NavigationEvents
            onWillFocus={() => this.fetchSpeciesAndBadgeCount()}
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
            updateLocation={this.updateLocation}
            setTaxonId={this.setTaxonId}
            taxaName={taxaName}
            error={error}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default MainScreen;
