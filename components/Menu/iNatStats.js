// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";

import styles from "../../styles/menu/iNatStats";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import logos from "../../assets/logos";
import StatsMap from "./StatsMap";
import Footer from "../Challenges/ChallengeFooter";
import Padding from "../Padding";
import { getObservationData, capitalizeNames } from "../../utility/helpers";

type Props = {
  navigation: any
}

class iNatStatsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: null,
      observers: null,
      photos: []
    };
  }

  async setObservationData() {
    const data = await getObservationData();
    const { observations, observers } = data;
    this.setState( {
      observations,
      observers
    } );
  }

  fetchProjectPhotos() {
    const params = {
      project_id: 29905,
      photos: true
    };

    inatjs.observations.search( params ).then( ( { results } ) => {
      const taxa = results.map( r => r.taxon );
      const photos = [];

      taxa.forEach( ( photo ) => {
        photos.push( {
          photoUrl: photo.defaultPhoto.medium_url,
          commonName: photo.preferred_common_name ? capitalizeNames( photo.preferred_common_name ) : capitalizeNames( photo.iconic_taxon_name ),
          attribution: photo.defaultPhoto.attribution
        } );
      } );

      this.setState( {
        photos
      } );
    } ).catch( ( error ) => {
      console.log( error, "couldn't fetch project photos" );
    } );
  }

  render() {
    const { observations, observers, photos } = this.state;
    const { navigation } = this.props;

    const photoList = [];

    photos.forEach( ( photo, i ) => {
      if ( i <= 8 ) {
        const image = (
          <View
            key={`image${photo.photoUrl}${i}`}
            style={styles.center}
          >
            <Image
              source={{ uri: photo.photoUrl }}
              style={styles.image}
            />
            <Text style={[styles.missionText, styles.caption]}>
              {photo.commonName}
              {" "}
              {i18n.t( "inat_stats.by" )}
              {" "}
              {photo.attribution}
            </Text>
          </View>
        );
        photoList.push( image );
      }
    } );

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.setObservationData();
            this.fetchProjectPhotos();
          }}
        />
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icons.backButtonGreen}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Image style={styles.logo} source={logos.iNat} />
              <View />
            </View>
            <StatsMap />
            <View style={styles.missionContainer}>
              <Text style={styles.numberText}>
                {observations}
              </Text>
              <Image source={logos.bird} style={styles.iNatLogo} />
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.global_observations" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.numberText}>
                {observers}
              </Text>
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.naturalists_worldwide" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.missionHeaderText}>
                {i18n.t( "inat_stats.seek_data" )}
              </Text>
              <Text style={styles.missionText}>
                {i18n.t( "inat_stats.about_inat" )}
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              pagingEnabled
              indicatorStyle="white"
              contentContainerStyle={styles.photoContainer}
            >
              {photoList}
            </ScrollView>
            <View style={styles.missionContainer}>
              <Text style={styles.italicText}>
                {i18n.t( "inat_stats.contribute" )}
              </Text>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => navigation.navigate( "Login" )}
              >
                <Text style={styles.buttonText}>{i18n.t( "inat_stats.join" )}</Text>
              </TouchableOpacity>
              <Padding />
            </View>
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default iNatStatsScreen;
