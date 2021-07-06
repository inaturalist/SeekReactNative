// @flow

import React, { useReducer, useEffect, useCallback, useContext } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/posting/postToiNat";
import { savePostingSuccess } from "../../utility/loginHelpers";
import i18n from "../../i18n";
import GeoprivacyPicker from "./Pickers/GeoprivacyPicker";
import CaptivePicker from "./Pickers/CaptivePicker";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { setISOTime, isAndroidDateInFuture, formatGMTTimeWithTimeZone } from "../../utility/dateHelpers";
import { useLocationName } from "../../utility/customHooks";
import Notes from "./Notes";
import LocationPickerCard from "./Pickers/LocationPickerCard";
import DatePicker from "./Pickers/DateTimePicker";
import PostingHeader from "./PostingHeader";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { saveObservationToRealm } from "../../utility/uploadHelpers";
import { ObservationContext } from "../UserContext";
// import { LOG } from "../../utility/debugHelpers";

const PostScreen = (): Node => {
  const { observation } = useContext( ObservationContext );
  const navigation = useNavigation( );
  const { params } = useRoute( );

  const { image } = observation;
  const { preciseCoords } = image;
  const { taxaId, scientificName, commonName } = params;

  const initialDate = image.time
    ? formatGMTTimeWithTimeZone( setISOTime( image.time ) )
    : null;
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SELECT_SPECIES":
        return {
          ...state,
          taxon: {
            name: action.selectedSpecies.name,
            taxaId: action.selectedSpecies.id,
            preferredCommonName: action.selectedSpecies.updatedCommonName
          },
          editedObservation: action.editedObservation
        };
      case "UPDATE_OBSERVATION":
        return { ...state, editedObservation: action.editedObservation };
      case "BUTTON_DISABLED":
        return { ...state, disabled: true };
      default:
        throw new Error( );
    }
  }, {
    editedObservation: {
      captive_flag: false,
      description: null,
      geoprivacy: "open",
      latitude: preciseCoords.latitude,
      longitude: preciseCoords.longitude,
      observed_on_string: initialDate,
      place_guess: null,
      positional_accuracy: preciseCoords.accuracy,
      taxon_id: taxaId,
      // this shows that the id is recommended by computer vision
      vision: true
    },
    taxon: {
      preferredCommonName: commonName,
      name: scientificName,
      taxaId
    },
    disabled: false
  } );

  const { editedObservation, taxon, disabled } = state;

  const location = useLocationName( editedObservation.latitude, editedObservation.longitude );

  const setLocation = useCallback( ( coords ) => {
    dispatch( { type: "UPDATE_OBSERVATION", editedObservation: {
      ...editedObservation,
      latitude: coords.latitude,
      longitude: coords.longitude,
      positional_accuracy: coords.accuracy
    } } );
  }, [editedObservation] );

  const updateLocation = ( latitude, longitude, newAccuracy ) => {
    const coords = { latitude, longitude, accuracy: newAccuracy };
    setLocation( coords );
  };

  const updateTaxon = useCallback( ( id, updatedCommonName, name ) => {
    const selectedSpecies = { id, updatedCommonName, name };
    dispatch( {
      type: "SELECT_SPECIES",
      selectedSpecies,
      editedObservation: {
        ...editedObservation,
        taxon_id: id,
        vision: false
      }
    } );

  }, [editedObservation] );

  const updateObservation = useCallback( ( key: string, value: any ) => dispatch( {
    type: "UPDATE_OBSERVATION",
    editedObservation: {
      ...editedObservation,
      [key]: value
    }
  } ), [editedObservation] );

  useEffect( ( ) => {
    if ( location !== editedObservation.place_guess && location !== i18n.t( "location_picker.undefined" ) ) {
      updateObservation( "place_guess", location );
    } else if ( location === i18n.t( "location_picker.undefined" )  && editedObservation.place_guess !== null ) {
      updateObservation( "place_guess", null );
    }
  }, [location, editedObservation, updateObservation] );

  const handleDatePicked = ( selectedDate ) => {
    if ( selectedDate ) {
      const isFuture = isAndroidDateInFuture( selectedDate );
      const newDate = isFuture
        ? formatGMTTimeWithTimeZone( new Date( ) )
        : formatGMTTimeWithTimeZone( selectedDate );
      updateObservation( "observed_on_string", newDate );
    }
  };

  const saveObservation = ( ) => {
    dispatch( { type: "BUTTON_DISABLED" } );
    saveObservationToRealm( editedObservation, observation.image.uri );
    savePostingSuccess( true );
    navigation.navigate( "PostStatus" );
  };

  return (
    <ScrollWithHeader header="posting.header">
      <PostingHeader
        taxon={taxon}
        image={observation.image}
        updateTaxon={updateTaxon}
      />
      <Notes description={editedObservation.description} updateObservation={updateObservation} />
      <View style={styles.divider} />
      <DatePicker dateToDisplay={editedObservation.observed_on_string} handleDatePicked={handleDatePicked} />
      <View style={styles.divider} />
      <LocationPickerCard updateLocation={updateLocation} location={location} observation={editedObservation} />
      <View style={styles.divider} />
      <GeoprivacyPicker updateObservation={updateObservation} geoprivacy={editedObservation.geoprivacy} />
      <View style={styles.divider} />
      <CaptivePicker updateObservation={updateObservation} captive={editedObservation.captive_flag} />
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <GreenButton
          handlePress={saveObservation}
          text="posting.header"
          disabled={disabled}
        />
      </View>
    </ScrollWithHeader>
  );
};

export default PostScreen;
