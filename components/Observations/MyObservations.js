// @flow

import React, { Component } from "react";
import {
  ScrollView,
  View,
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
import NoObservations from "./NoObservations";

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
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = [];

        const species = realm.objects( "ObservationRealm" );
        const taxaIdList = Object.keys( taxaIds );

        taxaIdList.forEach( ( id ) => {
          const iconicTaxonSeen = species
            .filtered( `taxon.iconicTaxonId == ${id}` )
            .sorted( "date", true );

          observations.push( {
            id,
            iconicTaxonSeen
          } );
        } );

        observations.sort( ( a, b ) => {
          if ( a.iconicTaxonSeen.length > b.iconicTaxonSeen.length ) {
            return -1;
          }
          return 1;
        } );

        this.setState( {
          observations: species.length > 0 ? observations : [],
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
      const list = (
        <ObservationList
          observations={iconicTaxon.iconicTaxonSeen}
          id={iconicTaxon.id}
          navigation={navigation}
        />
      );

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
      content = <NoObservations navigation={navigation} />;
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
