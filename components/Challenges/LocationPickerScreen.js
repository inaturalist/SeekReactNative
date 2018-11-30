// @flow

import React, { Component } from "react";
import { TouchableHighlight, Text, View } from "react-native";
import Geocoder from "react-native-geocoder";
import LocationMap from "./LocationMap";

import styles from "../../styles/locationPicker";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

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
      location,
      updateLocation
    };

    this.onRegionChange = this.onRegionChange.bind( this );
  }

  onRegionChange( newRegion ) {
    const { region } = this.state;
    const { latitude, longitude } = region;

    this.setState( {
      region: newRegion
    }, () => this.reverseGeocodeLocation( latitude, longitude ) );
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

  render() {
    const { region, location, updateLocation } = this.state;
    const { navigation } = this.props;

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
          />
        </View>
        <TouchableHighlight style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              updateLocation( region.latitude, region.longitude, location );
              navigation.navigate( "Main" );
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
