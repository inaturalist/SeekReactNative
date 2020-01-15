// @flow

import React, { Component } from "react";
import { View, Modal, Platform } from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/home/speciesNearby";
import LoadingWheel from "../UIComponents/LoadingWheel";
import Error from "./Error";
import { colors } from "../../styles/global";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";
import i18n from "../../i18n";
import LocationPicker from "./LocationPicker";
import Header from "./Header";
import { checkForInternet } from "../../utility/helpers";
import { fetchTruncatedUserLocation, fetchLocationName } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import taxonIds from "../../utility/taxonDict";
import createUserAgent from "../../utility/userAgent";

type Props = {}

type State = {
  latitude: ?number,
  longitude: ?number,
  location: ?string,
  taxa: Array<Object>,
  taxaType: string,
  loading: boolean,
  modalVisible: boolean,
  error: ?string
}

class SpeciesNearby extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      location: null,
      taxa: [],
      taxaType: "all",
      loading: true,
      modalVisible: false,
      error: null
    };

    ( this:any ).updateTaxaType = this.updateTaxaType.bind( this );
    ( this:any ).updateLocation = this.updateLocation.bind( this );
    ( this:any ).toggleLocationPicker = this.toggleLocationPicker.bind( this );
    ( this:any ).requestAndroidPermissions = this.requestAndroidPermissions.bind( this );
  }

  setLoading( newLoadingStatus: boolean ) {
    const { loading } = this.state;
    if ( loading !== newLoadingStatus ) {
      this.setState( { loading: newLoadingStatus } );
    }
  }

  setLocation( location: string, latitude: number, longitude: number ) {
    this.setState( {
      location,
      latitude,
      longitude
    }, () => this.setParamsForSpeciesNearby() );
  }

  setTaxa( taxa: Array<Object> ) {
    this.setState( {
      taxa,
      loading: false
    } );
  }

  setError( newError: ?string ) {
    const { error } = this.state;

    if ( error !== newError ) {
      // this ensures the loading wheel stays in place when its needed
      this.setState( {
        error: newError,
        loading: false
      } );
    } else {
      this.setLoading( false );
    }
  }

  getGeolocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      if ( latitude && longitude ) {
        this.reverseGeocodeLocation( latitude, longitude );
      }
    } ).catch( ( errorCode ) => {
      if ( errorCode === 1 ) {
        this.setError( "location" );
      } else if ( errorCode === 2 ) {
        this.setError( "no_gps" );
      } else {
        this.setError( "location_timeout" );
      }
    } );
  }

  setParamsForSpeciesNearby() {
    const { taxaType, latitude, longitude } = this.state;

    const params = {
      per_page: 20,
      lat: latitude,
      lng: longitude,
      observed_on: new Date(),
      seek_exceptions: true,
      locale: i18n.locale
    };

    if ( taxonIds[taxaType] ) {
      // $FlowFixMe
      params.taxon_id = taxonIds[taxaType];
    }

    this.fetchSpeciesNearby( params );
  }

  resetErrorAndLoading() {
    const { error, loading } = this.state;

    if ( error !== null || loading !== true ) {
      this.setState( {
        error: null,
        loading: true
      } );
    }
  }

  requestAndroidPermissions() {
    this.resetErrorAndLoading();

    if ( Platform.OS === "android" ) {
      checkLocationPermissions().then( ( granted ) => {
        if ( granted ) {
          this.getGeolocation();
        } else {
          this.setError( "location" );
        }
      } );
    } else {
      this.getGeolocation();
    }
  }

  updateTaxaType( taxaType: string ) {
    this.setState( {
      taxaType,
      loading: true
    }, () => this.setParamsForSpeciesNearby() );
  }

  reverseGeocodeLocation( lat: number, lng: number ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      this.setLocation( location, lat, lng );
    } ).catch( () => {
      this.checkInternetConnection();
    } );
  }

  checkInternetConnection() {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        this.setError( "internet" );
      }
    } ).catch( () => this.setError( null ) );
  }

  fetchSpeciesNearby( params: Object ) {
    const site = "https://api.inaturalist.org/v1/taxa/nearby";
    const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );

    const options = { headers: { "User-Agent": createUserAgent() } };

    fetch( `${site}?${queryString}`, options )
      .then( response => response.json() )
      .then( ( { results } ) => {
        const taxa = results.map( r => r.taxon );
        this.setTaxa( taxa );
      } ).catch( () => {
        this.checkInternetConnection();
      } );
  }

  toggleLocationPicker() {
    const { modalVisible, error } = this.state;

    if ( !error ) {
      this.setState( { modalVisible: !modalVisible } );
    }
  }

  updateLocation( latitude: number, longitude: number ) {
    this.setLoading( true );
    this.reverseGeocodeLocation( latitude, longitude );
    this.toggleLocationPicker();
  }

  render() {
    const {
      loading,
      error,
      location,
      taxa,
      modalVisible,
      latitude,
      longitude
    } = this.state;

    let species;

    if ( loading ) {
      species = (
        <LoadingWheel color={colors.black} />
      );
    } else if ( error ) {
      species = (
        <Error
          error={error}
          requestAndroidPermissions={this.requestAndroidPermissions}
        />
      );
    } else {
      species = (
        <SpeciesNearbyList taxa={taxa} />
      );
    }

    return (
      <>
        <Modal
          onRequestClose={() => this.toggleLocationPicker()}
          visible={modalVisible}
        >
          <LocationPicker
            latitude={latitude}
            location={location}
            longitude={longitude}
            toggleLocationPicker={this.toggleLocationPicker}
            updateLocation={this.updateLocation}
          />
        </Modal>
        <NavigationEvents
          onWillFocus={() => this.requestAndroidPermissions()}
        />
        <Header
          location={location}
          toggleLocationPicker={this.toggleLocationPicker}
          updateTaxaType={this.updateTaxaType}
        />
        <View style={styles.speciesNearbyContainer}>
          {species}
        </View>
        <View style={styles.greenMargin} />
      </>
    );
  }
}

export default SpeciesNearby;
