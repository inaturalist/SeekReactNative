// @flow
import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from "react-native-maps";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";

import i18n from "../../i18n";
import styles from "../../styles/species/rangeMap";
import icons from "../../assets/icons";
import GreenHeader from "../GreenHeader";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  navigation: any
}


class RangeMap extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const { region, id } = navigation.state.params;

    this.state = {
      region,
      id
    };
  }

  returnToUserLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

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
    const { region, id } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader
            header={i18n.t( "species_detail.range_map" )}
            navigation={navigation}
            route="Species"
          />
          {region.latitude ? (
            <MapView
              region={region}
              provider={PROVIDER_DEFAULT}
              style={styles.map}
              zoomEnabled
            >
              <UrlTile
                urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}&color=%2377B300`}
                tileSize={512}
              />
              <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              >
                <Image source={icons.locationPin} />
              </Marker>
            </MapView>
          ) : null}
          <View style={styles.userLocation}>
            <TouchableOpacity
              onPress={() => this.returnToUserLocation()}
              style={styles.locationIcon}
            >
              <Image source={icons.indicator} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default RangeMap;
