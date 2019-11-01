// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../i18n";
import styles from "../../styles/species/iNatObs";
import logos from "../../assets/logos";
import { fetchLocationName } from "../../utility/locationHelpers";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +id: Number,
  +region: Object,
  +timesSeen: Number,
  +navigation: any,
  +error: string
};

class INatObs extends Component<Props> {
  constructor() {
    super();

    this.state = {
      nearbySpeciesCount: null,
      location: null
    };
  }

  componentDidUpdate( prevProps ) {
    const { region } = this.props;

    if ( region !== prevProps.region ) {
      this.reverseGeocodeLocation( region.latitude, region.longitude );
      this.fetchNearbySpeciesCount();
    }
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  setNearbySpeciesCount( nearbySpeciesCount ) {
    this.setState( { nearbySpeciesCount } );
  }

  reverseGeocodeLocation( lat, lng ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      this.setLocation( location );
    } ).catch( () => this.setLocation( null ) );
  }

  fetchNearbySpeciesCount() {
    const { region, id } = this.props;
    const { latitude, longitude } = region;

    const params = {
      lat: latitude,
      lng: longitude,
      radius: 50,
      taxon_id: id
    };

    inatjs.observations.speciesCounts( params ).then( ( { results } ) => {
      this.setNearbySpeciesCount( results.length > 0 ? results[0].count : 0 );
    } ).catch( ( err ) => {
      console.log( err, "error fetching species count" );
    } );
  }

  render() {
    const { navigation, timesSeen, error } = this.props;
    const { nearbySpeciesCount, location } = this.state;

    return (
      <View>
        <View style={styles.headerMargins}>
          <GreenText text={i18n.t( "species_detail.inat_obs" ).toLocaleUpperCase()} />
        </View>
        <View style={styles.stats}>
          <TouchableOpacity
            hitSlop={styles.touchable}
            onPress={() => navigation.navigate( "iNatStats" )}
          >
            <Image source={logos.bird} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            {error === "location" ? null : (
              <React.Fragment>
                <Text style={styles.secondHeaderText}>
                  {i18n.t( "species_detail.near" )}
                  {" "}
                  {location}
                </Text>
                <Text style={styles.number}>
                  {i18n.toNumber( nearbySpeciesCount, { precision: 0 } )}
                </Text>
              </React.Fragment>
            )}
            <Text style={[styles.secondHeaderText, !error && { marginTop: 28 }]}>
              {i18n.t( "species_detail.worldwide" )}
            </Text>
            <Text style={styles.number}>
              {i18n.toNumber( timesSeen, { precision: 0 } )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default INatObs;
