// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Platform,
  PermissionsAndroid
} from "react-native";
import Geocoder from "react-native-geocoder";
import inatjs from "inaturalistjs";

import styles from "../../styles/home/home";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
import { truncateCoordinates } from "../../utility/helpers";

type Props = {
  navigation: any,
  // fetchTaxa: Function,
  // taxa: Array,
  loading: boolean
}

class HomeScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      location: null,
      taxa: [],
      taxaType: null
    };
  }

  componentWillMount() {
    this.fetchUserLocation();
  }

  setTaxa( taxa ) {
    this.setState( { taxa } );
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const latitude = truncateCoordinates( position.coords.latitude );
      const longitude = truncateCoordinates( position.coords.longitude );
      this.reverseGeocodeLocation( latitude, longitude );

      this.setState( {
        latitude,
        longitude
      }, () => this.fetchSpeciesNearby( latitude, longitude ) );
    }, ( err ) => {
      console.log( err.message );
    } );
  }

  requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.getGeolocation();
      // } else {
      //   // this.showError( JSON.stringify( granted ) );
      }
    } catch ( err ) {
      // this.showError( err );
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
      this.reverseGeocodeLocation( latitude, longitude );
    }
  }

  reverseGeocodeLocation( lat, lng ) {
    Geocoder.geocodePosition( { lat, lng } ).then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      this.setState( {
        location: locality || subAdminArea
      } );
    } ).catch( ( err ) => {
      console.log( err );
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
      taxa,
      taxaType
    } = this.state;
    const { loading, navigation } = this.props;
    // console.log( this.props, "props in home screen" );
    // console.log( location, latitude, longitude, "state in home screen" );

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <ScrollView>
            <SpeciesNearby
              taxa={taxa}
              loading={loading}
              navigation={navigation}
              location={location}
              latitude={latitude}
              longitude={longitude}
              taxaType={taxaType}
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
