// @flow
import React from "react";
import {
  View,
  Image
} from "react-native";
import MapView, {
  PROVIDER_DEFAULT,
  UrlTile,
  Marker
} from "react-native-maps";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/species/speciesMap";
import GreenButton from "../UIComponents/GreenButton";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +navigation: any,
  +region: Object,
  +id: number,
  +seenDate: string,
  +isLoggedIn: ?boolean
}

const LocationMap = ( {
  region,
  id,
  navigation,
  seenDate,
  isLoggedIn
}: Props ) => (
  <View>
    <View style={[styles.headerMargins, isLoggedIn && styles.smallMargins]}>
      <GreenText
        text="species_detail.range_map"
      />
    </View>
    <View style={styles.mapContainer}>
      {region.latitude ? (
        <MapView
          maxZoomLevel={7}
          onPress={() => navigation.navigate( "RangeMap", { region, id, seenDate } )}
          provider={PROVIDER_DEFAULT}
          region={region}
          rotateEnabled={false}
          scrollEnabled={false}
          style={styles.map}
          zoomEnabled={false}
        >
          <UrlTile
            tileSize={512}
            urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}&color=%2377B300`}
          />
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          >
            <Image source={seenDate ? icons.cameraOnMap : icons.locationPin} />
          </Marker>
        </MapView>
      ) : null}
    </View>
    <View style={styles.margin} />
    <GreenButton
      handlePress={() => navigation.navigate( "RangeMap", { region, id, seenDate } )}
      text={i18n.t( "species_detail.view_map" )}
    />
  </View>
);

export default LocationMap;
