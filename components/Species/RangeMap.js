// @flow
import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from "react-native-maps";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/species/rangeMap";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import icons from "../../assets/icons";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import Legend from "../Modals/LegendModal";
import Modal from "../UIComponents/Modal";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  +navigation: any
}

type State = {
  region: Object,
  id: number,
  showModal: boolean,
  obsLocation: Object,
  userLocation: Object,
  seenDate: ?string
};

class RangeMap extends Component<Props, State> {
  constructor( { navigation }: Props ) {
    super();

    const { region, id, seenDate } = navigation.state.params;

    this.state = {
      region,
      id,
      showModal: false,
      obsLocation: {
        latitude: region.latitude,
        longitude: region.longitude
      },
      userLocation: {},
      seenDate
    };

    ( this:any ).closeModal = this.closeModal.bind( this );
  }

  getUserLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.setState( {
          userLocation: {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          }
        } );
      }
    } );
  }

  returnToUserLocation() {
    const { userLocation } = this.state;

    this.setState( { region: userLocation } );
  }

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  render() {
    const {
      region,
      id,
      showModal,
      obsLocation,
      userLocation,
      seenDate
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <NavigationEvents
          onWillFocus={() => this.getUserLocation()}
        />
        <Modal
          showModal={showModal}
          closeModal={this.closeModal}
          modal={<Legend closeModal={this.closeModal} />}
        />
        <GreenHeader
          header={i18n.t( "species_detail.range_map" )}
          navigation={navigation}
          route="Species"
        />
        {region.latitude ? (
          <MapView
            provider={PROVIDER_DEFAULT}
            region={region}
            style={styles.map}
            zoomEnabled
          >
            <UrlTile
              tileSize={512}
              urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}&color=%2377B300`}
            />
            {seenDate && obsLocation.latitude ? (
              <Marker
                coordinate={{ latitude: obsLocation.latitude, longitude: obsLocation.longitude }}
              >
                <Image source={icons.cameraOnMap} />
              </Marker>
            ) : null}
            {userLocation.latitude ? (
              <Marker
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude
                }}
              >
                <Image source={icons.locationPin} style={styles.margin} />
              </Marker>
            ) : null}
          </MapView>
        ) : null}
        <TouchableOpacity
          onPress={() => this.openModal()}
          style={[styles.legend, styles.legendPosition]}
        >
          <Text style={styles.whiteText}>
            {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.returnToUserLocation()}
          style={[styles.locationIcon, styles.userLocation]}
        >
          <Image source={icons.indicator} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default RangeMap;
