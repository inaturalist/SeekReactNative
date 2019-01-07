// @flow

import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Geocoder from "react-native-geocoder";

import i18n from "../../i18n";
import LocationMap from "./LocationMap";
import { truncateCoordinates, capitalizeNames } from "../../utility/helpers";
import styles from "../../styles/locationPicker";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  navigation: any
}

class LocationPickerScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      location,
      latitude,
      longitude,
      taxaType
    } = navigation.state.params;

    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude,
        longitude
      },
      userLatitude: latitude,
      userLongitude: longitude,
      userLocation: location,
      location,
      taxaType
      // error: null
    };

    this.onRegionChange = this.onRegionChange.bind( this );
    this.returnToUserLocation = this.returnToUserLocation.bind( this );
  }

  onRegionChange( newRegion ) {
    this.reverseGeocodeLocation( newRegion.latitude, newRegion.longitude );

    this.setState( {
      region: newRegion
    } );
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const latitude = truncateCoordinates( position.coords.latitude );
      const longitude = truncateCoordinates( position.coords.longitude );

      this.setState( {
        userLatitude: latitude,
        userLongitude: longitude,
        userLocation: this.reverseGeocodeLocation( latitude, longitude )
      } );
    }, ( err ) => {
      // this.setState( {
      //   error: `Couldn't fetch your current location: ${err.message}.`
      // } );
    } );
  }

  reverseGeocodeLocation( latitude, longitude ) {
    Geocoder.geocodePosition( { lat: latitude, lng: longitude } ).then( ( result ) => {
      if ( result.length === 0 ) {
        this.setState( {
          location: null
        } );
      }
      const { locality, subAdminArea } = result[0];
      this.setState( {
        location: locality || subAdminArea
      } );
    } ).catch( ( err ) => {
      // this.setState( {
      //   error: err.message
      // } );
    } );
  }

  returnToUserLocation() {
    const { userLatitude, userLongitude, userLocation } = this.state;

    this.getGeolocation();

    this.setState( {
      region: {
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      },
      location: userLocation
    } );
  }

  render() {
    const { region, location, taxaType } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {capitalizeNames( i18n.t( "location_picker.species_nearby" ) )}
          </Text>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.mapContainer}>
          <LocationMap
            region={region}
            onRegionChange={this.onRegionChange}
            returnToUserLocation={this.returnToUserLocation}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push( "Main", {
              taxaName: null,
              id: null,
              taxaType,
              latitude: region.latitude,
              longitude: region.longitude
            } )}
          >
            <Text style={styles.buttonText}>
              {i18n.t( "location_picker.button" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LocationPickerScreen;
