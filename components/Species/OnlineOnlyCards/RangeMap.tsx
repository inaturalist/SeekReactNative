import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/species/rangeMap";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import icons from "../../../assets/icons";
import Legend from "../../Modals/LegendModal";
import Modal from "../../UIComponents/Modals/Modal";
import ViewWithHeader from "../../UIComponents/Screens/ViewWithHeader";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

const RangeMap = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  // TODO: navigation TS
  // region can be the obs region or the user location, depending on nav
  const { region, id, seenDate } = params;

  const [showModal, setModal] = useState( false );
  const [user, setUser] = useState<{
    latitude?: number;
    longitude?: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  }>( {} );
  const [mapRegion, setMapRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>( region );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  const getUserLocation = () => {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        setUser( {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        } );
      }
    } ).catch( ( error ) => {
      if ( error ) {
        setUser( {} );
      }
    } );
  };

  const updateMap = () => {
    // only show userLocation button if permissions are on
    // a user can have location off and still see range map for previous observation locations
    if ( !user.latitude || !user.longitude ) {
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
    const unsubscribe = navigation.addListener( "focus", () => {
      getUserLocation();
    } );

    return unsubscribe;
  }, [navigation] );

  if ( mapRegion.latitude === undefined ) {
    return null;
  }

  return (
    <ViewWithHeader testID="range-map-container" header="species_detail.range_map" footer={false}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<Legend closeModal={closeModal} />}
      />
      <MapView
        testID="range-map"
        provider={PROVIDER_DEFAULT}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        style={viewStyles.map}
        zoomEnabled
      >
        <UrlTile
          tileSize={512}
          urlTemplate={`https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?taxon_id=${id}&color=%2377B300&verifiable=true`}
        />
        {seenDate && (
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
            <Image source={icons.cameraOnMap} />
          </Marker>
        )}
        {user.latitude && user.longitude && (
          <Marker coordinate={{ latitude: user.latitude, longitude: user.longitude }}>
            <Image source={icons.locationPin} />
          </Marker>
        )}
      </MapView>
      <TouchableOpacity
        onPress={openModal}
        style={viewStyles.legend}
      >
        <StyledText style={[baseTextStyles.modalBanner, textStyles.whiteText]}>
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

export default RangeMap;
