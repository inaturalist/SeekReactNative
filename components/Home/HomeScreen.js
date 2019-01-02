// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Platform,
  PermissionsAndroid
} from "react-native";
import Geocoder from "react-native-geocoder";
import Realm from "realm";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/home/home";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
import { truncateCoordinates, getPreviousAndNextMonth } from "../../utility/helpers";
import taxonIds from "../../utility/taxonDict";
import realmConfig from "../../models/index";

type Props = {
  navigation: any,
  // fetchTaxa: Function,
  // taxa: Array,
  // loading: boolean
}

class HomeScreen extends Component<Props> {
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
      latitude,
      longitude,
      location: null,
      taxa: [],
      taxaType,
      taxaName,
      id,
      loading: false
    };

    this.updateTaxaType = this.updateTaxaType.bind( this );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setTaxa( taxa ) {
    this.setState( { taxa } );
    this.setLoading( false );
  }

  requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.fetchUserLatAndLng();
      // } else {
      //   // this.showError( JSON.stringify( granted ) );
      }
    } catch ( err ) {
      // this.showError( err );
    }
  }

  updateTaxaType( taxaType ) {
    const { latitude, longitude } = this.state;
    this.setState( {
      taxaType
    }, () => this.checkRealmForSpecies( latitude, longitude ) );
  }

  fetchUserLatAndLng() {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const latitude = truncateCoordinates( position.coords.latitude );
      const longitude = truncateCoordinates( position.coords.longitude );
      this.reverseGeocodeLocation( latitude, longitude );

      this.setState( {
        latitude,
        longitude
      }, () => this.checkRealmForSpecies( latitude, longitude ) );
    }, ( err ) => {
      // console.log( err.message );
    } );
  }

  fetchUserLocation() {
    const { latitude, longitude } = this.state;

    if ( !latitude && !longitude ) {
      if ( Platform.OS === "android" ) {
        this.requestAndroidPermissions();
      } else {
        this.fetchUserLatAndLng();
      }
    } else {
      this.reverseGeocodeLocation( latitude, longitude );
      this.checkRealmForSpecies( latitude, longitude );
    }
  }

  reverseGeocodeLocation( lat, lng ) {
    Geocoder.geocodePosition( { lat, lng } ).then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      this.setState( {
        location: locality || subAdminArea
      } );
    } ).catch( ( err ) => {
      // console.log( err );
    } );
  }

  checkRealmForSpecies( lat, lng ) {
    const { taxaType } = this.state;
    this.setLoading( true );

    const params = {
      verifiable: true,
      photos: true,
      per_page: 9,
      lat,
      lng,
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank: "species",
      include_only_vision_taxa: true,
      not_in_list_id: 945029,
      month: getPreviousAndNextMonth()
    };

    if ( taxonIds[taxaType] ) {
      params.taxon_id = taxonIds[taxaType];
    }

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const existingTaxonIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        params.without_taxon_id = existingTaxonIds.join( "," );
        this.fetchSpeciesNearby( params );
      } ).catch( ( err ) => {
        this.fetchSpeciesNearby( params );
      } );
  }

  fetchSpeciesNearby( params ) {
    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const taxa = response.results.map( r => r.taxon );
      this.setTaxa( taxa );
    } ).catch( ( err ) => {
      // this.setState( {
      //   error: `Unable to load challenges: ${err.message}`
      // } );
    } );
  }

  render() {
    const {
      location,
      latitude,
      longitude,
      loading,
      taxa,
      taxaType
    } = this.state;
    const { navigation } = this.props;
    // console.log( this.props, "props in home screen" );

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <NavigationEvents
            onWillFocus={() => {
              this.fetchUserLocation();
            }}
          />
          <ScrollView>
            <SpeciesNearby
              taxa={taxa}
              loading={loading}
              navigation={navigation}
              location={location}
              latitude={latitude}
              longitude={longitude}
              taxaType={taxaType}
              updateTaxaType={this.updateTaxaType}
            />
            <View style={styles.divider} />
            <GetStarted navigation={navigation} />
          </ScrollView>
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default HomeScreen;
