import React, { Component } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import Realm from "realm";

import realmConfig from "../models/index";
import NavBar from "./NavBar";
import styles from "../styles/collection";

class YourCollection extends Component {
  constructor() {
    super();

    this.state = {
      badges: [],
      observations: []
    };
  }

  componentDidMount() {
    this.fetchDataFromRealm();
  }

  fetchDataFromRealm() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const badges = realm.objects( "BadgeRealm" );
        console.log( observations, "observations from Realm" );
        console.log( badges, "badges from Realm" );
      } )
      .catch( e => console.log( "Err: ", e ) );
  }

  render() {
    const {
      observations
    } = this.state;

    return (
      <View style={styles.container}>
        <NavBar />
        <View style={styles.badges}>
          <Text style={styles.headerText}>Recent Badges</Text>
          <TouchableOpacity>
            <Text>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.species}>
          <View style={styles.taxonGrid}>
            <Text style={styles.headerText}>Species You&#39;ve Seen ({observations.length})</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default YourCollection;
