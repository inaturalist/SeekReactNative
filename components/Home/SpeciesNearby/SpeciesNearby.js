// @flow

import React, { Component } from "react";
import {
  View,
  Platform,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../../styles/home/speciesNearby";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import Error from "./Error";
import { colors } from "../../../styles/global";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearbyList";
import i18n from "../../../i18n";
import { checkForInternet } from "../../../utility/helpers";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import { checkLocationPermissions } from "../../../utility/androidHelpers.android";
import taxonIds from "../../../utility/dictionaries/taxonDict";
import createUserAgent from "../../../utility/userAgent";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";

type Props = {}

type State = {
  latitude: ?number,
  longitude: ?number,
  taxa: Array<Object>,
  taxaType: string,
  loading: boolean,
  error: ?string
}

class SpeciesNearby extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      taxa: [],
      taxaType: "all",
      loading: true,
      error: null
    };

    ( this:any ).updateTaxaType = this.updateTaxaType.bind( this );
    ( this:any ).updateLocation = this.updateLocation.bind( this );
    ( this:any ).requestAndroidPermissions = this.requestAndroidPermissions.bind( this );
  }

  setLoading( newLoadingStatus: boolean ) {
    const { loading } = this.state;
    if ( loading !== newLoadingStatus ) {
      this.setState( { loading: newLoadingStatus } );
    }
  }

  setLocation( latitude: number, longitude: number ) {
    this.setState( {
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
        this.setLocation( latitude, longitude );
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

  updateLocation( latitude: number, longitude: number ) {
    this.setLoading( true );
    this.setLocation( latitude, longitude );
  }

  render() {
    const {
      loading,
      error,
      taxa,
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
        <NavigationEvents
          onWillFocus={() => this.requestAndroidPermissions()}
        />
        <View style={styles.container}>
          <Text style={[styles.headerText, styles.header]}>
            {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
          </Text>
          <LocationPickerButton
            latitude={latitude}
            longitude={longitude}
            updateLocation={this.updateLocation}
            error={error}
          />
          <TaxonPicker updateTaxaType={this.updateTaxaType} />
          <View style={styles.marginBottom} />
        </View>
        <View style={styles.speciesNearbyContainer}>
          {species}
        </View>
        <View style={styles.greenMargin} />
      </>
    );
  }
}

export default SpeciesNearby;
