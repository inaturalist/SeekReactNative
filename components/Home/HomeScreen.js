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
import * as RNLocalize from "react-native-localize";

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
  checkForInternet
} from "../../utility/helpers";
import { fetchTruncatedUserLocation, fetchLocationName } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import taxonIds from "../../utility/taxonDict";
import Spacer from "../UIComponents/iOSSpacer";
import SafeAreaView from "../UIComponents/SafeAreaView";
import createUserAgent from "../../utility/userAgent";
import RNModal from "../UIComponents/Modal";

type Props = {}

type State = {
  latitude: ?number,
  longitude: ?number,
  location: ?string,
  taxa: Array<Object>,
  taxaType: string,
  loading: boolean,
  modalVisible: boolean,
  error: ?string,
  showModal: boolean
}

class HomeScreen extends Component<Props, State> {
  scrollView: ?any

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
      showModal: false
    };

    ( this:any ).updateTaxaType = this.updateTaxaType.bind( this );
    ( this:any ).updateLocation = this.updateLocation.bind( this );
    ( this:any ).toggleLocationPicker = this.toggleLocationPicker.bind( this );
    ( this:any ).closeModal = this.closeModal.bind( this );
    ( this:any ).requestAndroidPermissions = this.requestAndroidPermissions.bind( this );
  }

  setLoading( newLoadingStatus: boolean ) {
    const { loading } = this.state;
    if ( loading !== newLoadingStatus ) {
      this.setState( { loading: newLoadingStatus } );
    }
  }

  setLocation( location: string, latitude: number, longitude: number ) {
    this.setState( {
      location,
      latitude,
      longitude
    }, () => this.setParamsForSpeciesNearby() );
  }

  setTaxa( taxa: Array<Object> ) {
    this.setState( {
      taxa,
      loading: false
    } );
  }

  setError( newError: ?string ) {
    const { error } = this.state;

    if ( error !== newError ) {
      // this ensures the loading wheel stays in place when its needed
      this.setState( {
        error: newError,
        loading: false
      } );
    } else {
      this.setLoading( false );
    }
  }

  getGeolocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      if ( latitude && longitude ) {
        this.reverseGeocodeLocation( latitude, longitude );
      }
    } ).catch( ( errorCode ) => {
      if ( errorCode === 1 ) {
        this.setError( "location" );
      } else if ( errorCode === 2 ) {
        this.setError( "no_gps" );
      } else {
        this.setError( "location_timeout" );
      }
    } );
  }

  setParamsForSpeciesNearby() {
    const { taxaType, latitude, longitude } = this.state;

    const params = {
      per_page: 20,
      lat: latitude,
      lng: longitude,
      observed_on: new Date(),
      seek_exceptions: true,
      locale: i18n.locale
    };

    if ( taxonIds[taxaType] ) {
      // $FlowFixMe
      params.taxon_id = taxonIds[taxaType];
    }

    this.fetchSpeciesNearby( params );
  }

  resetErrorAndLoading() {
    this.setState( {
      error: null,
      loading: true
    } );
  }

  requestAndroidPermissions() {
    this.resetErrorAndLoading();

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

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  async checkForFirstLaunch() {
    const isFirstLaunch = await checkIfCardShown();
    if ( isFirstLaunch ) {
      this.openModal();
    }
  }

  updateTaxaType( taxaType: string ) {
    this.setState( {
      taxaType,
      loading: true
    }, () => this.setParamsForSpeciesNearby() );
  }

  reverseGeocodeLocation( lat: number, lng: number ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      this.setLocation( location, lat, lng );
    } ).catch( () => {
      this.checkInternetConnection();
    } );
  }

  checkInternetConnection() {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        this.setError( "internet" );
      }
    } ).catch( () => this.setError( null ) );
  }

  fetchSpeciesNearby( params: Object ) {
    const site = "https://api.inaturalist.org/v1/taxa/nearby";
    const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );

    const options = { headers: { "User-Agent": createUserAgent() } };

    fetch( `${site}?${queryString}`, options )
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
      this.setState( { modalVisible: !modalVisible } );
    }
  }

  updateLocation( latitude: number, longitude: number ) {
    this.setLoading( true );
    this.reverseGeocodeLocation( latitude, longitude );
    this.toggleLocationPicker();
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
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
      showModal
    } = this.state;

    console.log( RNLocalize.getLocales(), "get locales" );

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <NavigationEvents
          onWillBlur={() => this.scrollToTop()}
          onWillFocus={() => {
            this.checkForFirstLaunch();
            this.requestAndroidPermissions();
          }}
        />
        <RNModal
          showModal={showModal}
          closeModal={this.closeModal}
          modal={<GetStarted closeModal={this.closeModal} />}
        />
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
            requestAndroidPermissions={this.requestAndroidPermissions}
            taxa={taxa}
          />
          <View style={styles.greenMargin} />
          <ChallengeCard />
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
