// @flow

import React, { Component } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  Platform,
  TextInput,
  Keyboard
} from "react-native";
import { NavigationEvents, ScrollView } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import inatjs, { FileUpload } from "inaturalistjs";
import { Appearance } from "react-native-appearance";

import styles from "../../styles/posting/postToiNat";
import { fetchAccessToken, savePostingSuccess } from "../../utility/loginHelpers";
import { fetchUserLocation, fetchLocationName, checkLocationPermissions } from "../../utility/locationHelpers";
import GreenHeader from "../GreenHeader";
import i18n from "../../i18n";
import posting from "../../assets/posting";
import LocationPicker from "./LocationPicker";
import GeoprivacyPicker from "./GeoprivacyPicker";
import CaptivePicker from "./CaptivePicker";
import PostStatus from "./PostStatus";
import SelectSpecies from "./SelectSpecies";

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
      longitude,
      time,
      commonAncestor
    } = navigation.state.params;

    this.state = {
      latitude,
      longitude,
      location: null,
      date: moment.unix( time ).format( "YYYY-MM-DD" ),
      captive: null,
      geoprivacy: null,
      image,
      userImage,
      taxon: {
        preferredCommonName: taxaName || commonAncestor,
        name: scientificName,
        taxaId
      },
      seekId: {
        preferredCommonName: taxaName || commonAncestor,
        name: scientificName,
        taxaId
      },
      modalVisible: false,
      isDateTimePickerVisible: false,
      error: null,
      showPostModal: false,
      showSpeciesModal: false,
      loading: false,
      postingSuccess: null,
      description: null
    };

    this.updateGeoprivacy = this.updateGeoprivacy.bind( this );
    this.updateCaptive = this.updateCaptive.bind( this );
    this.updateLocation = this.updateLocation.bind( this );
    this.toggleLocationPicker = this.toggleLocationPicker.bind( this );
    this.togglePostModal = this.togglePostModal.bind( this );
    this.toggleSpeciesModal = this.toggleSpeciesModal.bind( this );
    this.updateTaxon = this.updateTaxon.bind( this );
  }

  setUserLocation() {
    fetchUserLocation().then( ( coords ) => {
      const lat = coords.latitude;
      const long = coords.longitude;
      this.reverseGeocodeLocation( lat, long );
      this.setLatitude( lat );
      this.setLongitude( long );
    } ).catch( ( err ) => {
      console.log( err );
    } );
  }

  getLocation() {
    const { latitude, longitude } = this.state;
    const truncated = this.checkForTruncatedCoordinates( latitude );

    if ( latitude && longitude && !truncated ) {
      this.reverseGeocodeLocation( latitude, longitude );
    } else {
      this.checkPermissions();
    }
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

  setPostSucceeded() {
    savePostingSuccess( true );

    this.setState( {
      postingSuccess: true,
      loading: false
    } );
  }

  setPostFailed() {
    savePostingSuccess( false );

    this.setState( {
      postingSuccess: false,
      loading: false
    } );
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

  checkPermissions() {
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

  checkForTruncatedCoordinates( latitude ) {
    if ( latitude ) {
      const string = latitude.toString();
      const split = string.split( "." );

      if ( split[1] && split[1].length === 2 ) {
        return true;
      }
      return false;
    }
    return false;
  }

  togglePostModal() {
    const { showPostModal } = this.state;
    this.setState( { showPostModal: !showPostModal } );
  }

  toggleSpeciesModal() {
    const { showSpeciesModal } = this.state;
    this.setState( { showSpeciesModal: !showSpeciesModal } );
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
    this.reverseGeocodeLocation( latitude, longitude );

    this.setState( {
      latitude,
      longitude
    }, () => this.toggleLocationPicker() );
  }

  updateGeoprivacy( geoprivacy ) {
    this.setState( { geoprivacy } );
  }

  updateCaptive( captive ) {
    this.setState( { captive } );
  }

  reverseGeocodeLocation( lat, lng ) {
    fetchLocationName( lat, lng ).then( ( location ) => {
      if ( location ) {
        this.setLocation( location );
      } else {
        this.setLocationUndefined();
      }
    } ).catch( () => {
      this.setLocationUndefined();
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
      longitude,
      description
    } = this.state;

    let captiveState;
    let geoprivacyState;

    if ( captive === i18n.t( "posting.yes" ) ) {
      captiveState = true;
    } else {
      captiveState = false;
    }

    if ( geoprivacy === i18n.t( "posting.private" ) ) {
      geoprivacyState = "private";
    } else if ( geoprivacy === i18n.t( "posting.obscured" ) ) {
      geoprivacyState = "obscured";
    } else {
      geoprivacyState = "open";
    }

    const params = {
      observation: {
        observed_on_string: date,
        taxon_id: taxon.taxaId,
        geoprivacy: geoprivacyState,
        captive_flag: captiveState,
        place_guess: location,
        latitude, // use the non-truncated version
        longitude, // use the non-truncated version
        owners_identification_from_vision_requested: true, // this shows that the id is recommended by computer vision
        description
      }
    };

    const version = "2.1.0";

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
      image,
      latitude,
      longitude,
      date
    } = this.state;

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

  updateTaxon( taxaId, preferredCommonName, name ) {
    this.setState( {
      taxon: {
        taxaId,
        preferredCommonName,
        name
      }
    } );
  }

  render() {
    const { navigation } = this.props;
    const {
      taxon,
      seekId,
      userImage,
      date,
      location,
      latitude,
      longitude,
      modalVisible,
      isDateTimePickerVisible,
      showPostModal,
      showSpeciesModal,
      loading,
      postingSuccess,
      description
    } = this.state;
    const colorScheme = Appearance.getColorScheme();

    let commonName;

    if ( taxon.preferredCommonName ) {
      commonName = taxon.preferredCommonName;
    } else if ( taxon.name ) {
      commonName = taxon.name;
    } else {
      commonName = i18n.t( "posting.unknown" );
    }

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
            isDarkModeEnabled={colorScheme === "dark"}
          />
          <Modal
            visible={showSpeciesModal}
            onRequestClose={() => this.toggleSpeciesModal()}
          >
            <SelectSpecies
              toggleSpeciesModal={this.toggleSpeciesModal}
              image={userImage}
              commonName={seekId.preferredCommonName}
              scientificName={seekId.name}
              seekId={seekId.taxaId}
              updateTaxon={this.updateTaxon}
            />
          </Modal>
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
              navigation={navigation}
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
            route="post"
          />
          <ScrollView
            keyboardDismissMode="on-drag"
            onScroll={() => Keyboard.dismiss()}
            scrollEventThrottle={1}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => this.toggleSpeciesModal()}
            >
              <Image style={styles.image} source={{ uri: userImage }} />
              <View style={styles.speciesNameContainer}>
                <Text style={styles.commonNameText}>{commonName}</Text>
                {taxon.name ? <Text style={styles.text}>{taxon.name}</Text> : null}
              </View>
              <Image style={styles.buttonIcon} source={posting.expand} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { description: value } )}
              value={description}
              placeholder={i18n.t( "posting.notes" )}
              placeholderTextColor="#828282"
              keyboardType="default"
              multiline
            />
            <View style={{ marginBottom: 21 }} />
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
            <View style={[styles.textContainer, { alignItems: "center" }]}>
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
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default PostScreen;
