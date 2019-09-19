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
import { fetchLocationName, fetchTruncatedUserLocation, checkLocationPermissions } from "../../utility/locationHelpers";
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
import Spacer from "../iOSSpacer";
import {
  getSpeciesId,
  capitalizeNames,
  getRoute,
  checkForInternet
} from "../../utility/helpers";
import { dirPictures } from "../../utility/dirStorage";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

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
      region: {},
      observationsByMonth: [],
      nearbySpeciesCount: null,
      error: null,
      userPhoto: null,
      stats: {},
      similarSpecies: [],
      ancestors: [],
      loadingSpecies: true,
      route: null,
      iconicTaxonId: null
    };

    this.fetchiNatData = this.fetchiNatData.bind( this );
    this.updateScreen = this.updateScreen.bind( this );
  }

  setError( error ) {
    this.setState( { error } );
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
        latitudeDelta,
        longitudeDelta
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

    if ( defaultPhoto ) {
      if ( defaultPhoto.backupUri ) {
        const uri = defaultPhoto.backupUri.split( "/Pictures/" );
        const backupFilepath = `${dirPictures}/${uri[1]}`;
        RNFS.readFile( backupFilepath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setState( { userPhoto: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => {
          this.setState( { userPhoto: backupFilepath } );
        } );
      } else if ( defaultPhoto.mediumUrl ) {
        RNFS.readFile( defaultPhoto.mediumUrl, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setState( { userPhoto: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => {
          this.setState( { userPhoto: defaultPhoto.mediumUrl } );
        } );
      } else {
        this.setState( { userPhoto: null } );
      }
    }
  }

  setSeenTaxa( seenTaxa ) {
    const { taxon } = seenTaxa;

    this.setState( {
      commonName: taxon.preferredCommonName,
      scientificName: taxon.name,
      iconicTaxonId: taxon.iconicTaxonId
    } );
  }

  setUserLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      this.reverseGeocodeLocation( latitude, longitude );
      this.setRegion( latitude, longitude );
    } ).catch( () => this.setError( "location" ) );
  }

  fetchUserLocation() {
    if ( Platform.OS === "android" ) {
      checkLocationPermissions().then( ( granted ) => {
        if ( granted ) {
          this.setUserLocation();
        }
      } );
    } else {
      this.setUserLocation();
    }
  }

  async fetchSpeciesId() {
    const id = await getSpeciesId();
    this.setSpeciesId( id );
  }

  async fetchRoute() {
    const route = await getRoute();
    this.setState( { route } );
  }

  reverseGeocodeLocation( lat, lng ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      this.setLocation( location );
    } ).catch( () => this.setLocation( null ) );
  }

  updateScreen() {
    this.fetchiNatData();
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
      region: {},
      observationsByMonth: [],
      nearbySpeciesCount: null,
      error: null,
      userPhoto: null,
      stats: {},
      similarSpecies: [],
      ancestors: [],
      loadingSpecies: true,
      route: null,
      iconicTaxonId: null
    } );
  }

  checkForLastSeenLocation( seenTaxa ) {
    const { latitude, longitude } = seenTaxa;

    if ( latitude && longitude ) {
      this.reverseGeocodeLocation( latitude, longitude );
      this.setRegion( latitude, longitude );
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
          this.setSeenTaxa( seenTaxa );
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
        iconicTaxonId: taxa.iconic_taxon_id,
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
      if ( taxon && taxon !== undefined ) {
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
      error,
      userPhoto,
      location,
      similarSpecies,
      ancestors,
      stats,
      loadingSpecies,
      route,
      iconicTaxonId
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
          <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
            {Platform.OS === "ios" && <Spacer />}
            <SpeciesPhotos
              navigation={navigation}
              photos={photos}
              userPhoto={userPhoto}
              route={route}
            />
            <View style={styles.greenBanner}>
              {iconicTaxonId ? (
                <Text style={styles.iconicTaxaText}>
                  {i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase()}
                </Text>
              ) : null}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.commonNameText}>{commonName}</Text>
              <Text style={styles.scientificNameText}>{scientificName}</Text>
            </View>
            {error === "internet" ? (
              <SpeciesError
                seenDate={seenDate}
                updateScreen={this.updateScreen}
              />
            ) : null}
            <View style={styles.secondTextContainer}>
              {showGreenButtons.includes( true ) && !error ? <SpeciesStats stats={stats} /> : null}
              {seenDate && !error ? (
                <View style={[
                  styles.row,
                  showGreenButtons.includes( true ) && { marginTop: 21 }
                ]}
                >
                  <Image source={icons.checklist} style={styles.checkmark} />
                  <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
                </View>
              ) : null}
              {about && error !== "internet" ? (
                <View>
                  <Text style={[styles.headerText, showGreenButtons.includes( true ) && { marginTop: 38 }]}>{i18n.t( "species_detail.about" ).toLocaleUpperCase()}</Text>
                  <Text style={styles.text}>{about}</Text>
                </View>
              ) : null}
              {id !== 43584 ? (
                <View>
                  {!error ? (
                    <SpeciesMap
                      navigation={navigation}
                      region={region}
                      id={id}
                      error={error}
                      seenDate={seenDate}
                    />
                  ) : null}
                  <SpeciesTaxonomy ancestors={ancestors} />
                  {!error ? (
                    <INatObs
                      location={location}
                      nearbySpeciesCount={nearbySpeciesCount}
                      timesSeen={timesSeen}
                      navigation={navigation}
                    />
                  ) : null}
                  {observationsByMonth.length > 0 && error !== "internet"
                    ? <SpeciesChart data={observationsByMonth} />
                    : null}
                </View>
              ) : null}
              {id === 43584 ? (
                <View>
                  <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
                  <Padding />
                </View>
              ) : null}
            </View>
            {id !== 43584 && error !== "internet" ? (
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
