// @flow

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
// import { NavigationEvents } from "react-navigation";

import styles from "../../styles/home/home";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import Footer from "./Footer";

type Props = {
  navigation: any,
  fetchTaxa: Function,
  taxa: Array,
  loading: boolean
}

class HomeScreen extends Component<Props> {
  componentWillMount() {
    const { fetchTaxa } = this.props;
    fetchTaxa();
  }

  render() {
    const { taxa, loading, navigation } = this.props;
    console.log( this.props, "props in home screen" );

    return (
      <View style={styles.container}>
        {/* <NavigationEvents
          onWillFocus={() => fetchTaxa()}
        /> */}
        <View style={styles.container}>
          <ScrollView>
            <SpeciesNearby taxa={taxa} loading={loading} navigation={navigation} />
            <View style={styles.divider} />
            <GetStarted navigation={navigation} />
          </ScrollView>
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default HomeScreen;
