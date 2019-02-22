// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity
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

type Props = {
  navigation: any
}

class MyObservations extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: []
    };
  }

  fetchObservations() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = [];
        
        const species = realm.objects( "ObservationRealm" );
        const taxaIdList = Object.keys( taxaIds );

        taxaIdList.forEach( ( id ) => {
          const speciesSeen = realm.objects( "ObservationRealm" ).filtered( `taxon.iconicTaxonId == ${id}` );

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
          observations: species.length > 0 ? observations : species
        } );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  }

  render() {
    const { observations } = this.state;
    const { navigation } = this.props;

    const iconicTaxonList = [];

    observations.forEach( ( iconicTaxon ) => {
      const list = <ObservationList observations={iconicTaxon.speciesSeen} id={iconicTaxon.id} navigation={navigation} />;

      iconicTaxonList.push( list );
    } );

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.fetchObservations()} />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {i18n.t( "observations.header" ).toLocaleUpperCase()}
          </Text>
        </View>
        <ScrollView>
          {observations.length > 0 ? iconicTaxonList : (
            <View style={styles.textContainer}>
              <Text style={styles.noSpeciesHeaderText}>{i18n.t( "observations.no_obs" ).toLocaleUpperCase()}</Text>
              <Text style={styles.noSpeciesText}>{i18n.t( "observations.help" )}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate( "Camera" )}
                style={styles.greenButton}
              >
                <Text style={styles.buttonText}>{i18n.t( "observations.open_camera" ).toLocaleUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          )}
          <Padding />
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default MyObservations;
