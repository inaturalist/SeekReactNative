// @flow
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import MapView, {
  PROVIDER_DEFAULT,
  UrlTile,
  Marker
} from "react-native-maps";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/species/speciesMap";

type Props = {
  navigation: any,
  region: Object,
  id: number,
  error: string
}

const LocationMap = ( {
  region,
  id,
  error,
  navigation
}: Props ) => (
  <View>
    <Text style={styles.headerText}>{i18n.t( "species_detail.range_map" ).toLocaleUpperCase()}</Text>
    <View style={styles.mapContainer}>
      {region.latitude ? (
        <MapView
          region={region}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          maxZoomLevel={7}
          onPress={() => navigation.navigate( "RangeMap", { region, id } )}
        >
          <UrlTile
            urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}&color=%2377B300`}
          />
          {error ? null : (
            <Marker
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            >
              <Image source={icons.locationPin} />
            </Marker>
          )}
        </MapView>
      ) : null}
    </View>
    <TouchableOpacity
      style={styles.darkGreenButton}
      onPress={() => navigation.navigate( "RangeMap", { region, id } )}
    >
      <Text style={styles.darkGreenButtonText}>{i18n.t( "species_detail.view_map" ).toLocaleUpperCase()}</Text>
    </TouchableOpacity>
  </View>
);

export default LocationMap;
