// @flow

import React, { Component } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  TextInput,
  Keyboard,
  ScrollView
} from "react-native";
import { NavigationEvents } from "@react-navigation/compat";
import inatjs, { FileUpload } from "inaturalistjs";
import { formatISO, isAfter } from "date-fns";

import { colors } from "../../styles/global";
import styles from "../../styles/posting/postToiNat";
import { fetchAccessToken, savePostingSuccess } from "../../utility/loginHelpers";
import {
  fetchUserLocation,
  fetchLocationName,
  checkForTruncatedCoordinates
} from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import { resizeImage } from "../../utility/photoHelpers";
import GreenHeader from "../UIComponents/GreenHeader";
import i18n from "../../i18n";
import posting from "../../assets/posting";
import icons from "../../assets/icons";
import LocationPicker from "./LocationPicker";
import GeoprivacyPicker from "./GeoprivacyPicker";
import CaptivePicker from "./CaptivePicker";
import PostStatus from "./PostStatus";
import SelectSpecies from "./SelectSpecies";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";
import DateTimePicker from "../UIComponents/DateTimePicker";
import SpeciesCard from "../UIComponents/SpeciesCard";
import createUserAgent from "../../utility/userAgent";
import { formatYearMonthDay, setISOTime } from "../../utility/dateHelpers";

type Props = {
  +route: any
};

type State = {
  image: Object,
  location: ?string,
  date: ?string,
  captive: ?boolean,
  geoprivacy: ?boolean,
  taxon: Object,
  seekId: Object,
  modalVisible: boolean,
  isDateTimePickerVisible: boolean,
  error: ?boolean,
  showPostModal: boolean,
  showSpeciesModal: boolean,
  loading: boolean,
  postingSuccess: ?boolean,
  description: ?string,
  status: ?string,
  imageForUploading: ?string,
  errorText: ?string,
  accuracy: ?number
};

