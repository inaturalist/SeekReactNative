// @flow

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import Geocoder from "react-native-geocoder";

import i18n from "../../i18n";
import LocationMap from "./LocationMap";
import { truncateCoordinates, getLatAndLng } from "../../utility/locationHelpers";
import { capitalizeNames } from "../../utility/helpers";
import styles from "../../styles/home/locationPicker";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  latitude: number,
  longitude: number,
  location: string,
  updateLocation: Function
}

class LocationPicker extends Component<Props> {
  constructor( {
    latitude,
    longitude,
    location
  }: Props ) {
    super();

    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude,
        longitude
      },
      location
      // error: null
    };

    this.onRegionChange = this.onRegionChange.bind( this );
    this.returnToUserLocation = this.returnToUserLocation.bind( this );
  }

  onRegionChange( newRegion ) {
    this.setState( {
      region: newRegion
    }, () => this.reverseGeocodeLocation( newRegion.latitude, newRegion.longitude ) );
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

  findLatAndLng( location ) {
    Geocoder.geocodeAddress( location ).then( ( result ) => {
      if ( result.length === 0 ) {
        return;
      }
      const { locality, subAdminArea, position } = result[0];
      const { lng, lat } = position;
      this.setState( {
        location: locality || subAdminArea,
        region: {
          latitude: truncateCoordinates( lat ),
          longitude: truncateCoordinates( lng ),
          latitudeDelta,
          longitudeDelta
        }
      } );
    } ).catch( ( err ) => {
      // this.setState( {
      //   error: err.message
      // } );
    } );
  }

  async returnToUserLocation() {
    const location = await getLatAndLng();

    this.setState( {
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      },
      location: this.reverseGeocodeLocation( location.latitude, location.longitude )
    } );
  }

  render() {
    const { region, location } = this.state;
    const { updateLocation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {capitalizeNames( i18n.t( "location_picker.species_nearby" ) )}
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder={location}
            autoCapitalize="words"
            textContentType="addressCity"
            onChangeText={text => this.findLatAndLng( text )}
          />
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
            onPress={() => updateLocation( truncateCoordinates( region.latitude ), truncateCoordinates( region.longitude ), location )}
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

export default LocationPicker;
