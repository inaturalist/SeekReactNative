// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import inatjs from "inaturalistjs";
import { withNavigation } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/species/iNatObs";
import logos from "../../assets/logos";
import { fetchLocationName } from "../../utility/locationHelpers";
import GreenText from "../UIComponents/GreenText";
import createUserAgent from "../../utility/userAgent";
import { seti18nNumber, setRoute } from "../../utility/helpers";

type Props = {
  +id: number,
  +region: Object,
  +timesSeen: ?number,
  +navigation: any,
  +error: ?string
};

type State = {
  nearbySpeciesCount: ?number,
  location: ?string
}

class INatObs extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      nearbySpeciesCount: null,
      location: null
    };
  }

  componentDidUpdate( prevProps: Object ) {
    const { region } = this.props;

    if ( region !== prevProps.region ) {
      this.reverseGeocodeLocation( region.latitude, region.longitude );
      this.fetchNearbySpeciesCount();
    }
  }

  setLocation( location: ?string ) {
    this.setState( { location } );
  }

  setNearbySpeciesCount( nearbySpeciesCount: number ) {
    this.setState( { nearbySpeciesCount } );
  }

  reverseGeocodeLocation( lat: number, lng: number ) {
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

    const options = { user_agent: createUserAgent() };

    inatjs.observations.speciesCounts( params, options ).then( ( { results } ) => {
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
          <GreenText text="species_detail.inat_obs" />
        </View>
        <View style={[styles.center, styles.row]}>
          <TouchableOpacity
            onPress={() => {
              setRoute( "Species" );
              navigation.navigate( "iNatStats" );
            }}
          >
            <Image source={logos.bird} style={styles.bird} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            {error === "location" ? null : (
              <>
                <Text style={styles.secondHeaderText}>
                  {i18n.t( "species_detail.near", { location } )}
                </Text>
                <Text style={styles.number}>
                  {seti18nNumber( nearbySpeciesCount )}
                </Text>
              </>
            )}
            <Text style={[styles.secondHeaderText, !error && styles.margin]}>
              {i18n.t( "species_detail.worldwide" )}
            </Text>
            <Text style={styles.number}>
              {seti18nNumber( timesSeen )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation( INatObs );
