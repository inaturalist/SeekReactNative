// @flow

import React, { Component } from "react";
import {
  View,
  Platform,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import { checkForInternet } from "../../../utility/helpers";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import { checkLocationPermissions } from "../../../utility/androidHelpers.android";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import SpeciesNearbyContainer from "./SpeciesNearbyContainer";

type Props = {}

type State = {
  latitude: ?number,
  longitude: ?number,
  taxaType: string,
  error: ?string
}

class SpeciesNearby extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      taxaType: "all",
      error: null
    };

    ( this:any ).updateTaxaType = this.updateTaxaType.bind( this );
    ( this:any ).updateLocation = this.updateLocation.bind( this );
    ( this:any ).checkForErrors = this.checkForErrors.bind( this );
  }

  setLocation( latitude: number, longitude: number ) {
    this.setState( {
      latitude,
      longitude
    } );
  }

  setError( newError: ?string ) {
    const { error } = this.state;

    if ( error !== newError ) {
      // this ensures the loading wheel stays in place when its needed
      this.setState( { error: newError } );
    }
  }

  getGeolocation() {
    const { latitude, longitude } = this.state;
    if ( !latitude || !longitude ) {
      // only update location if user has not selected a location already
      fetchTruncatedUserLocation().then( ( coords ) => {
        if ( coords.latitude && coords.longitude ) {
          this.setLocation( coords.latitude, coords.longitude );
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
  }

  requestAndroidPermissions() {
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
    this.setState( { taxaType } );
  }

  updateLocation( latitude: number, longitude: number ) {
    this.setLocation( latitude, longitude );
  }

  checkForErrors() {
    this.requestAndroidPermissions();

    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        this.setError( "internet" );
      } else {
        this.setError( null );
      }
    } ).catch( () => this.setError( null ) );
  }

  render() {
    const {
      error,
      latitude,
      longitude,
      taxaType
    } = this.state;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => this.checkForErrors()}
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
          <TaxonPicker updateTaxaType={this.updateTaxaType} error={error} />
          <View style={styles.marginBottom} />
        </View>
        <SpeciesNearbyContainer
          taxaType={taxaType}
          latitude={latitude}
          longitude={longitude}
          error={error}
          checkForErrors={this.checkForErrors}
        />
        <View style={styles.greenMargin} />
      </>
    );
  }
}

export default SpeciesNearby;