class PostScreen extends Component<Props, State> {
  constructor( { route }: Props ) {
    super();

    const {
      preferredCommonName,
      taxaId,
      image,
      scientificName
    } = route.params;

    const date = image.time ? setISOTime( image.time ) : null;

    this.state = {
      image,
      location: null,
      date,
      captive: null,
      geoprivacy: null,
      taxon: {
        preferredCommonName,
        name: scientificName,
        taxaId
      },
      seekId: {
        preferredCommonName,
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
      description: null,
      status: null,
      imageForUploading: null,
      errorText: null,
      accuracy: null
    };

    ( this:any ).updateGeoprivacy = this.updateGeoprivacy.bind( this );
    ( this:any ).updateCaptive = this.updateCaptive.bind( this );
    ( this:any ).updateLocation = this.updateLocation.bind( this );
    ( this:any ).toggleLocationPicker = this.toggleLocationPicker.bind( this );
    ( this:any ).togglePostModal = this.togglePostModal.bind( this );
    ( this:any ).toggleSpeciesModal = this.toggleSpeciesModal.bind( this );
    ( this:any ).updateTaxon = this.updateTaxon.bind( this );
    ( this:any ).handleDatePicked = this.handleDatePicked.bind( this );
    ( this:any ).toggleDateTimePicker = this.toggleDateTimePicker.bind( this );
  }

  setUserLocation() {
    const { image } = this.state;
    fetchUserLocation( true ).then( ( coords ) => {
      const lat = coords.latitude;
      const long = coords.longitude;
      const { accuracy } = coords;
      this.reverseGeocodeLocation( lat, long );
      image.latitude = lat;
      image.longitude = long;

      this.setState( { image } );
      this.setAccuracy( accuracy );
    } ).catch( ( err ) => {
      console.log( err );
      if ( err ) {
        fetchUserLocation( false ).then( ( coords ) => {
          const lat = coords.latitude;
          const long = coords.longitude;
          const { accuracy } = coords;
          this.reverseGeocodeLocation( lat, long );
          image.latitude = lat;
          image.longitude = long;

          this.setState( { image } );
          this.setAccuracy( accuracy );
        } );
      }
    } );
  }

  getLocation() {
    const { image } = this.state;
    const truncated = checkForTruncatedCoordinates( image.latitude );

    if ( image.latitude && !truncated ) {
      this.reverseGeocodeLocation( image.latitude, image.longitude );
    } else if ( truncated ) {
      this.setUserLocation();
    } else {
      this.setLocationUndefined();
    }
  }

  async getToken() {
    this.setLoading( true );
    const token = await fetchAccessToken();
    if ( token ) {
      this.fetchJSONWebToken( token );
    }
  }

  setLoading( loading: boolean ) {
    this.setState( { loading } );
  }

  setAccuracy( accuracy: number ) {
    this.setState( { accuracy } );
  }

  setLocationUndefined() {
    this.setState( { location: i18n.t( "location_picker.undefined" ) } );
  }

  setLocation( location: string ) {
    this.setState( { location } );
  }

  setPostSucceeded() {
    savePostingSuccess( true );

    this.setState( {
      postingSuccess: true,
      loading: false
    } );
  }

  setPostFailed( errorText: string, status: string ) {
    savePostingSuccess( false );

    this.setState( {
      postingSuccess: false,
      loading: false,
      errorText,
      status
    } );
  }

  setImageForUploading( imageForUploading: string ) {
    this.setState( { imageForUploading } );
  }

  toggleDateTimePicker = () => {
    const { isDateTimePickerVisible } = this.state;
    this.setState( { isDateTimePickerVisible: !isDateTimePickerVisible } );
  };

  isAndroidDateInFuture = ( date: Date ) => {
    if ( Platform.OS === "android" && isAfter( date, new Date() ) ) {
      return true;
    }
    return false;
  }

  handleDatePicked = ( date: Date ) => {
    if ( date ) {
      console.log( date, "date picked" );
      let newDate;
      const isFuture = this.isAndroidDateInFuture( date );

      if ( isFuture ) {
        console.log( isFuture, "is future android" );
        newDate = formatISO( new Date() );
      } else {
        newDate = formatISO( date );
      }

      console.log( newDate, "new date" );

      this.setState( {
        date: newDate.toString()
      }, this.toggleDateTimePicker() );
    }
  };

  resizeImageForUploading() {
    const { image } = this.state;

    resizeImage( image.uri, 2048 ).then( ( userImage ) => {
      if ( userImage ) {
        this.setImageForUploading( userImage );
      } else {
        console.log( "couldn't resize image for uploading" );
      }
    } ).catch( () => console.log( "couldn't resize image for uploading" ) );
  }

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

  updateLocation( latitude: number, longitude: number, accuracy: number ) {
    const { image } = this.state;
    this.reverseGeocodeLocation( latitude, longitude );

    image.latitude = latitude;
    image.longitude = longitude;

    this.setState( { image } );
    this.setAccuracy( accuracy );
    this.toggleLocationPicker();
  }

  updateGeoprivacy( geoprivacy: boolean ) {
    this.setState( { geoprivacy } );
  }

  updateCaptive( captive: boolean ) {
    this.setState( { captive } );
  }

  reverseGeocodeLocation( lat: number, lng: number ) {
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

  fetchJSONWebToken( token: string ) {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent()
    };

    const site = "https://www.inaturalist.org";

    if ( token ) {
      // $FlowFixMe
      headers.Authorization = `Bearer ${token}`;
    }

    fetch( `${site}/users/api_token`, { headers } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const apiToken = responseJson.api_token;
        this.createObservation( apiToken );
      } ).catch( ( e ) => {
        if ( e instanceof SyntaxError ) { // this is from the iNat server being down
          this.setPostFailed( "", "beforeObservation" ); // HTML not parsed correctly, so skip showing error text
        } else {
          this.setPostFailed( e, "beforeObservation" );
        }
      } );
  }

