// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  NetInfo,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";
import Realm from "realm";
import moment from "moment";
import Geocoder from "react-native-geocoder";

import i18n from "../../i18n";
import { seenBeforeSeekV2 } from "../../utility/dateHelpers";
import { getLatAndLng } from "../../utility/locationHelpers";
import iconicTaxaNames from "../../utility/iconicTaxonDict";
import Footer from "../Home/Footer";
import realmConfig from "../../models/index";
import SpeciesStats from "./SpeciesStats";
import SimilarSpecies from "./SimilarSpecies";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import SpeciesPhotos from "./SpeciesPhotos";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";
import LoadingWheel from "../LoadingWheel";
import INatObs from "./INatObs";

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
      stats: {},
      similarSpecies: [],
      ancestors: [],
      loading: true,
      loadingSpecies: true
    };
  }

  setError( error ) {
    this.setState( { error } );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  setNearbySpeciesCount( nearbySpeciesCount ) {
    this.setState( { nearbySpeciesCount } );
  }

  setTaxonStats( stats ) {
    this.setState( { stats } );
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
      this.setLocation( locality || subAdminArea );
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
          if ( !seenBeforeSeekV2( moment( seenDate ) ) ) {
            userPhoto = seenTaxa[0].taxon.defaultPhoto.mediumUrl;
          } else {
            userPhoto = null;
          }

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
    const { id, scientificName, commonName } = this.state;

    inatjs.taxa.fetch( id ).then( ( response ) => {
      const taxa = response.results[0];
      const conservationStatus = taxa.taxon_photos[0].taxon.conservation_status;
      const ancestors = [];
      const ranks = ["kingdom", "phylum", "class", "order", "family", "genus"];
      taxa.ancestors.forEach( ( ancestor ) => {
        if ( ranks.includes( ancestor.rank ) ) {
          ancestors.push( ancestor );
        }
      } );

      ancestors.push( {
        rank: "species",
        name: scientificName || null,
        preferred_common_name: commonName || null
      } );

      const photos = [];

      taxa.taxon_photos.forEach( ( photo ) => {
        if ( photo.photo.license_code && photos.length < 8 ) {
          photos.push( photo );
        }
      } );

      this.setState( {
        scientificName: taxa.name,
        photos,
        about: i18n.t( "species_detail.wikipedia", { about: taxa.wikipedia_summary.replace( /<[^>]+>/g, "" ) } ),
        timesSeen: taxa.observations_count,
        taxaType: taxa.iconic_taxon_name,
        ancestors,
        stats: {
          endangered: conservationStatus ? conservationStatus.status_name : false
        }
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
      this.setNearbySpeciesCount( results.length > 0 ? results[0].count : 0 );
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
      this.setLoading( false );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch histogram" );
    } );
  }

  fetchSimilarSpecies() {
    const { id } = this.state;
    const params = {
      taxon_id: id,
      without_taxon_id: 43584
    };

    inatjs.identifications.similar_species( params ).then( ( response ) => {
      const shortenedList = response.results.slice( 0, 20 );
      const taxa = shortenedList.map( r => r.taxon );
      this.setState( {
        similarSpecies: taxa,
        loadingSpecies: false
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
        const stats = {
          threatened: taxon.threatened,
          endemic: taxon.endemic,
          introduced: taxon.introduced,
          native: taxon.native
        };
        this.setTaxonStats( stats );
      }
    } ).catch( ( err ) => {
      console.log( err, "err fetching native threatened etc" );
    } );
  }

  fetchiNatData() {
    const { error } = this.state;
    if ( !error ) {
      this.checkIfSpeciesSeen();
      this.fetchUserLocation();
      this.fetchTaxonDetails();
      this.fetchHistogram();
      this.fetchSimilarSpecies();
    }
  }

  checkInternetConnection() {
    NetInfo.getConnectionInfo()
      .then( ( connectionInfo ) => {
        if ( connectionInfo.type === "none" || connectionInfo.type === "unknown" ) {
          this.setError( "internet" );
          this.checkIfSpeciesSeen();
        }
        this.setError( null );
      } ).catch( ( err ) => {
        console.log( err, "can't check connection" );
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
      stats,
      loading,
      loadingSpecies
    } = this.state;

    const { navigation } = this.props;

    const showGreenButtons = Object.keys( stats ).map( ( stat => stats[stat] ) );

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => {
              this.checkInternetConnection();
              this.fetchiNatData();
            }}
          />
          <ScrollView>
            {loading ? (
              <View style={[styles.photoContainer, styles.loading]}>
                <LoadingWheel color="white" />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator
                scrollEventThrottle
                pagingEnabled
                nestedScrollEnabled
                indicatorStyle="white"
                contentContainerStyle={styles.photoContainer}
              >
                {( photos.length > 0 || userPhoto ) && !loading
                  ? <SpeciesPhotos photos={photos} userPhoto={userPhoto} />
                  : null}
              </ScrollView>
            )}
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                hitSlop={styles.touchable}
              >
                <Image source={icons.backButton} />
              </TouchableOpacity>
            </View>
            <Image source={icons.swipeLeft} style={styles.leftArrow} />
            <Image source={icons.swipeRight} style={styles.rightArrow} />
            {taxaType && iconicTaxaNames[taxaType]
              ? (
                <View style={styles.greenBanner}>
                  <Text style={styles.iconicTaxaText}>
                    {i18n.t( iconicTaxaNames[taxaType] ).toLocaleUpperCase()}
                  </Text>
                </View>
              ) : null}
            <View style={styles.textContainer}>
              <Text style={styles.commonNameText}>{commonName}</Text>
              <Text style={styles.scientificNameText}>{scientificName}</Text>
            </View>
            {error ? (
              <TouchableOpacity
                style={styles.errorContainer}
                onPress={() => this.checkInternetConnection()}
              >
                <View style={styles.errorRow}>
                  <Image source={icons.internet} />
                  <Text style={styles.errorText}>{i18n.t( "species_nearby.internet_error" )}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.secondTextContainer}>
                {showGreenButtons.includes( true ) ? <SpeciesStats stats={stats} /> : null}
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
                <TouchableOpacity
                  style={styles.darkGreenButton}
                  onPress={() => navigation.navigate( "RangeMap", { region, id } )}
                >
                  <Text style={styles.darkGreenButtonText}>{i18n.t( "species_detail.view_map" ).toLocaleUpperCase()}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>{i18n.t( "species_detail.taxonomy" ).toLocaleUpperCase()}</Text>
                <SpeciesTaxonomy ancestors={ancestors} />
                <Text style={styles.headerText}>{i18n.t( "species_detail.inat_obs" ).toLocaleUpperCase()}</Text>
                <INatObs
                  location={location}
                  nearbySpeciesCount={nearbySpeciesCount}
                  timesSeen={timesSeen}
                  navigation={navigation}
                />
                <Text style={styles.headerText}>{i18n.t( "species_detail.monthly_obs" ).toLocaleUpperCase()}</Text>
                {observationsByMonth.length > 0 ? <SpeciesChart data={observationsByMonth} /> : null}
                <Text style={styles.headerText}>{i18n.t( "species_detail.similar" ).toLocaleUpperCase()}</Text>
              </View>
            ) }
            {error && seenDate ? (
              <View style={styles.textContainer}>
                <Text style={[styles.text, { textAlign: "center" }]}>{i18n.t( "species_detail.species_saved" )}</Text>
              </View>
            ) : null}
            {!error
              ? <SimilarSpecies navigation={navigation} taxa={similarSpecies} loading={loadingSpecies} />
              : null}
            <View style={styles.bottomPadding} />
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default SpeciesDetail;
