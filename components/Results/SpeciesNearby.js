import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../i18n";
import styles from "../../styles/results/speciesNearby";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { getPreviousAndNextMonth } from "../../utility/dateHelpers";
import { colors } from "../../styles/global";

type Props = {
  +ancestorId: Number,
  +hrank: string,
  +lat: Number,
  +lng: Number,
  +navigation: any
}

class SpeciesNearby extends Component<Props> {
  constructor() {
    super();

    this.state = {
      taxa: [],
      loading: false,
      notLoaded: true
    };
  }

  setTaxa( taxa ) {
    this.setState( { taxa }, () => this.setState( {
      loading: false
    } ) );
  }

  setParamsForSpeciesNearby() {
    this.setState( { loading: true, notLoaded: null } );
    const {
      ancestorId,
      hrank,
      lat,
      lng
    } = this.props;

    const params = {
      verifiable: true,
      photos: true,
      per_page: 20,
      lat,
      lng,
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank,
      include_only_vision_taxa: true,
      not_in_list_id: 945029,
      month: getPreviousAndNextMonth(),
      locale: i18n.currentLocale(),
      taxon_id: ancestorId
    };

    this.fetchSpeciesNearby( params );
  }

  fetchSpeciesNearby( params ) {
    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const taxa = response.results.map( r => r.taxon );
      this.setTaxa( taxa );
    } ).catch( () => {
      console.log( "couldn't fetch species nearby" );
    } );
  }

  render() {
    const { taxa, loading, notLoaded } = this.state;
    const { navigation } = this.props;

    let species;

    if ( notLoaded ) {
      species = (
        <TouchableOpacity
          onPress={() => this.setParamsForSpeciesNearby()}
          style={[styles.center, styles.speciesNearbyContainer]}
        >
          <Text style={styles.text}>{i18n.t( "results.tap" )}</Text>
        </TouchableOpacity>
      );
    } else if ( loading ) {
      species = (
        <LoadingWheel color={colors.black} />
      );
    } else {
      species = (
        <SpeciesNearbyList
          match
          navigation={navigation}
          taxa={taxa}
        />
      );
    }

    return (
      <View>
        <Text style={styles.headerText}>
          {i18n.t( "results.nearby" ).toLocaleUpperCase()}
        </Text>
        <View style={styles.speciesNearbyContainer}>
          {species}
        </View>
      </View>
    );
  }
}

export default SpeciesNearby;
