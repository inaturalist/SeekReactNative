// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Modal,
  SafeAreaView,
  StatusBar
} from "react-native";
import Realm from "realm";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "react-navigation";
import Permissions from "react-native-permissions";
import RNModal from "react-native-modal";

import i18n from "../../i18n";
import styles from "../../styles/home/home";
import LocationPicker from "./LocationPicker";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import Challenges from "./Challenges";
import NoChallenges from "./NoChallenges";
import Padding from "../Padding";
import CardPadding from "./CardPadding";
import { checkIfCardShown, addARCameraFiles, checkForInternet } from "../../utility/helpers";
import { fetchTruncatedUserLocation, fetchLocationName } from "../../utility/locationHelpers";
import { getPreviousAndNextMonth } from "../../utility/dateHelpers";
import taxonIds from "../../utility/taxonDict";
import realmConfig from "../../models/index";

type Props = {
  navigation: any
}

class HomeScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      location: null,
      taxa: [],
      taxaType: "all",
      loading: false,
      modalVisible: false,
      error: null,
      challenge: null,
      showGetStartedModal: false
    };

    this.updateTaxaType = this.updateTaxaType.bind( this );
    this.updateLocation = this.updateLocation.bind( this );
    this.toggleLocationPicker = this.toggleLocationPicker.bind( this );
    this.toggleGetStartedModal = this.toggleGetStartedModal.bind( this );
    this.setParamsForSpeciesNearby = this.setParamsForSpeciesNearby.bind( this );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  setTaxa( taxa ) {
    this.setState( { taxa } );
    this.setLoading( false );
  }

  setError( error ) {
    this.setState( { error } );

    if ( error === "location" ) {
      this.setLocation( i18n.t( "species_nearby.no_location" ) );
    }
  }

  setChallenge( challenge ) {
    this.setState( { challenge } );
  }

  getGeolocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      this.reverseGeocodeLocation( latitude, longitude );

      this.setState( {
        latitude,
        longitude
      }, () => this.setParamsForSpeciesNearby( latitude, longitude ) );
    } ).catch( () => {
      this.setError( "location" );
    } );
  }

  setParamsForSpeciesNearby( lat, lng ) {
    const { taxaType } = this.state;
    this.setLoading( true );
    this.checkInternetConnection();
    if ( !lat || !lng ) {
      this.fetchUserLocation();
    }

    const params = {
      verifiable: true,
      photos: true,
      per_page: 20,
      lat,
      lng,
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank: "species",
      include_only_vision_taxa: true,
      not_in_list_id: 945029,
      month: getPreviousAndNextMonth(),
      locale: i18n.currentLocale()
    };

    if ( taxonIds[taxaType] ) {
      params.taxon_id = taxonIds[taxaType];
    }

    this.fetchSpeciesNearby( params );
  }

  requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.getGeolocation();
      } else {
        this.setError( "location" );
      }
    } catch ( err ) {
      this.checkInternetConnection();
    }
  }

  toggleGetStartedModal() {
    const { showGetStartedModal } = this.state;
    this.setState( { showGetStartedModal: !showGetStartedModal } );
  }

  async checkForFirstLaunch() {
    const isFirstLaunch = await checkIfCardShown();
    if ( isFirstLaunch ) {
      this.toggleGetStartedModal();
    }
  }

  updateTaxaType( taxaType ) {
    const { latitude, longitude } = this.state;

    this.setLoading( true );
    this.setState( {
      taxaType
    }, () => this.setParamsForSpeciesNearby( latitude, longitude ) );
  }

  fetchUserLocation() {
    const { latitude, longitude } = this.state;

    if ( !latitude && !longitude ) {
      if ( Platform.OS === "android" ) {
        this.requestAndroidPermissions();
      } else {
        this.getGeolocation();
      }
    } else {
      this.setParamsForSpeciesNearby( latitude, longitude );
    }
  }

  reverseGeocodeLocation( lat, lng ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      this.setLocation( location );
    } ).catch( () => {
      this.checkInternetConnection();
    } );
  }

  checkInternetConnection() {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        this.setError( "internet" );
        this.setLoading( false );
      } else {
        this.checkiOSPermissions();
      }
    } );
  }

  checkiOSPermissions() {
    Permissions.check( "location" ).then( ( response ) => {
      if ( response !== "authorized" ) {
        this.setError( "location" );
      } else {
        this.setError( null );
      }
    } ).catch( () => this.setError( null ) );
  }

  fetchSpeciesNearby( params ) {
    inatjs.observations.speciesCounts( params ).then( ( response ) => {
      const taxa = response.results.map( r => r.taxon );
      this.setTaxa( taxa );
    } ).catch( () => {
      this.checkInternetConnection();
    } );
  }

  fetchLatestChallenge() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100" );
        if ( incompleteChallenges.length > 0 ) {
          const latestChallenge = incompleteChallenges.sorted( "availableDate", true );
          this.setChallenge( latestChallenge[0] );
        } else {
          this.setChallenge( null );
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  toggleLocationPicker() {
    const { modalVisible, error } = this.state;

    if ( !error ) {
      this.setState( {
        modalVisible: !modalVisible
      } );
    }
  }

  updateLocation( latitude, longitude, location ) {
    this.setLoading( true );
    this.setState( {
      latitude,
      longitude,
      location
    }, () => {
      this.toggleLocationPicker();
      this.setParamsForSpeciesNearby( latitude, longitude );
    } );
  }

  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
  }

  render() {
    const {
      location,
      latitude,
      longitude,
      loading,
      taxa,
      modalVisible,
      error,
      challenge,
      showGetStartedModal
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <View style={styles.container}>
            <NavigationEvents
              onWillFocus={() => {
                this.scrollToTop();
                this.checkForFirstLaunch();
                this.fetchUserLocation();
                this.fetchLatestChallenge();
                addARCameraFiles();
              }}
            />
            <RNModal
              isVisible={showGetStartedModal}
              onBackdropPress={() => this.toggleGetStartedModal()}
            >
              <GetStarted
                toggleGetStartedModal={this.toggleGetStartedModal}
              />
            </RNModal>
            <ScrollView
              ref={( ref ) => { this.scrollView = ref; }}
            >
              {Platform.OS === "ios" && <View style={styles.iosSpacer} />}
              <Modal
                visible={modalVisible}
                onRequestClose={() => this.toggleLocationPicker()}
              >
                <LocationPicker
                  latitude={latitude}
                  longitude={longitude}
                  location={location}
                  updateLocation={this.updateLocation}
                  toggleLocationPicker={this.toggleLocationPicker}
                />
              </Modal>
              <SpeciesNearby
                taxa={taxa}
                loading={loading}
                navigation={navigation}
                location={location}
                latitude={latitude}
                longitude={longitude}
                updateTaxaType={this.updateTaxaType}
                toggleLocationPicker={this.toggleLocationPicker}
                error={error}
                setParamsForSpeciesNearby={this.setParamsForSpeciesNearby}
              />
              <CardPadding />
              { challenge
                ? <Challenges navigation={navigation} challenge={challenge} />
                : <NoChallenges navigation={navigation} />
              }
              <Padding />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default HomeScreen;
