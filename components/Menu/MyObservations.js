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
        const observations = realm.objects( "ObservationRealm" );
        console.log( observations, "obs" );
        this.setState( {
          observations
        } );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  }

  render() {
    const { observations } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.fetchObservations()} />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {i18n.t( "observations.header" ).toLocaleUpperCase()}
          </Text>
        </View>
        <ScrollView>
          {observations.length > 0 ? (
            <ObservationList observations={observations} navigation={navigation} />
          ) : (
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
