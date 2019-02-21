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
import Geocoder from "react-native-geocoder";

import i18n from "../../i18n";
import { getLatAndLng } from "../../utility/locationHelpers";
import { capitalizeNames } from "../../utility/helpers";
import iconicTaxaNames from "../../utility/iconicTaxonDict";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import realmConfig from "../../models/index";
import SimilarSpecies from "./SimilarSpecies";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";
import LoadingWheel from "../LoadingWheel";

type Props = {
  navigation: any
}

class SpeciesDetail extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const { id, commonName, scientificName } = navigation.state.params;

    this.state = {
      id,
      location: null,
      photos: [],
      commonName,
      scientificName,
      about: null,
      seenDate: null,
      timesSeen: null,
      taxaType: null,
      region: {},
      observationsByMonth: [],
      nearbySpeciesCount: null,
      error: null,
      userPhoto: null,
      endangered: false,
      endemic: false,
      threatened: false,
      native: false,
      similarSpecies: [],
      ancestors: [],
      loading: true
    };
  }

  async fetchUserLocation() {
    const userLocation = await getLatAndLng();
    const { latitude, longitude } = userLocation;
    this.reverseGeocodeLocation( latitude, longitude );

    this.setState( {
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
      }
    }, () => {
      this.fetchNearbySpeciesCount( latitude, longitude );
      this.checkIfSpeciesIsNative( latitude, longitude );
    } );
  }

  reverseGeocodeLocation( lat, lng ) {
    Geocoder.geocodePosition( { lat, lng } ).then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      this.setState( {
        location: locality || subAdminArea
      } );
    } ).catch( () => {
      // console.log( err, "error" );
    } );
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
      const conservationStatus = taxa.taxon_photos[0].taxon.conservation_status;

      this.setState( {
        scientificName: taxa.name,
        photos: taxa.taxon_photos,
        about: i18n.t( "species_detail.wikipedia", { about: taxa.wikipedia_summary.replace( /<[^>]+>/g, "" ) } ),
        timesSeen: taxa.observations_count,
        taxaType: taxa.iconic_taxon_name,
        ancestors: taxa.ancestors,
        endangered: conservationStatus ? conservationStatus.status_name : false
      } );
    } ).catch( () => {
      // console.log( err, "error fetching taxon details" );
    } );
  }

  fetchNearbySpeciesCount( latitude, longitude ) {
    const { id } = this.state;

    const params = {
      lat: latitude,
      lng: longitude,
      radius: 50,
      taxon_id: id
    };

    inatjs.observations.speciesCounts( params ).then( ( { results } ) => {
      this.setState( {
        nearbySpeciesCount: results.length > 0 ? results[0].count : 0
      } );
    } ).catch( ( err ) => {
      console.log( err, "error fetching species count" );
    } );
  }

  fetchHistogram() {
    const { id, observationsByMonth } = this.state;

    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id
    };

    inatjs.observations.histogram( params ).then( ( response ) => {
      const countsByMonth = response.results.month_of_year;

      for ( let i = 1; i <= 12; i += 1 ) {
        observationsByMonth.push( {
          month: i,
          count: countsByMonth[i]
        } );
      }
      this.setState( { observationsByMonth } );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch histogram" );
    } );
  }

  fetchSimilarSpecies() {
    const { id } = this.state;
    const params = {
      taxon_id: id
    };

    inatjs.identifications.similar_species( params ).then( ( response ) => {
      const shortenedList = response.results.slice( 0, 20 );
      const taxa = shortenedList.map( r => r.taxon );
      this.setState( {
        similarSpecies: taxa,
        loading: false
      } );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch similar species" );
    } );
  }

  checkIfSpeciesIsNative( latitude, longitude ) {
    const { id } = this.state;

    const params = {
      per_page: 1,
      lat: latitude,
      lng: longitude,
      radius: 50,
      taxon_id: id
    };

    inatjs.observations.search( params ).then( ( response ) => {
      const { taxon } = response.results[0];
      if ( taxon ) {
        this.setState( {
          threatened: taxon.threatened,
          endemic: taxon.endemic,
          introduced: taxon.introduced,
          native: taxon.native
        } );
      }
    } ).catch( ( err ) => {
      console.log( err, "err fetching observations nearby" );
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
      location,
      similarSpecies,
      ancestors,
      introduced,
      endangered,
      endemic,
      native,
      threatened,
      loading
    } = this.state;

    const { navigation } = this.props;

    const photoList = [];
    const taxonomy = [];

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

    let margin = 0;

    if ( ancestors.length > 0 ) {
      ancestors.forEach( ( ancestor ) => {
        const rank = (
          <View key={`taxon-${ancestor.rank}`} style={{ marginLeft: margin }}>
            {ancestor.preferred_common_name ? (
              <View style={styles.taxonomyRow}>
                <Text style={styles.bullets}>&#8226;</Text>
                <View>
                  <Text style={styles.taxonomyHeader}>
                    {capitalizeNames( ancestor.rank )}
                    {" "}
                    {ancestor.name}
                  </Text>
                  <Text numOfLines={1} style={styles.taxonomyText}>
                    {capitalizeNames( ancestor.preferred_common_name )}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        );
        if ( ancestor.preferred_common_name ) {
          margin += 15;
        }

        taxonomy.push( rank );
      } );
    }

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchUserLocation();
            this.fetchTaxonDetails();
            this.checkIfSpeciesSeen();
            this.fetchHistogram();
            this.fetchSimilarSpecies();
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
            {photos.length > 0
              ? photoList
              : (
                <View style={styles.loading}>
                  <LoadingWheel color="white" />
                </View>
              )}
          </ScrollView>
          <View style={styles.greenBanner}>
            {taxaType ? (
              <Text style={styles.iconicTaxaText}>
                {i18n.t( iconicTaxaNames[taxaType] ).toLocaleUpperCase()}
              </Text>
            ) : null}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.commonNameText}>{commonName}</Text>
            <Text style={styles.scientificNameText}>{scientificName}</Text>
            <View style={styles.greenButtonContainer}>
              {endangered ? (
                <View style={styles.greenButton}>
                  <Text style={styles.greenButtonText}>{i18n.t( "species_detail.endangered" ).toLocaleUpperCase()}</Text>
                </View>
              ) : null}
              {endemic ? (
                <View style={styles.greenButton}>
                  <Text style={styles.greenButtonText}>{i18n.t( "species_detail.endemic" ).toLocaleUpperCase()}</Text>
                </View>
              ) : null}
              {native ? (
                <View style={styles.greenButton}>
                  <Text style={styles.greenButtonText}>{i18n.t( "species_detail.native" ).toLocaleUpperCase()}</Text>
                </View>
              ) : null}
              {threatened ? (
                <View style={styles.greenButton}>
                  <Text style={styles.greenButtonText}>{i18n.t( "species_detail.threatened" ).toLocaleUpperCase()}</Text>
                </View>
              ) : null}
              {introduced ? (
                <View style={styles.greenButton}>
                  <Text style={styles.greenButtonText}>{i18n.t( "species_detail.introduced" ).toLocaleUpperCase()}</Text>
                </View>
              ) : null}
            </View>
            {seenDate ? (
              <View style={styles.row}>
                <Image source={icons.checklist} style={styles.checkmark} />
                <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
              </View>
            ) : null}
            <Text style={styles.headerText}>{i18n.t( "species_detail.about" ).toLocaleUpperCase()}</Text>
            <Text style={styles.text}>{about}</Text>
            <Text style={styles.headerText}>{i18n.t( "species_detail.range_map" ).toLocaleUpperCase()}</Text>
            {region.latitude ? (
              <SpeciesMap
                region={region}
                id={id}
                error={error}
              />
            ) : null}
            <Text style={styles.headerText}>{i18n.t( "species_detail.taxonomy" ).toLocaleUpperCase()}</Text>
            {taxonomy}
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
            {observationsByMonth ? <SpeciesChart data={observationsByMonth} /> : null}
            <Text style={styles.headerText}>{i18n.t( "species_detail.related" ).toLocaleUpperCase()}</Text>
          </View>
          <SimilarSpecies navigation={navigation} taxa={similarSpecies} loading={loading} />
          <Padding />
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default SpeciesDetail;
