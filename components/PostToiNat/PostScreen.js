// @flow

import React, { Component } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Geocoder from "react-native-geocoder";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import inatjs, { FileUpload } from "inaturalistjs";
import { version } from "../../package.json";

import styles from "../../styles/posting/postToiNat";
import { fetchAccessToken } from "../../utility/loginHelpers";
import GreenHeader from "../GreenHeader";
import i18n from "../../i18n";
import posting from "../../assets/posting";
import LocationPicker from "./LocationPicker";
import GeoprivacyPicker from "./GeoprivacyPicker";
import CaptivePicker from "./CaptivePicker";
import PostStatus from "./PostStatus";

type Props = {
  navigation: any
};

class PostScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      taxaName,
      taxaId,
      image,
      userImage,
      scientificName,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      latitude,
      longitude,
      location: null,
      date: moment().format( "YYYY-MM-DD" ),
      captive: "no",
      geoprivacy: "yes",
      taxon: {
        preferredCommonName: taxaName || i18n.t( "posting.unknown" ),
        name: scientificName,
        taxaId,
        image,
        userImage
      },
      modalVisible: false,
      isDateTimePickerVisible: false,
      error: null,
      showPostModal: false,
      loading: false,
      postingSuccess: null
    };

    this.updateGeoprivacy = this.updateGeoprivacy.bind( this );
    this.updateCaptive = this.updateCaptive.bind( this );
    this.updateLocation = this.updateLocation.bind( this );
    this.toggleLocationPicker = this.toggleLocationPicker.bind( this );
    this.togglePostModal = this.togglePostModal.bind( this );
  }

  getLocation() {
    const { latitude, longitude } = this.state;
    const truncated = this.checkForTruncatedCoordinates( latitude );

    if ( latitude && longitude && !truncated ) {
      this.reverseGeocodeLocation( latitude, longitude );
    } else {
      navigator.geolocation.getCurrentPosition( ( { coords } ) => {
        const lat = coords.latitude;
        const long = coords.longitude;
        this.reverseGeocodeLocation( lat, long );
        this.setLatitude( lat );
        this.setLongitude( long );
      } ).catch( () => {
        // this.setError();
      } );
    }
  }

  checkForTruncatedCoordinates( latitude ) {
    if ( latitude ) {
      const string = latitude.toString();
      const split = string.split( "." );

      if ( split[1].length === 2 ) {
        return true;
      }
    }
    return false;
  }


  async getToken() {
    this.setLoading( true );
    const token = await fetchAccessToken();
    if ( token ) {
      this.fetchJSONWebToken( token );
    }
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setLatitude( latitude ) {
    this.setState( { latitude } );
  }

  setLongitude( longitude ) {
    this.setState( { longitude } );
  }

  setLocationUndefined() {
    this.setState( { location: i18n.t( "location_picker.undefined" ) } );
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  showDateTimePicker = () => {
    this.setState( { isDateTimePickerVisible: true } );
  };

  hideDateTimePicker = () => {
    this.setState( { isDateTimePickerVisible: false } );
  };

  handleDatePicked = ( date ) => {
    if ( date ) {
      this.setState( {
        date: date.toString()
      }, this.hideDateTimePicker() );
    }
  };

  togglePostModal() {
    const { showPostModal } = this.state;
    this.setState( { showPostModal: !showPostModal } );
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
    this.setState( {
      latitude,
      longitude,
      location
    }, () => this.toggleLocationPicker() );
  }

  updateGeoprivacy( geoprivacy ) {
    this.setState( { geoprivacy } );
  }

  updateCaptive( captive ) {
    this.setState( { captive } );
  }

  reverseGeocodeLocation( lat, lng ) {
    Geocoder.geocodePosition( { lat, lng } ).then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      this.setLocation( locality || subAdminArea );
    } ).catch( () => {
      console.log( "couldn't geocode location" );
    } );
  }

  setPostSucceeded() {
    this.setState( {
      postingSuccess: true,
      loading: false
    } );
  }

  setPostFailed() {
    this.setState( {
      postingSuccess: false,
      loading: false
    } );
  }

  fetchJSONWebToken( token ) {
    const headers = {
      "Content-Type": "application/json"
    };

    const site = "https://www.inaturalist.org";

    if ( token ) {
      headers.Authorization = `Bearer ${token}`;
    }

    fetch( `${site}/users/api_token`, { headers } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const { api_token } = responseJson;
        this.createObservation( api_token );
      } ).catch( () => {
        this.setPostFailed();
      } );
  }

  createObservation( token ) {
    const {
      geoprivacy,
      captive,
      location,
      date,
      taxon,
      latitude,
      longitude
    } = this.state;

    const params = {
      observation: {
        observed_on_string: date,
        taxon_id: taxon.taxaId,
        geoprivacy: geoprivacy.toLowerCase(),
        captive: captive.toLowerCase(),
        place_guess: location,
        latitude, // use the non-truncated version
        longitude, // use the non-truncated version
        owners_identification_from_vision_requested: true // this shows that the id is recommended by computer vision
      }
    };

    const options = { api_token: token, user_agent: `Seek/${version}` };

    inatjs.observations.create( params, options ).then( ( response ) => {
      const { id } = response[0];
      this.addPhotoToObservation( id, token ); // get the obs id, then add photo
    } ).catch( () => {
      this.setPostFailed();
    } );
  }

  addPhotoToObservation( obsId, token ) {
    const {
      taxon,
      latitude,
      longitude,
      date
    } = this.state;
    const { image } = taxon;

    const options = { api_token: token, user_agent: "Seek" };

    const params = {
      "observation_photo[observation_id]": obsId,
      file: new FileUpload( {
        uri: image,
        name: "photo.jpeg",
        type: "image/jpeg"
      } ),
      observed_on: date,
      latitude,
      longitude
    };

    inatjs.observation_photos.create( params, options ).then( ( response ) => {
      this.setPostSucceeded();
    } ).catch( () => {
      this.setPostFailed();
    } );
  }

  render() {
    const { navigation } = this.props;
    const {
      taxon,
      date,
      location,
      latitude,
      longitude,
      modalVisible,
      isDateTimePickerVisible,
      showPostModal,
      loading,
      postingSuccess
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode="datetime"
            maximumDate={new Date()}
            hideTitleContainerIOS
            datePickerModeAndroid="spinner"
            timePickerModeAndroid="spinner"
          />
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
          <Modal
            visible={showPostModal}
            onRequestClose={() => this.togglePostModal()}
          >
            <PostStatus
              togglePostModal={this.togglePostModal}
              loading={loading}
              postingSuccess={postingSuccess}
            />
          </Modal>
          <NavigationEvents
            onWillFocus={() => this.getLocation()}
          />
          <GreenHeader
            navigation={navigation}
            header={i18n.t( "posting.header" )}
          />
          <View style={styles.textContainer}>
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: taxon.userImage }} />
              <View style={styles.speciesNameContainer}>
                <Text style={styles.commonNameText}>
                  {taxon.preferredCommonName ? taxon.preferredCommonName : taxon.name}
                </Text>
                {taxon.name ? <Text style={styles.text}>{taxon.name}</Text> : null}
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.thinCard}
            onPress={() => this.showDateTimePicker()}
          >
            <Image style={styles.icon} source={posting.date} />
            <View style={styles.row}>
              <Text style={styles.greenText}>
                {i18n.t( "posting.date" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.text}>
                {date}
              </Text>
            </View>
            <Image style={styles.buttonIcon} source={posting.expand} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.thinCard}
            onPress={() => this.toggleLocationPicker()}
          >
            <Image style={[styles.icon, { marginHorizontal: 5 }]} source={posting.location} />
            <View style={styles.row}>
              <Text style={styles.greenText}>
                {i18n.t( "posting.location" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.text}>
                {location}
              </Text>
            </View>
            <Image style={styles.buttonIcon} source={posting.expand} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <GeoprivacyPicker updateGeoprivacy={this.updateGeoprivacy} />
          <View style={styles.divider} />
          <CaptivePicker updateCaptive={this.updateCaptive} />
          <View style={styles.divider} />
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => {
                this.getToken();
                this.togglePostModal();
              }}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "posting.header" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default PostScreen;
