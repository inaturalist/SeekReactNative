// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  SafeAreaView,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";
import Realm from "realm";
import moment from "moment";
import RNFS from "react-native-fs";

import i18n from "../../i18n";
import { fetchLocationName, fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import iconicTaxaNames from "../../utility/iconicTaxonDict";
import realmConfig from "../../models/index";
import SpeciesStats from "./SpeciesStats";
import SimilarSpecies from "./SimilarSpecies";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import SpeciesPhotos from "./SpeciesPhotos";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";
import SpeciesError from "./SpeciesError";
import INatObs from "./INatObs";
import Padding from "../Padding";
import {
  getSpeciesId,
  capitalizeNames,
  getRoute,
  checkForInternet
} from "../../utility/helpers";

type Props = {
  navigation: any
}

class SpeciesDetail extends Component<Props> {
  constructor() {
    super();

    this.state = {
      id: null,
      location: null,
      photos: [],
      commonName: null,
      scientificName: null,
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
      loadingSpecies: true,
      route: null
    };

    this.fetchiNatData = this.fetchiNatData.bind( this );
    this.updateScreen = this.updateScreen.bind( this );
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

  setRegion( latitude, longitude ) {
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

  setTaxonStats( stats ) {
    this.setState( { stats } );
  }

  setSpeciesId( id ) {
    this.setState( { id }, () => {
      this.checkIfSpeciesSeen();
      this.fetchTaxonDetails();
      this.fetchHistogram();
      this.fetchSimilarSpecies();
    } );
  }

  setUserPhoto( seenTaxa ) {
    const { taxon } = seenTaxa;
    const { defaultPhoto } = taxon;

    if ( defaultPhoto && defaultPhoto.mediumUrl ) {
      this.setState( { userPhoto: defaultPhoto.mediumUrl } );
    } else {
      this.setState( { userPhoto: null } );
    }
  }

  updateScreen() {
    this.fetchiNatData();
  }

  reverseGeocodeLocation( lat, lng ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      this.setLocation( location );
    } ).catch( () => this.setLocation( null ) );
  }

  async fetchSpeciesId() {
    const id = await getSpeciesId();
    this.setSpeciesId( id );
  }

  async fetchRoute() {
    const route = await getRoute();
    this.setState( { route } );
  }

  async fetchUserLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      this.reverseGeocodeLocation( latitude, longitude );
      this.setRegion( latitude, longitude );
    } ).catch( () => this.setError( "internet" ) );
  }

  resetState() {
    this.setState( {
      location: null,
      photos: [],
      commonName: null,
      scientificName: null,
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
      loadingSpecies: true,
      route: null
    } );
  }

  checkForLastSeenLocation( seenTaxa ) {
    const { latitude, longitude } = seenTaxa;

    if ( latitude && longitude ) {
      this.reverseGeocodeLocation( latitude, longitude );

      this.setRegion( latitude, longitude );
    } else {
      this.fetchUserLocation();
    }
  }

  checkIfSpeciesSeen() {
    const { id } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const seenTaxa = observations.filtered( `taxon.id == ${id}` )[0];

        if ( seenTaxa ) {
          this.checkForLastSeenLocation( seenTaxa );
        } else {
          this.fetchUserLocation();
        }

        let userPhoto;
        const seenDate = seenTaxa ? moment( seenTaxa.date ).format( "ll" ) : null;

        const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;

        if ( seenTaxa ) {
          if ( Platform.OS === "ios" && seekv1Photos ) {
            const photoPath = `${seekv1Photos}/${seenTaxa.uuidString}`;
            if ( !RNFS.exists( photoPath ) ) {
              this.setUserPhoto( seenTaxa );
            } else {
              RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
                userPhoto = `data:image/jpeg;base64,${encodedData}`;
                this.setState( { userPhoto } );
              } ).catch( () => {
                this.setUserPhoto( seenTaxa );
              } );
            }
          } else {
            this.setUserPhoto( seenTaxa );
          }
        }

        this.setState( { seenDate } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchTaxonDetails() {
    const { id } = this.state;

    const params = {
      locale: i18n.currentLocale()
    };

    inatjs.taxa.fetch( id, params ).then( ( response ) => {
      const taxa = response.results[0];
      const commonName = capitalizeNames( taxa.preferred_common_name || taxa.name );
      const scientificName = taxa.name;
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
        commonName,
        scientificName,
        photos,
        about: taxa.wikipedia_summary ? i18n.t( "species_detail.wikipedia", { about: taxa.wikipedia_summary.replace( /<[^>]+>/g, "" ) } ) : null,
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
    const { id } = this.state;

    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id
    };

    inatjs.observations.histogram( params ).then( ( response ) => {
      const countsByMonth = response.results.month_of_year;
      const observationsByMonth = [];

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
      without_taxon_id: 43584,
      locale: i18n.currentLocale()
    };

    inatjs.identifications.similar_species( params ).then( ( response ) => {
      const shortenedList = response.results.slice( 0, 20 );
      const taxa = shortenedList.map( r => r.taxon );
      const taxaWithPhotos = [];
      taxa.forEach( ( taxon ) => {
        if ( taxon.default_photo && taxon.default_photo.medium_url ) {
          taxaWithPhotos.push( taxon );
        }
      } );

      this.setState( {
        similarSpecies: taxaWithPhotos,
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

    inatjs.observations.search( params ).then( ( { results } ) => {
      const { taxon } = results[0];
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

  fetchiNatData( screen ) {
    this.checkInternetConnection();
    this.setLoading( true );
    if ( screen === "similarSpecies" ) {
      this.resetState();
    }
    this.fetchSpeciesId();
    this.fetchRoute();

    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
  }

  checkInternetConnection() {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        this.setError( "internet" );
      } else {
        this.setError( null );
      }
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
      loadingSpecies,
      route
    } = this.state;

    const { navigation } = this.props;

    const showGreenButtons = Object.keys( stats ).map( ( stat => stats[stat] ) );

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => this.fetchiNatData()}
            onWillBlur={() => this.resetState()}
          />
          <ScrollView
            ref={( ref ) => { this.scrollView = ref; }}
          >
            <SpeciesPhotos
              navigation={navigation}
              photos={photos}
              userPhoto={userPhoto}
              loading={loading}
              route={route}
            />
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
              <SpeciesError
                seenDate={seenDate}
                updateScreen={this.updateScreen}
              />
            ) : (
              <View style={styles.secondTextContainer}>
                {showGreenButtons.includes( true ) ? <SpeciesStats stats={stats} /> : null}
                {seenDate ? (
                  <View style={[
                    styles.row,
                    showGreenButtons.includes( true ) && { marginTop: 21 }
                  ]}
                  >
                    <Image source={icons.checklist} style={styles.checkmark} />
                    <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
                  </View>
                ) : null}
                {about ? (
                  <View>
                    <Text style={[styles.headerText, showGreenButtons.includes( true ) && { marginTop: 38 }]}>{i18n.t( "species_detail.about" ).toLocaleUpperCase()}</Text>
                    <Text style={styles.text}>{about}</Text>
                  </View>
                ) : null}
                {id !== 43584 ? (
                  <View>
                    <SpeciesMap
                      navigation={navigation}
                      region={region}
                      id={id}
                      error={error}
                    />
                    <SpeciesTaxonomy ancestors={ancestors} />
                    <INatObs
                      location={location}
                      nearbySpeciesCount={nearbySpeciesCount}
                      timesSeen={timesSeen}
                      navigation={navigation}
                    />
                    {observationsByMonth.length > 0
                      ? <SpeciesChart data={observationsByMonth} />
                      : null}
                  </View>
                ) : (
                  <View>
                    <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
                    <Padding />
                  </View>
                )}
              </View>
            ) }
            {id !== 43584 ? (
              <View>
                <SimilarSpecies
                  taxa={similarSpecies}
                  loading={loadingSpecies}
                  fetchiNatData={this.fetchiNatData}
                  setSimilarSpecies={this.setSimilarSpecies}
                />
                <View style={styles.bottomPadding} />
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default SpeciesDetail;
