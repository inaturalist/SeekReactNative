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
import GreenText from "../UIComponents/GreenText";
import createUserAgent from "../../utility/userAgent";
import { localizeNumber, setRoute } from "../../utility/helpers";

type Props = {
  +id: number,
  +region: Object,
  +timesSeen: ?number,
  +navigation: any,
  +error: ?string
};

type State = {
  nearbySpeciesCount: ?number
}

class INatObs extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      nearbySpeciesCount: null
    };
  }

  componentDidUpdate( prevProps: Object ) {
    const { region } = this.props;

    if ( region !== prevProps.region ) {
      this.fetchNearbySpeciesCount();
    }
  }

  setNearbySpeciesCount( nearbySpeciesCount: number ) {
    this.setState( { nearbySpeciesCount } );
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
    const { nearbySpeciesCount } = this.state;

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
                  {i18n.t( "species_detail.near" )}
                </Text>
                <Text style={styles.number}>
                  {localizeNumber( nearbySpeciesCount )}
                </Text>
              </>
            )}
            <Text style={[styles.secondHeaderText, !error && styles.margin]}>
              {i18n.t( "species_detail.worldwide" )}
            </Text>
            <Text style={styles.number}>
              {localizeNumber( timesSeen )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation( INatObs );
