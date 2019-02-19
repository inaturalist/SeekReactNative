// @flow

import React, { Component } from "react";
import {
  View,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation"; 
import inatjs from "inaturalistjs";
import Realm from "realm";
import moment from "moment";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/iconicTaxonDict";
import Footer from "../Home/Footer";
import realmConfig from "../../models/index";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import styles from "../../styles/species";
import { margins } from "../../styles/global";
import icons from "../../assets/icons";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

type Props = {
  navigation: any
}

class SpeciesDetail extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      id,
      latitude,
      location,
      longitude,
      commonName,
      scientificName
    } = navigation.state.params;

    this.state = {
      id,
      location,
      photos: [],
      commonName,
      scientificName,
      about: null,
      seenDate: null,
      timesSeen: null,
      taxaType: null,
      region: {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      },
      observationsByMonth: [],
      nearbySpeciesCount: null,
      error: null,
      userPhoto: null
    };
  }

  checkIfSpeciesSeen() {
    const { id } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const seenTaxa = observations.filtered( `taxon.id == ${id}` );
        let seenDate;
        let userPhoto;

        if ( seenTaxa[0] ) {
          seenDate = moment( seenTaxa[0].date ).format( "ll" );
          userPhoto = seenTaxa[0].taxon.defaultPhoto.mediumUrl;

          this.setState( {
            seenDate,
            userPhoto
          } );
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchTaxonDetails() {
    const { id } = this.state;

    inatjs.taxa.fetch( id ).then( ( response ) => {
      const taxa = response.results[0];
      this.setState( {
        photos: taxa.taxon_photos,
        about: `${taxa.wikipedia_summary.replace( /<[^>]+>/g, "" )}\n\nSource: Wikipedia`,
        timesSeen: taxa.observations_count,
        taxaType: taxa.iconic_taxon_name
      } );
    } ).catch( () => {
      // console.log( err, "error fetching taxon details" );
    } );
  }

  fetchNearbySpeciesCount() {
    const { id, region } = this.state;
    const { latitude, longitude } = region;

    const params = {
      lat: latitude,
      lng: longitude,
      radius: 50,
      taxon_id: id
    };

    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const nearbySpeciesCount = response.results[0].count;
      this.setState( {
        nearbySpeciesCount
      } );
    } ).catch( ( err ) => {
      // console.log( err, "error fetching species count" );
    } );
  }

  fetchHistogram() {
    const { id, observationsByMonth, region } = this.state;
    const { latitude, longitude } = region;

    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id,
      lat: latitude,
      lng: longitude,
      radius: 50
    };

    inatjs.observations.histogram( params ).then( ( response ) => {
      const countsByMonth = response.results.month_of_year;

      for ( let i = 1; i <= 12; i += 1 ) {
        observationsByMonth.push( {
          month: i,
          count: countsByMonth[i]
        } );
      }
      this.setState( {
        observationsByMonth
      }, () => console.log( this.state.observationsByMonth, "obs by month" ) );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch histogram" );
    } );
  }

  render() {
    const {
      about,
      commonName,
      id,
      nearbySpeciesCount,
      observationsByMonth,
      photos,
      region,
      scientificName,
      seenDate,
      timesSeen,
      taxaType,
      error,
      userPhoto,
      location
    } = this.state;

    const {
      navigation
    } = this.props;

    const photoList = [];

    if ( userPhoto ) {
      photoList.push(
        <View key="user-image">
          <Image
            source={{ uri: userPhoto }}
            style={styles.image}
          />
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={icons.backButton} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    photos.forEach( ( photo, i ) => {
      if ( i <= 7 ) {
        const image = (
          <View key={`image${photo.taxon_id}${i}`}>
            <Image
              source={{ uri: photo.photo.original_url }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={icons.backButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.photoOverlay}>
              <TouchableOpacity
                style={styles.ccButton}
                onPress={() => Alert.alert(
                  "License",
                  photo.photo.attribution
                )}
              >
                <Text style={[styles.buttonText, styles.ccButtonText]}>{i18n.t( "species_detail.cc" ).toLocaleUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        photoList.push( image );
      }
    } );

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchTaxonDetails();
            this.checkIfSpeciesSeen();
            this.fetchHistogram();
            this.fetchNearbySpeciesCount();
          }}
        />
        <ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            scrollEventThrottle
            pagingEnabled
            nestedScrollEnabled
            indicatorStyle="white"
            contentContainerStyle={styles.photoContainer}
          >
            {photoList}
          </ScrollView>
          <View style={styles.greenBanner}>
            <Text style={styles.iconicTaxaText}>
              {i18n.t( iconicTaxaNames[taxaType] ).toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.commonNameText}>{commonName}</Text>
            <Text style={styles.scientificNameText}>{scientificName}</Text>
            {seenDate ? (
              <View style={styles.row}>
                <Image source={icons.checklist} style={styles.checkmark} />
                <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
              </View>
            ) : null}
            <Text style={styles.headerText}>{i18n.t( "species_detail.about" ).toLocaleUpperCase()}</Text>
            <Text style={styles.text}>{about}</Text>
            <Text style={styles.headerText}>{i18n.t( "species_detail.range_map" ).toLocaleUpperCase()}</Text>
            <SpeciesMap
              region={region}
              id={id}
              error={error}
            />
            <Text style={styles.headerText}>{i18n.t( "species_detail.inat_obs" ).toLocaleUpperCase()}</Text>
            <View style={styles.stats}>
              <View>
                <Text style={styles.secondHeaderText}>{location}</Text>
                <Text style={styles.number}>{nearbySpeciesCount}</Text>
              </View>
              <View>
                <Text style={styles.secondHeaderText}>{i18n.t( "species_detail.worldwide" )}</Text>
                <Text style={styles.number}>{timesSeen}</Text>
              </View>
            </View>
            <Text style={styles.headerText}>{i18n.t( "species_detail.monthly_obs" ).toLocaleUpperCase()}</Text>
            {/* <SpeciesChart data={observationsByMonth} error={error} /> */}
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default SpeciesDetail;
