// @flow

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform
} from "react-native";
import Geocoder from "react-native-geocoder";

import i18n from "../../i18n";
import LocationMap from "./LocationMap";
import { truncateCoordinates, fetchTruncatedUserLocation, fetchLocationName } from "../../utility/locationHelpers";
import icons from "../../assets/icons";
import styles from "../../styles/home/locationPicker";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  latitude: number,
  longitude: number,
  location: string,
  updateLocation: Function,
  toggleLocationPicker: Function
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
    };

    this.onRegionChange = this.onRegionChange.bind( this );
    this.returnToUserLocation = this.returnToUserLocation.bind( this );
  }

  onRegionChange( region ) {
    this.setState( {
      region
    }, () => {
      if ( Platform.OS === "android" ) {
        this.reverseGeocodeLocation( region.latitude, region.longitude );
      }
    } );
  }

  setLocationUndefined() {
    this.setState( { location: i18n.t( "location_picker.undefined" ) } );
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  setCoordsByLocationName( location ) {
    Geocoder.geocodeAddress( location ).then( ( result ) => {
      if ( result.length === 0 ) {
        this.setLocationUndefined();
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
    } ).catch( ( e ) => {
      console.log( e, "error" );
    } );
  }

  reverseGeocodeLocation( lat, lng ) {
    const { location } = this.state;
    fetchLocationName( lat, lng ).then( ( newLocation ) => {
      if ( newLocation === null ) {
        this.setLocationUndefined();
      } else if ( location !== newLocation ) {
        this.setLocation( newLocation );
      }
    } ).catch( ( e ) => {
      console.log( e, "error" );
    } );
  }

  returnToUserLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.reverseGeocodeLocation( latitude, longitude );

        this.setState( {
          region: {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          }
        } );
      }
    } );
  }

  render() {
    const { region, location } = this.state;
    const { updateLocation, toggleLocationPicker } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <View style={styles.header}>
            <TouchableOpacity
              hitSlop={styles.touchable}
              style={styles.backButton}
              onPress={() => toggleLocationPicker()}
            >
              <Image
                source={icons.backButton}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>{i18n.t( "location_picker.species_nearby" ).toLocaleUpperCase()}</Text>
            </View>
            <View style={styles.row}>
              <Image source={icons.locationWhite} />
              <TextInput
                style={styles.inputField}
                placeholder={location}
                placeholderTextColor="#828282"
                autoCapitalize="words"
                textContentType="addressCity"
                onChangeText={text => this.setCoordsByLocationName( text )}
              />
            </View>
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
              onPress={() => {
                updateLocation(
                  truncateCoordinates( region.latitude ),
                  truncateCoordinates( region.longitude )
                );
              }}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "location_picker.button" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default LocationPicker;
