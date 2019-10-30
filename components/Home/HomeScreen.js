// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Platform,
  Modal,
  StatusBar
} from "react-native";
import { NavigationEvents } from "react-navigation";
import RNModal from "react-native-modal";

import i18n from "../../i18n";
import styles from "../../styles/home/home";
import LocationPicker from "./LocationPicker";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "./GetStarted";
import ChallengeCard from "./ChallengeCard";
import Padding from "../UIComponents/Padding";
import Header from "./Header";
import {
  checkIfCardShown,
  addARCameraFiles,
  checkForInternet,
  getTaxonCommonName
} from "../../utility/helpers";
import { fetchTruncatedUserLocation, fetchLocationName, checkLocationPermissions } from "../../utility/locationHelpers";
import taxonIds from "../../utility/taxonDict";
import Spacer from "../UIComponents/iOSSpacer";
import SafeAreaView from "../UIComponents/SafeAreaView";

type Props = {
  +navigation: any
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
        this.setLoading( false );
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
      per_page: 20,
      lat,
      lng,
      observed_on: new Date(),
      seek_exceptions: true,
      locale: i18n.locale
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
          this.setLoading( false );
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
    const site = "https://api.inaturalist.org/v1/taxa/nearby";
    const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );

    fetch( `${site}?${queryString}` )
      .then( response => response.json() )
      .then( ( { results } ) => {
        const taxa = results.map( r => r.taxon );
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

  updateLocation( latitude, longitude ) {
    this.setLoading( true );
    this.reverseGeocodeLocation( latitude, longitude );
    this.setState( {
      latitude,
      longitude
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
        <SafeAreaView />
        <NavigationEvents
          onWillBlur={() => this.setLoading( true )}
          onWillFocus={() => {
            this.scrollToTop();
            this.checkForFirstLaunch();
            this.requestAndroidPermissions();
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
        <Modal
          onRequestClose={() => this.toggleLocationPicker()}
          visible={modalVisible}
        >
          <LocationPicker
            latitude={latitude}
            location={location}
            longitude={longitude}
            toggleLocationPicker={this.toggleLocationPicker}
            updateLocation={this.updateLocation}
          />
        </Modal>
        <ScrollView
          ref={( ref ) => { this.scrollView = ref; }}
        >
          {Platform.OS === "ios" && <Spacer />}
          <Header
            location={location}
            toggleLocationPicker={this.toggleLocationPicker}
            updateTaxaType={this.updateTaxaType}
          />
          <SpeciesNearby
            error={error}
            loading={loading}
            navigation={navigation}
            requestAndroidPermissions={this.requestAndroidPermissions}
            taxa={taxa}
          />
          <View style={styles.greenMargin} />
          <ChallengeCard navigation={navigation} />
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
