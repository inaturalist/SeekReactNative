// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/match/speciesNearby";
import SpeciesNearbyList from "../UIComponents/SpeciesNearby/SpeciesNearbyList";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";

type Props = {
  +ancestorId:number,
  +image: Object
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
    const { ancestorId, image } = this.props;
    const { latitude, longitude } = image;

    const params = {
      per_page: 20,
      lat: latitude,
      lng: longitude,
      observed_on: new Date(),
      seek_exceptions: true,
      locale: i18n.locale,
      taxon_id: ancestorId,
      all_photos: true // this allows for ARR license filtering
    };

    this.fetchSpeciesNearby( params );
  }

  fetchSpeciesNearby( params ) {
    const site = "https://api.inaturalist.org/v1/taxa/nearby";
    const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );

    fetch( `${site}?${queryString}` )
      .then( response => response.json() )
      .then( ( { results } ) => {
        const taxa = results.map( r => r.taxon );
        this.setTaxa( taxa );
      } ).catch( () => {
        console.log( "couldn't fetch species nearby" );
      } );
  }

  render() {
    const { taxa, loading, notLoaded } = this.state;

    let species;

    if ( loading ) {
      species = <LoadingWheel color={colors.black} />;
    } else {
      species = <SpeciesNearbyList taxa={taxa} />;
    }

    return (
      <>
        <Text style={styles.headerText}>
          {i18n.t( "results.nearby" ).toLocaleUpperCase()}
        </Text>
        {notLoaded ? (
          <TouchableOpacity
            onPress={( ) => this.setParamsForSpeciesNearby( )}
            style={[styles.center, styles.speciesNearbyContainer]}
          >
            <Text style={styles.text}>{i18n.t( "results.tap" )}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.speciesNearbyContainer, styles.center, styles.largerHeight]}>
            {species}
          </View>
        )}
      </>
    );
  }
}

export default SpeciesNearby;
