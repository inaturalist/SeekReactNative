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
import backgrounds from "../../assets/backgrounds";
import logos from "../../assets/logos";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import { capitalizeNames, shuffleList } from "../../utility/helpers";
import LoadingWheel from "../LoadingWheel";

type Props = {
  navigation: any
}

class iNatStatsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: i18n.toNumber( 16824100, { precision: 0 } ),
      observers: i18n.toNumber( 451400, { precision: 0 } ),
      photos: [],
      loading: true
    };
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
        if ( photo.defaultPhoto.license_code && photo.defaultPhoto.license_code !== "cc0" ) {
          photos.push( {
            photoUrl: photo.defaultPhoto.medium_url,
            commonName: photo.preferred_common_name ? capitalizeNames( photo.preferred_common_name ) : capitalizeNames( photo.iconic_taxon_name ),
            attribution: photo.defaultPhoto.attribution
          } );
        }
      } );

      this.setState( {
        photos: shuffleList( photos ),
        loading: false
      } );
    } ).catch( ( error ) => {
      console.log( error, "couldn't fetch project photos" );
    } );
  }

  render() {
    const {
      observations,
      observers,
      photos,
      loading
    } = this.state;
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
            this.fetchProjectPhotos();
          }}
        />
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={styles.touchable}
                onPress={() => navigation.goBack()}
                style={{ padding: 5 }}
              >
                <Image
                  source={icons.backButtonGreen}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Image style={styles.logo} source={logos.iNat} />
              <View />
            </View>
            <Image source={backgrounds.heatMap} style={styles.heatMap} />
            <View style={styles.missionContainer}>
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.global_observations" ).toLocaleUpperCase()}
              </Text>
              <Image source={logos.bird} style={styles.iNatLogo} />
              <Text style={styles.numberText}>
                {observations}
                {"+"}
              </Text>
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.naturalists_worldwide" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.numberText}>
                {observers}
                {"+"}
              </Text>
              <Text style={styles.missionHeaderText}>
                {i18n.t( "inat_stats.seek_data" )}
              </Text>
              <Text style={styles.missionText}>
                {i18n.t( "inat_stats.about_inat" )}
              </Text>
            </View>
            {loading ? (
              <View style={[styles.center, styles.photoContainer]}>
                <LoadingWheel color="black" />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                indicatorStyle="white"
                contentContainerStyle={styles.photoContainer}
              >
                {photoList}
              </ScrollView>
            )}
            <Text style={styles.italicText}>
              {i18n.t( "inat_stats.thanks" )}
            </Text>
            {/* <TouchableOpacity
              style={styles.greenButton}
              onPress={() => navigation.navigate( "Login" )}
            >
              <Text style={styles.buttonText}>{i18n.t( "inat_stats.join" )}</Text>
            </TouchableOpacity> */}
            <Padding />
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default iNatStatsScreen;
