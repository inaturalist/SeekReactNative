// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/species/rangeMap";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import icons from "../../../assets/icons";
import GreenHeader from "../../UIComponents/GreenHeader";
import SafeAreaView from "../../UIComponents/SafeAreaView";
import Legend from "../../Modals/LegendModal";
import Modal from "../../UIComponents/Modal";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

const RangeMap = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { region, id, seenDate } = params;
  // region can be the obs region or the user location, depending on nav

  const [showModal, setModal] = useState( false );
  const [user, setUser] = useState( {} );
  const [mapRegion, setMapRegion] = useState( region );

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
    } );
  };

  const updateMap = () => {
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

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<Legend closeModal={closeModal} />}
      />
      <GreenHeader header="species_detail.range_map" />
      <MapView
        provider={PROVIDER_DEFAULT}
        region={mapRegion}
        style={styles.map}
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
        {user.latitude && (
          <Marker coordinate={{ latitude: user.latitude, longitude: user.longitude }}>
            <Image source={icons.locationPin} style={styles.margin} />
          </Marker>
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => openModal()}
        style={[styles.legend, styles.legendPosition]}
      >
        <Text style={styles.whiteText}>
          {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => updateMap()}
        style={[styles.locationIcon, styles.userLocation]}
      >
        <Image source={icons.indicator} />
      </TouchableOpacity>
    </View>
  );
};

export default RangeMap;
