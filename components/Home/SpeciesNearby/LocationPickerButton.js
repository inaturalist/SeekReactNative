// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import LocationPicker from "./LocationPicker";
import { fetchLocationName } from "../../../utility/locationHelpers";

type Props = {
  latitude: ?number,
  longitude: ?number,
  updateLocation: Function,
  error?: ?string
}

const LocationPickerButton = ( {
  latitude,
  longitude,
  updateLocation,
  error
}: Props ) => {
  const [location, setLocation] = useState( null );
  const [showModal, setModal] = useState( false );

  const openLocationPicker = () => {
    setModal( true );
  };

  const closeLocationPicker = () => {
    setModal( false );
  };

  useEffect( () => {
    let isCurrent = true;

    // reverseGeocodeLocation
    fetchLocationName( latitude, longitude ).then( ( locationName ) => {
      if ( isCurrent ) {
        if ( locationName === null ) {
          setLocation( i18n.t( "location_picker.undefined" ) ); // for oceans
        } else {
          setLocation( locationName );
        }
      }
    } ).catch( () => {
      if ( isCurrent ) {
        setLocation( null );
      }
    } );

    return () => {
      isCurrent = false;
    };
  }, [latitude, longitude] );

  return (
    <>
      <Modal visible={showModal}>
        <LocationPicker
          latitude={latitude}
          location={location}
          longitude={longitude}
          closeLocationPicker={closeLocationPicker}
          updateLocation={updateLocation}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => openLocationPicker()}
        style={[styles.row, styles.marginLeft, styles.paddingBottom, styles.paddingTop]}
        disabled={error !== null}
      >
        <Image source={icons.locationWhite} style={styles.image} />
        <View style={styles.whiteButton}>
          <Text style={styles.buttonText}>
            {location
              ? location.toLocaleUpperCase()
              : i18n.t( "species_nearby.no_location" ).toLocaleUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

LocationPickerButton.defaultProps = {
  error: null
};

export default LocationPickerButton;
