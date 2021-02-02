// @flow
import React, { useState } from "react";
import { View, Image, Platform } from "react-native";
import MapView, {
  PROVIDER_DEFAULT,
  UrlTile,
  Marker
} from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import icons from "../../../assets/icons";
import styles from "../../../styles/species/speciesMap";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import AndroidMapError from "../../UIComponents/AndroidMapError";


type Props = {
  +region: Object,
  +id: number,
  +seenDate: ?string
}

const SpeciesMap = ( {
  region,
  id,
  seenDate
}: Props ) => {
  const navigation = useNavigation();
  const [error, setError] = useState( null );

  const navToRangeMap = () => navigation.navigate( "RangeMap", { region, id, seenDate } );

  const handleMapReady = ( e ) => {
    if ( e === undefined ) {
      setError( true );
    }
  };

  const displayMap = ( ) => {
    if ( error && Platform.OS === "android" ) {
      return (
        <View style={styles.map}>
          <AndroidMapError />
        </View>
      );
    }
    return (
      <MapView
        maxZoomLevel={7}
        onPress={navToRangeMap}
        provider={PROVIDER_DEFAULT}
        region={region}
        rotateEnabled={false}
        scrollEnabled={false}
        style={styles.map}
        zoomEnabled={false}
        onMapReady={handleMapReady}
      >
        <UrlTile
          tileSize={512}
          urlTemplate={`https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?taxon_id=${id}&color=%2377B300&verifiable=true`}
        />
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        >
          <Image source={seenDate ? icons.cameraOnMap : icons.locationPin} />
        </Marker>
      </MapView>
    );
  };

  return (
    <SpeciesDetailCard text="species_detail.range_map" hide={!region.latitude || !region.longitude}>
      <View style={styles.mapContainer}>
        {( ( region.latitude && region.longitude ) && id ) && displayMap( )}
      </View>
      <View style={styles.margin} />
      <GreenButton
        handlePress={navToRangeMap}
        text="species_detail.view_map"
      />
    </SpeciesDetailCard>
  );
};

export default SpeciesMap;
