// @flow
import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/rangeMap";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import icons from "../../assets/icons";
import Legend from "../Modals/LegendModal";
import Modal from "../UIComponents/Modals/Modal";
import ViewWithHeader from "../UIComponents/Screens/ViewWithHeader";
import StyledText from "../UIComponents/StyledText";
import { useFetchStats } from "./hooks/seekYearInReviewHooks";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

const SeekYearInReviewMapScreen = ( ): Node => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { year, region } = params;
  const [showModal, setModal] = useState( false );
  const [user, setUser] = useState( {} );
  const [mapRegion, setMapRegion] = useState( region );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  // TODO: refactor this hook. Currently, has many properties in state that are not used here but only on Seek YIR screen component
  const state = useFetchStats( year );
  const observationsWithLocation = state?.observationsThisYear.filter(
    ( observation ) => observation.latitude && observation.longitude
  );

  const getUserLocation = () => {
    fetchTruncatedUserLocation()
      .then( ( coords ) => {
        if ( coords ) {
          const { latitude, longitude } = coords;

          setUser( {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          } );
        }
      } )
      .catch( ( error ) => {
        if ( error ) {
          setUser( {} );
        }
      } );
  };

  const updateMap = () => {
    // only show userLocation button if permissions are on
    // a user can have location off and still see range map for previous observation locations
    if ( !user.latitude ) {
      return;
    }

    setMapRegion( {
      latitude: user.latitude,
      longitude: user.longitude,
      latitudeDelta,
      longitudeDelta
    } );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      getUserLocation();
    } );
  }, [navigation] );

  if ( mapRegion.latitude === undefined ) {
    return null;
  }

  return (
    <ViewWithHeader
      testID="observations-map-container"
      header="seek_year_in_review.observations_map"
      footer={false}
    >
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<Legend closeModal={closeModal} />}
      />
      <MapView
        testID="observations-map"
        provider={PROVIDER_DEFAULT}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        style={viewStyles.map}
        zoomEnabled
      >
        {
          // Map over observations and display a marker for each one
          observationsWithLocation.map( ( obs ) => {
            const { latitude, longitude, uuidString } = obs;
            return (
              <Marker key={uuidString} coordinate={{ latitude, longitude }}>
                <Image source={icons.cameraOnMap} />
              </Marker>
            );
          } )
        }
        {user.latitude && (
          <Marker
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
          >
            <Image source={icons.locationPin} />
          </Marker>
        )}
      </MapView>
      <TouchableOpacity onPress={openModal} style={viewStyles.legend}>
        <StyledText style={textStyles.whiteText}>
          {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
        </StyledText>
      </TouchableOpacity>
      {user.latitude && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.user_location" )}
          accessible
          testID="user-location-button"
          onPress={updateMap}
          style={viewStyles.locationIcon}
        >
          <Image source={icons.indicator} />
        </TouchableOpacity>
      )}
    </ViewWithHeader>
  );
};

export default SeekYearInReviewMapScreen;
