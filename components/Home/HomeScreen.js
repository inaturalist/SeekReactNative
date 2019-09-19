// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Platform,
  Modal,
  SafeAreaView,
  StatusBar
} from "react-native";
import inatjs from "inaturalistjs";
import { NavigationEvents } from "react-navigation";
import RNModal from "react-native-modal";

import i18n from "../../i18n";
import styles from "../../styles/home/home";
import LocationPicker from "./LocationPicker";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import ChallengeCard from "./ChallengeCard";
import Padding from "../Padding";
import CardPadding from "./CardPadding";
import { checkIfCardShown, addARCameraFiles, checkForInternet } from "../../utility/helpers";
import { fetchTruncatedUserLocation, fetchLocationName, checkLocationPermissions } from "../../utility/locationHelpers";
import { getPreviousAndNextMonth } from "../../utility/dateHelpers";
import taxonIds from "../../utility/taxonDict";
import Spacer from "../iOSSpacer";

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
      loading: true,
      modalVisible: false,
      error: null,
      showGetStartedModal: false
    };

    this.updateTaxaType = this.updateTaxaType.bind( this );
    this.updateLocation = this.updateLocation.bind( this );
    this.toggleLocationPicker = this.toggleLocationPicker.bind( this );
    this.toggleGetStartedModal = this.toggleGetStartedModal.bind( this );
    this.requestAndroidPermissions = this.requestAndroidPermissions.bind( this );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  setTaxa( taxa ) {
    this.setState( { taxa }, () => this.setLoading( false ) );
  }

  setError( newError ) {
    const { error } = this.state;

    if ( error !== newError ) {
      // this ensures the loading wheel stays in place when its needed
      this.setState( { error: newError }, () => this.setLoading( false ) );
    }
  }

  getGeolocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      if ( latitude && longitude ) {
        this.reverseGeocodeLocation( latitude, longitude );
        this.setError( null );

        this.setState( {
          latitude,
          longitude
        }, () => this.setParamsForSpeciesNearby( latitude, longitude ) );
      }
    } ).catch( ( errorCode ) => {
      if ( errorCode === 1 ) {
        this.setError( "location" );
      } else if ( errorCode === 2 ) {
        this.setError( "no_gps" );
        this.setLoading( false );
      } else {
        this.setError( "location_timeout" );
        this.setLoading( false );
      }
    } );
  }

  setParamsForSpeciesNearby( lat, lng ) {
    const { taxaType } = this.state;
    this.setLoading( true );
    this.checkInternetConnection();

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

  requestAndroidPermissions() {
    if ( Platform.OS === "android" ) {
      checkLocationPermissions().then( ( granted ) => {
        if ( granted ) {
          this.getGeolocation();
        } else {
          this.setError( "location" );
        }
      } );
    } else {
      this.getGeolocation();
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
                this.requestAndroidPermissions();
                addARCameraFiles();
              }}
              onWillBlur={() => this.setLoading( true )}
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
              {Platform.OS === "ios" && <Spacer />}
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
                updateTaxaType={this.updateTaxaType}
                toggleLocationPicker={this.toggleLocationPicker}
                error={error}
                requestAndroidPermissions={this.requestAndroidPermissions}
              />
              <CardPadding />
              <ChallengeCard navigation={navigation} />
              <Padding />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default HomeScreen;
