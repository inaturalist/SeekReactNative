// @flow

import React, {
  useReducer,
  useEffect,
  useCallback,
  useContext
} from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatISO } from "date-fns";

import styles from "../../styles/posting/postToiNat";
// import { savePostingSuccess } from "../../utility/loginHelpers";
import { fetchUserLocation, checkForTruncatedCoordinates } from "../../utility/locationHelpers";
import i18n from "../../i18n";
import GeoprivacyPicker from "./Pickers/GeoprivacyPicker";
import CaptivePicker from "./Pickers/CaptivePicker";
// import PostStatus from "./PostStatus";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { setISOTime, isAndroidDateInFuture } from "../../utility/dateHelpers";
import { useLocationName } from "../../utility/customHooks";
import { UserContext } from "../UserContext";
import Notes from "./Notes";
import LocationPickerCard from "./Pickers/LocationPickerCard";
import DatePicker from "./Pickers/DateTimePicker";
import PostingHeader from "./PostingHeader";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { saveObservationToRealm } from "../../utility/uploadHelpers";
import { update } from "inaturalistjs/lib/endpoints/comments";

const PostScreen = () => {
  const navigation = useNavigation( );
  const { params } = useRoute( );
  const { login } = useContext( UserContext );

  const { taxaId, scientificName, commonName } = params;

  const initialDate = params.image.time ? setISOTime( params.image.time ) : null;
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    console.log( action );
    switch ( action.type ) {
      case "SELECT_SPECIES":
        return {
          ...state,
          taxon: {
            name: action.selectedSpecies.name,
            taxaId: action.selectedSpecies.id,
            preferredCommonName: action.selectedSpecies.updatedCommonName
          },
          observation: action.observation
        };
      // case "SHOW_POST_STATUS":
      //   return { ...state, showPostingStatus: true };
      // case "CLOSE_POST_STATUS":
      //   return { ...state, showPostingStatus: false };
      case "UPDATE_OBSERVATION":
        return { ...state, observation: action.observation };
      default:
        throw new Error();
    }
  }, {
    observation: {
      captive_flag: false,
      description: null,
      geoprivacy: "open",
      latitude: params.image.latitude,
      longitude: params.image.longitude,
      observed_on_string: initialDate,
      place_guess: null,
      positional_accuracy: 90,
      taxon_id: taxaId,
      uri: params.image.uri
    },
    taxon: {
      preferredCommonName: commonName,
      name: scientificName,
      taxaId
    }
  } );

  const { observation, taxon } = state;

  const location = useLocationName( observation.latitude, observation.longitude );

  // const createObservation = ( token, uuid ) => {
  //   const { latitude, longitude, accuracy } = image;
  //   let geoprivacyState;

  //   if ( geoprivacy === i18n.t( "posting.private" ) ) {
  //     geoprivacyState = "private";
  //   } else if ( geoprivacy === i18n.t( "posting.obscured" ) ) {
  //     geoprivacyState = "obscured";
  //   } else {
  //     geoprivacyState = "open";
  //   }

  //   const obsParams = {
  //     observation: {
  //       observed_on_string: date,
  //       taxon_id: taxon.taxaId,
  //       geoprivacy: geoprivacyState,
  //       captive_flag: ( captive === i18n.t( "posting.yes" ) ) || false,
  //       place_guess: location,
  //       latitude, // use the non-truncated version
  //       longitude, // use the non-truncated version
  //       positional_accuracy: accuracy,
  //       owners_identification_from_vision_requested: true,
  //       // this shows that the id is recommended by computer vision
  //       description
  //     }
  //   };

  //   const options = { api_token: token, user_agent: createUserAgent() };

  //   inatjs.observations.create( obsParams, options ).then( ( response ) => {
  //     const { id } = response[0];
  //     saveIdAndUploadStatus( id, image.uri, uuid );
  //     addPhotoToObservation( id, token, uuid ); // get the obs id, then add photo
  //   } ).catch( ( e ) => {
  //     setPostFailed( e, "beforePhotoAdded" );
  //   } );
  // };

  // const fetchJSONWebToken = ( uuid: string ) => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "User-Agent": createUserAgent()
  //   };

  //   const site = "https://www.inaturalist.org";

  //   if ( login ) {
  //     // $FlowFixMe
  //     headers.Authorization = `Bearer ${login}`;
  //   }

  //   fetch( `${site}/users/api_token`, { headers } )
  //     .then( response => response.json() )
  //     .then( ( responseJson ) => {
  //       const apiToken = responseJson.api_token;
  //       createObservation( apiToken, uuid );
  //     } ).catch( ( e ) => {
  //       if ( e instanceof SyntaxError ) { // this is from the iNat server being down
  //         setPostFailed( "", "beforeObservation" ); // HTML not parsed correctly, so skip showing error text
  //       } else {
  //         setPostFailed( e, "beforeObservation" );
  //       }
  //     } );
  // };
  const setLocation = useCallback( ( coords ) => {
    dispatch( { type: "UPDATE_OBSERVATION", observation: {
      ...observation,
      latitude: coords.latitude,
      longitude: coords.longitude,
      positional_accuracy: coords.accuracy
    } } );
  }, [observation] );

  const getLocation = useCallback( ( ) => {
    const truncated = checkForTruncatedCoordinates( params.image.latitude );

    if ( truncated ) {
      fetchUserLocation( ).then( ( coords ) => {
        setLocation( coords );
      } ).catch( ( err ) => console.log( err ) );
    }
  }, [setLocation, params.image] );

  const updateLocation = ( latitude, longitude, newAccuracy ) => {
    const coords = { latitude, longitude, accuracy: newAccuracy };
    setLocation( coords );
  };

  const updateTaxon = useCallback( ( id, updatedCommonName, name ) => {
    const selectedSpecies = { id, updatedCommonName, name };
    dispatch( {
      type: "SELECT_SPECIES",
      selectedSpecies,
      observation: {
        ...observation,
        taxon_id: id
      }
    } );

  }, [observation] );

  // const closePostModal = useCallback( ( ) => dispatch( { type: "CLOSE_POST_STATUS" } ), [] );
  const updateObservation = useCallback( ( key, value ) => dispatch( {
    type: "UPDATE_OBSERVATION",
    observation: {
      ...observation,
      [key]: value
    }
  } ), [observation] );

  useEffect( ( ) => {
    if ( location !== observation.place_guess && location !== i18n.t( "location_picker.undefined" ) ) {
      updateObservation( "place_guess", location );
    }
  }, [location, observation, updateObservation] );

  const handleDatePicked = ( selectedDate ) => {
    if ( selectedDate ) {
      const isFuture = isAndroidDateInFuture( selectedDate );
      const newDate = isFuture ? formatISO( new Date( ) ) : formatISO( selectedDate );
      updateObservation( "observed_on_string", newDate.toString( ) );
    }
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      // make sure these only happen on first page load, not when a user taps posting help
      getLocation();
    } );
  }, [navigation, getLocation] );

  const saveObservation = async ( ) => {
    saveObservationToRealm( observation );
    // const uuid = await createUUID( );
    // fetchJSONWebToken( uuid );
    // showPostStatus( );
  };

  return (
    <ScrollWithHeader header="posting.header">
      {/* <Modal
        onRequestClose={closePostModal}
        visible={showPostingStatus}
      >
        <PostStatus
          errorText={errorText}
          postingSuccess={postingSuccess}
          status={status}
          togglePostModal={closePostModal}
        />
      </Modal> */}
      <PostingHeader
        taxon={taxon}
        image={params.image}
        updateTaxon={updateTaxon}
      />
      <Notes description={observation.description} updateObservation={updateObservation} />
      <View style={styles.divider} />
      <DatePicker dateToDisplay={observation.observed_on_string} handleDatePicked={handleDatePicked} />
      <View style={styles.divider} />
      <LocationPickerCard updateLocation={updateLocation} location={location} observation={observation} />
      <View style={styles.divider} />
      <GeoprivacyPicker updateObservation={updateObservation} geoprivacy={observation.geoprivacy} />
      <View style={styles.divider} />
      <CaptivePicker updateObservation={updateObservation} captive={observation.captive_flag} />
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <GreenButton
          handlePress={saveObservation}
          text="posting.header"
        />
      </View>
    </ScrollWithHeader>
  );
};

export default PostScreen;
