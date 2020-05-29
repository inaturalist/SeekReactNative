// @flow

import React, {
  useReducer,
  useEffect,
  useCallback,
  useContext
} from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import inatjs, { FileUpload } from "inaturalistjs";
import { formatISO, isAfter } from "date-fns";

import { colors } from "../../styles/global";
import styles from "../../styles/posting/postToiNat";
import { savePostingSuccess } from "../../utility/loginHelpers";
import {
  fetchUserLocation,
  checkForTruncatedCoordinates
} from "../../utility/locationHelpers";
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
import { useLocationName } from "../../utility/customHooks";
import { UserContext } from "../UserContext";

const PostScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { login } = useContext( UserContext );

  const {
    preferredCommonName,
    taxaId,
    scientificName
  } = params;

  const initialDate = params.image.time ? setISOTime( params.image.time ) : null;
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "UPDATE_GEOPRIVACY":
        return { ...state, geoprivacy: action.geoprivacy };
      case "UPDATE_CAPTIVE":
        return { ...state, captive: action.captive };
      case "TOGGLE_POST_STATUS":
        return { ...state, showPostingStatus: !state.showPostingStatus };
      case "SHOW_POST_STATUS":
        return { ...state, showPostingStatus: true };
      case "SHOW_LOCATION_PICKER":
        return { ...state, showLocationPicker: true };
      case "SHOW_DATETIME_PICKER":
        return { ...state, isDateTimePickerVisible: true };
      case "SHOW_SELECTED_SPECIES":
        return { ...state, showSpeciesModal: true };
      case "SELECT_SPECIES":
        return {
          ...state,
          taxon: {
            name: action.selectedSpecies.name,
            taxaId: action.selectedSpecies.id,
            preferredCommonName: action.selectedSpecies.commonName
          }
        };
      case "SET_LOCATION":
        return {
          ...state,
          image: {
            latitude: action.coords.latitude,
            longitude: action.coords.longitude,
            accuracy: action.coords.accuracy
          },
          showLocationPicker: false
        };
      case "RESIZED_IMAGE":
        return { ...state, resizedImage: action.userImage };
      case "UPDATE_DATE":
        return { ...state, date: action.date, isDateTimePickerVisible: false };
      case "LOADING":
        return { ...state, loading: true };
      case "POSTING_SUCCEEDED":
        return { ...state, postingSuccess: true, loading: false };
      case "POSTING_FAILED":
        return {
          ...state,
          postingSuccess: false,
          loading: false,
          errorText: action.errorText,
          status: action.status
        };
      default:
        throw new Error();
    }
  }, {
    image: params.image,
    date: initialDate,
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
    showLocationPicker: false,
    isDateTimePickerVisible: false,
    showPostingStatus: false,
    showSpeciesModal: false,
    loading: false,
    postingSuccess: null,
    description: null,
    status: null,
    resizedImage: null,
    errorText: null
  } );

  const {
    image,
    resizedImage,
    taxon,
    geoprivacy,
    description,
    accuracy,
    date,
    captive,
    seekId,
    showLocationPicker,
    isDateTimePickerVisible,
    showPostingStatus,
    showSpeciesModal,
    loading,
    postingSuccess,
    status,
    errorText
  } = state;

  const location = useLocationName( image.latitude, image.longitude );

  const setUserLocation = useCallback( () => {
    fetchUserLocation().then( ( coords ) => {
      dispatch( { type: "SET_LOCATION", coords } );
    } ).catch( ( err ) => console.log( err ) );
  }, [] );

  const getLocation = useCallback( () => {
    const truncated = checkForTruncatedCoordinates( image.latitude );

    if ( truncated ) {
      setUserLocation();
    } else {
      dispatch( { type: "NO_LOCATION" } );
    }
  }, [setUserLocation, image] );

  const setPostSucceeded = () => {
    savePostingSuccess( true );
    dispatch( { type: "POSTING_SUCCEEDED" } );
  };

  const setPostFailed = ( errorText, status ) => {
    savePostingSuccess( false );
    dispatch( { type: "POSTING_FAILED", errorText, status } );
  };

  const isAndroidDateInFuture = ( selectedDate ) => {
    if ( Platform.OS === "android" && isAfter( selectedDate, new Date() ) ) {
      return true;
    }
    return false;
  };

  const handleDatePicked = ( selectedDate ) => {
    if ( selectedDate ) {
      const isFuture = isAndroidDateInFuture( selectedDate );
      const newDate = isFuture ? formatISO( new Date() ) : formatISO( selectedDate );
      dispatch( { type: "UPDATE_DATE", date: newDate.toString() } );
    }
  };

  const resizeImageForUploading = useCallback( () => {
    resizeImage( image.uri, 2048 ).then( ( userImage ) => {
      if ( userImage ) {
        dispatch( { type: "RESIZED_IMAGE", userImage } );
      }
    } ).catch( () => console.log( "couldn't resize image for uploading" ) );
  }, [image] );

  const updateLocation = ( latitude, longitude, accuracy ) => {
    const coords = { latitude, longitude, accuracy };
    dispatch( { type: "SET_LOCATION", coords } );
    dispatch( { type: "CLOSE_LOCATION_PICKER" } );
  };

  const addPhotoToObservation = ( obsId, token ) => {
    const photoParams = {
      "observation_photo[observation_id]": obsId,
      file: new FileUpload( {
        uri: resizedImage,
        name: "photo.jpeg",
        type: "image/jpeg"
      } )
    };

    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.observation_photos.create( photoParams, options ).then( () => {
      setPostSucceeded();
    } ).catch( ( e ) => {
      setPostFailed( e, "duringPhotoUpload" );
    } );
  };

  const createObservation = ( token ) => {
    const { latitude, longitude } = image;
    let geoprivacyState;

    if ( geoprivacy === i18n.t( "posting.private" ) ) {
      geoprivacyState = "private";
    } else if ( geoprivacy === i18n.t( "posting.obscured" ) ) {
      geoprivacyState = "obscured";
    } else {
      geoprivacyState = "open";
    }

    const obsParams = {
      observation: {
        observed_on_string: date,
        taxon_id: taxon.taxaId,
        geoprivacy: geoprivacyState,
        captive_flag: ( captive === i18n.t( "posting.yes" ) ) || false,
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

    inatjs.observations.create( obsParams, options ).then( ( response ) => {
      const { id } = response[0];
      addPhotoToObservation( id, token ); // get the obs id, then add photo
    } ).catch( ( e ) => {
      setPostFailed( e, "beforePhotoAdded" );
    } );
  };

  const fetchJSONWebToken = () => {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent()
    };

    const site = "https://www.inaturalist.org";

    if ( login ) {
      // $FlowFixMe
      headers.Authorization = `Bearer ${login}`;
    }

    fetch( `${site}/users/api_token`, { headers } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const apiToken = responseJson.api_token;
        createObservation( apiToken );
      } ).catch( ( e ) => {
        if ( e instanceof SyntaxError ) { // this is from the iNat server being down
          setPostFailed( "", "beforeObservation" ); // HTML not parsed correctly, so skip showing error text
        } else {
          setPostFailed( e, "beforeObservation" );
        }
      } );
  };

  const updateTaxon = ( id, commonName, name ) => {
    const selectedSpecies = { id, commonName, name };
    dispatch( { type: "SELECT_SPECIES", selectedSpecies } );
  };

  const closeSelectedSpecies = () => dispatch( { type: "CLOSE_SELECTED_SPECIES" } );
  const showSelectedSpecies = () => dispatch( { type: "SHOW_SELECTED_SPECIES" } );
  const closeLocationPicker = () => dispatch( { type: "CLOSE_LOCATION_PICKER" } );
  const closePostModal = () => dispatch( { type: "CLOSE_POST_STATUS" } );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      getLocation();
      resizeImageForUploading();
    } );
  }, [navigation, getLocation, resizeImageForUploading] );

  const dateToDisplay = date && formatYearMonthDay( date );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <DateTimePicker
        datetime
        isDateTimePickerVisible={isDateTimePickerVisible}
        onDatePicked={handleDatePicked}
        toggleDateTimePicker={toggleDateTimePicker}
      />
      <Modal
        onRequestClose={() => closeSelectedSpecies()}
        visible={showSpeciesModal}
      >
        <SelectSpecies
          image={image.uri}
          seekId={seekId}
          toggleSpeciesModal={closeSelectedSpecies}
          updateTaxon={updateTaxon}
        />
      </Modal>
      <Modal
        onRequestClose={() => closeLocationPicker()}
        visible={showLocationPicker}
      >
        <LocationPicker
          latitude={image.latitude}
          longitude={image.longitude}
          toggleLocationPicker={closeLocationPicker}
          updateLocation={updateLocation}
        />
      </Modal>
      <Modal
        onRequestClose={() => closePostModal()}
        visible={showPostingStatus}
      >
        <PostStatus
          errorText={errorText}
          loading={loading}
          postingSuccess={postingSuccess}
          status={status}
          togglePostModal={closePostModal}
        />
      </Modal>
      <GreenHeader header="posting.header" />
      <ScrollView
        keyboardDismissMode="on-drag"
        onScroll={() => Keyboard.dismiss()}
        scrollEventThrottle={1}
      >
        <TouchableOpacity
          onPress={() => showSelectedSpecies()}
          style={styles.card}
        >
          <SpeciesCard
            commonName={taxon.preferredCommonName}
            handlePress={() => showSelectedSpecies()}
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
          onChangeText={value => setState( { description: value } )}
          placeholder={i18n.t( "posting.notes" )}
          placeholderTextColor="#828282"
          style={styles.inputField}
          value={description}
        />
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => dispatch( { type: "SHOW_DATETIME_PICKER" } )}
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
          onPress={() => dispatch( { type: "SHOW_LOCATION_PICKER" } )}
          style={styles.thinCard}
        >
          <Image source={posting.location} style={[styles.icon, styles.extraMargin]} />
          <View style={styles.row}>
            <Text style={styles.greenText}>
              {i18n.t( "posting.location" ).toLocaleUpperCase()}
            </Text>
            <Text style={styles.text}>
              {location || i18n.t( "location_picker.undefined" )}
            </Text>
          </View>
          <Image
            source={icons.backButton}
            tintColor={colors.seekForestGreen}
            style={[styles.buttonIcon, styles.rotate]}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
        <GeoprivacyPicker updateGeoprivacy={dispatch( { type: "UPDATE_GEOPRIVACY", geoprivacy } )} />
        <View style={styles.divider} />
        <CaptivePicker updateCaptive={dispatch( { type: "UPDATE_CAPTIVE", captive } )} />
        <View style={styles.divider} />
        <View style={styles.textContainer}>
          <GreenButton
            handlePress={() => {
              fetchJSONWebToken();
              dispatch( { type: "SHOW_POST_STATUS" } );
            }}
            text="posting.header"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PostScreen;
