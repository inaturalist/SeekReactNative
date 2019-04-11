// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";

import i18n from "../../i18n";
import realmConfig from "../../models";
import styles from "../../styles/menu/observations";
import ObservationList from "./ObservationList";
import Padding from "../Padding";
import Footer from "../Home/Footer";
import taxaIds from "../../utility/iconicTaxonDictById";
import LoadingWheel from "../LoadingWheel";
import GreenHeader from "../GreenHeader";
// import { createFakeObservations } from "../../utility/test";

type Props = {
  navigation: any
}

class MyObservations extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: [],
      loading: true
    };
  }

  fetchObservations() {
    // createFakeObservations();
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = [];

        const species = realm.objects( "ObservationRealm" );
        const taxaIdList = Object.keys( taxaIds );

        taxaIdList.forEach( ( id ) => {
          const speciesSeen = [];
          species.filtered( `taxon.iconicTaxonId == ${id} AND taxon.preferredCommonName != null` );

          species.forEach( ( taxon ) => {
            const { defaultPhoto } = taxon.taxon;
            const { mediumUrl, squareUrl } = defaultPhoto;

            if ( defaultPhoto && mediumUrl !== null && squareUrl !== null ) {
              speciesSeen.push( taxon );
            }
          } );

          observations.push( {
            id,
            speciesSeen
          } );
        } );

        observations.sort( ( a, b ) => {
          if ( a.speciesSeen.length > b.speciesSeen.length ) {
            return -1;
          }
          return 1;
        } );

        this.setState( {
          observations: species.length > 0 ? observations : species,
          loading: false
        } );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  }

  render() {
    const { observations, loading } = this.state;
    const { navigation } = this.props;

    const iconicTaxonList = [];

    observations.forEach( ( iconicTaxon ) => {
      const list = <ObservationList observations={iconicTaxon.speciesSeen} id={iconicTaxon.id} navigation={navigation} />;

      iconicTaxonList.push( list );
    } );

    let content;

    if ( loading ) {
      content = (
        <View style={styles.loadingWheel}>
          <LoadingWheel color="black" />
        </View>
      );
    } else if ( observations.length > 0 ) {
      content = (
        <ScrollView>
          {iconicTaxonList}
          <Padding />
        </ScrollView>
      );
    } else {
      content = (
        <View style={styles.noSpecies}>
          <Text style={styles.noSpeciesHeaderText}>{i18n.t( "observations.no_obs" ).toLocaleUpperCase()}</Text>
          <Text style={styles.noSpeciesText}>{i18n.t( "observations.help" )}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate( "Camera" )}
            style={styles.greenButton}
          >
            <Text style={styles.buttonText}>{i18n.t( "observations.open_camera" ).toLocaleUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents onDidFocus={() => this.fetchObservations()} />
          <GreenHeader header={i18n.t( "observations.header" )} navigation={navigation} />
          {content}
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default MyObservations;
