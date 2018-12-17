// @flow

import React, { Component } from "react";
import { TouchableHighlight, Text, View } from "react-native";
import Geocoder from "react-native-geocoder";
import LocationMap from "./LocationMap";

import { truncateCoordinates } from "../../utility/helpers";
import styles from "../../styles/locationPicker";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  navigation: any
}

class LocationPickerScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    const {
      location,
      latitude,
      longitude,
      updateLocation
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
      updateLocation,
      error: null
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

  getGeolocation( ) {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const latitude = truncateCoordinates( position.coords.latitude );
      const longitude = truncateCoordinates( position.coords.longitude );

      this.setState( {
        userLatitude: latitude,
        userLongitude: longitude,
        userLocation: this.reverseGeocodeLocation( latitude, longitude )
      } );
    }, ( err ) => {
      this.setState( {
        error: `Couldn't fetch your current location: ${err.message}.`
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
    const { region, location, updateLocation } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Looking for species in a 50 mile radius around this point:
        </Text>
        <Text style={styles.locationText}>{location}</Text>
        <View style={styles.mapContainer}>
          <LocationMap
            region={region}
            onRegionChange={this.onRegionChange}
            returnToUserLocation={this.returnToUserLocation}
          />
        </View>
        <TouchableHighlight style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              updateLocation( region.latitude, region.longitude, location );
            }}
          >
            Done
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default LocationPickerScreen;