  createObservation( token: string ) {
    const {
      geoprivacy,
      captive,
      location,
      date,
      taxon,
      image,
      description,
      accuracy
    } = this.state;

    const { latitude, longitude } = image;

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
        positional_accuracy: accuracy,
        owners_identification_from_vision_requested: true,
        // this shows that the id is recommended by computer vision
        description
      }
    };

    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.observations.create( params, options ).then( ( response ) => {
      const { id } = response[0];
      this.addPhotoToObservation( id, token ); // get the obs id, then add photo
    } ).catch( ( e ) => {
      this.setPostFailed( e, "beforePhotoAdded" );
    } );
  }

  addPhotoToObservation( obsId: number, token: string ) {
    const { imageForUploading } = this.state;

    const params = {
      "observation_photo[observation_id]": obsId,
      file: new FileUpload( {
        uri: imageForUploading,
        name: "photo.jpeg",
        type: "image/jpeg"
      } )
    };

    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.observation_photos.create( params, options ).then( () => {
      this.setPostSucceeded();
    } ).catch( ( e ) => {
      this.setPostFailed( e, "duringPhotoUpload" );
    } );
  }

  updateTaxon( taxaId: number, preferredCommonName: string, name: string ) {
    this.setState( {
      taxon: {
        taxaId,
        preferredCommonName,
        name
      }
    } );
  }

  render() {
    const {
      taxon,
      seekId,
      date,
      location,
      image,
      modalVisible,
      isDateTimePickerVisible,
      showPostModal,
      showSpeciesModal,
      loading,
      postingSuccess,
      description,
      status,
      errorText
    } = this.state;

    const dateToDisplay = date && formatYearMonthDay( date );

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.getLocation();
            this.resizeImageForUploading();
          }}
        />
        <SafeAreaView />
        <DateTimePicker
          datetime
          isDateTimePickerVisible={isDateTimePickerVisible}
          onDatePicked={this.handleDatePicked}
          toggleDateTimePicker={this.toggleDateTimePicker}
        />
        <Modal
          onRequestClose={() => this.toggleSpeciesModal()}
          visible={showSpeciesModal}
        >
          <SelectSpecies
            image={image.uri}
            seekId={seekId}
            toggleSpeciesModal={this.toggleSpeciesModal}
            updateTaxon={this.updateTaxon}
          />
        </Modal>
        <Modal
          onRequestClose={() => this.toggleLocationPicker()}
          visible={modalVisible}
        >
          <LocationPicker
            latitude={image.latitude}
            longitude={image.longitude}
            toggleLocationPicker={this.toggleLocationPicker}
            updateLocation={this.updateLocation}
          />
        </Modal>
        <Modal
          onRequestClose={() => this.togglePostModal()}
          visible={showPostModal}
        >
          <PostStatus
            errorText={errorText}
            loading={loading}
            postingSuccess={postingSuccess}
            status={status}
            togglePostModal={this.togglePostModal}
          />
        </Modal>
        <GreenHeader header="posting.header" />
        <ScrollView
          keyboardDismissMode="on-drag"
          onScroll={() => Keyboard.dismiss()}
          scrollEventThrottle={1}
        >
          <TouchableOpacity
            onPress={() => this.toggleSpeciesModal()}
            style={styles.card}
          >
            <SpeciesCard
              commonName={taxon.preferredCommonName}
              handlePress={() => this.toggleSpeciesModal()}
              photo={{ uri: image.uri }}
              scientificName={taxon.name}
            />
            <Image
              source={icons.backButton}
              tintColor={colors.seekForestGreen}
              style={[styles.buttonIcon, styles.rotate]}
            />
          </TouchableOpacity>
          <TextInput
            keyboardType="default"
            multiline
            onChangeText={value => this.setState( { description: value } )}
            placeholder={i18n.t( "posting.notes" )}
            placeholderTextColor="#828282"
            style={styles.inputField}
            value={description}
          />
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => this.toggleDateTimePicker()}
            style={styles.thinCard}
          >
            <Image source={posting.date} style={styles.icon} />
            <View style={styles.row}>
              <Text style={styles.greenText}>
                {i18n.t( "posting.date" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.text}>{dateToDisplay}</Text>
            </View>
            <Image
              source={icons.backButton}
              tintColor={colors.seekForestGreen}
              style={[styles.buttonIcon, styles.rotate]}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => this.toggleLocationPicker()}
            style={styles.thinCard}
          >
            <Image source={posting.location} style={[styles.icon, styles.extraMargin]} />
            <View style={styles.row}>
              <Text style={styles.greenText}>
                {i18n.t( "posting.location" ).toLocaleUpperCase()}
              </Text>
              <Text style={styles.text}>
                {location}
              </Text>
            </View>
            <Image
              source={icons.backButton}
              tintColor={colors.seekForestGreen}
              style={[styles.buttonIcon, styles.rotate]}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <GeoprivacyPicker updateGeoprivacy={this.updateGeoprivacy} />
          <View style={styles.divider} />
          <CaptivePicker updateCaptive={this.updateCaptive} />
          <View style={styles.divider} />
          <View style={styles.textContainer}>
            <GreenButton
              handlePress={() => {
                this.getToken();
                this.togglePostModal();
              }}
              text="posting.header"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PostScreen;
