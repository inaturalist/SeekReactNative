// @flow

import React, { Component } from "react";
import {
  View,
  Platform,
  Modal,
  Alert
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";
import Realm from "realm";
import moment from "moment";
import { NavigationEvents } from "react-navigation";
import OpenSettings from "react-native-open-settings";

import i18n from "../../i18n";
import realmConfig from "../../models";
import ErrorScreen from "./Error";
import ConfirmScreen from "./ConfirmScreen";
import config from "../../config";
import styles from "../../styles/results/results";
import {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName
} from "../../utility/helpers";
import { fetchAccessToken } from "../../utility/loginHelpers";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import { checkNumberOfBadgesEarned } from "../../utility/badgeHelpers";
import { checkNumberOfChallengesCompleted } from "../../utility/challengeHelpers";

type Props = {
  navigation: any
}

class Results extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      image,
      time,
      latitude,
      longitude,
      predictions,
      route
    } = navigation.state.params;

    this.state = {
      threshold: 0.7,
      predictions,
      image,
      time,
      latitude,
      longitude,
      userImage: null,
      speciesSeenImage: null,
      observation: null,
      taxaId: null,
      taxaName: null,
      commonAncestor: null,
      seenDate: null,
      loading: true,
      photoConfirmed: false,
      error: null,
      scientificName: null,
      isLoggedIn: false,
      imageForUploading: null,
      route,
      modalVisible: false
    };

    this.toggleConfirmationScreen = this.toggleConfirmationScreen.bind( this );
  }

  getLocation() {
    const { latitude, longitude } = this.state;

    if ( !latitude || !longitude ) {
      fetchTruncatedUserLocation().then( ( coords ) => {
        const lat = coords.latitude;
        const lng = coords.longitude;

        this.setState( {
          latitude: lat,
          longitude: lng
        } );
      } );
    }
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setImageForUploading( imageForUploading ) {
    this.setState( { imageForUploading } );
  }

  setLoggedIn( isLoggedIn ) {
    this.setState( { isLoggedIn } );
  }

  setImageUri( uri ) {
    this.setState( { userImage: uri }, () => this.checkOnlineOrOfflineVision() );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setSeenDate( seenDate ) {
    this.setState( { seenDate } );
  }

  setError( error ) {
    this.setLoading( false );
    this.setState( { error } );
  }

  setCommonAncestor( ancestor, speciesSeenImage ) {
    getTaxonCommonName( ancestor.taxon_id ).then( ( commonName ) => {
      this.setState( {
        commonAncestor: commonName || ancestor.name,
        taxaId: ancestor.taxon_id,
        speciesSeenImage,
        scientificName: ancestor.name
      }, () => this.showNoMatch() );
    } );
  }

  setOnlineVisionSpeciesResults( species ) {
    const { taxon } = species;
    const photo = taxon.default_photo;

    this.setState( {
      observation: species,
      taxaId: taxon.id,
      taxaName: capitalizeNames( taxon.preferred_common_name || taxon.name ),
      scientificName: taxon.name,
      speciesSeenImage: photo ? photo.medium_url : null
    }, () => this.showMatch() );
  }

  setOnlineVisionAncestorResults( commonAncestor ) {
    const { taxon } = commonAncestor;
    const photo = taxon.default_photo;

    this.setState( {
      commonAncestor: commonAncestor
        ? capitalizeNames( taxon.preferred_common_name || taxon.name )
        : null,
      taxaId: taxon.id,
      speciesSeenImage: photo ? photo.medium_url : null,
      scientificName: taxon.name
    }, () => this.showNoMatch() );
  }

  setARCameraVisionResults() {
    const { predictions, threshold } = this.state;
    const species = predictions.find( leaf => leaf.rank === 10 );

    if ( species && species.score > threshold ) {
      this.setState( {
        taxaId: Number( species.taxon_id )
      }, () => {
        this.checkDateSpeciesSeen( Number( species.taxon_id ) );
        this.fetchAdditionalTaxaInfo();
      } );
    } else {
      this.checkForCommonAncestor();
    }
  }

  getParamsForOnlineVision() {
    const {
      userImage,
      time,
      latitude,
      longitude
    } = this.state;

    const params = flattenUploadParameters( userImage, time, latitude, longitude );
    params.locale = i18n.currentLocale();

    this.fetchScore( params );
  }

  // resetState() {
  //   this.state = {
  //     userImage: null,
  //     speciesSeenImage: null,
  //     observation: null,
  //     taxaId: null,
  //     taxaName: null,
  //     commonAncestor: null,
  //     seenDate: null,
  //     scientificName: null
  //   };
  // }

  async showMatch() {
    const { seenDate } = this.state;

    this.setLoading( false );

    if ( !seenDate ) {
      await this.addObservation();
      this.navigateTo( "Match" );
    } else {
      this.navigateTo( "NoMatchScreen" );
    }
  }

  showNoMatch() {
    this.setLoading( false );

    this.navigateTo( "NoMatchScreen" );
  }

  fetchAdditionalTaxaInfo() {
    const { taxaId } = this.state;

    const params = {
      locale: i18n.currentLocale()
    };

    inatjs.taxa.fetch( taxaId, params ).then( ( response ) => {
      const taxa = response.results[0];

      this.setState( {
        taxaName: capitalizeNames( taxa.preferred_common_name || taxa.name ),
        scientificName: taxa.name,
        observation: {
          taxon: {
            default_photo: taxa.default_photo,
            id: Number( taxaId ),
            name: taxa.name,
            preferred_common_name: taxa.preferred_common_name,
            iconic_taxon_id: taxa.iconic_taxon_id,
            ancestor_ids: taxa.ancestor_ids
          }
        },
        speciesSeenImage: taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null
      }, () => this.showMatch() );
    } ).catch( () => {
      this.setError( "taxaInfo" );
    } );
  }

  fetchAdditionalAncestorInfo( ancestor ) {
    inatjs.taxa.fetch( ancestor.taxon_id ).then( ( response ) => {
      const taxa = response.results[0];
      const speciesSeenImage = taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
      this.setCommonAncestor( ancestor, speciesSeenImage );
    } ).catch( () => {
      this.setError( "ancestorInfo" );
    } );
  }

  checkForCommonAncestor() {
    const { predictions, threshold } = this.state;
    const reversePredictions = predictions.reverse();

    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank !== 100 ) {
      this.fetchAdditionalAncestorInfo( ancestor );
    } else {
      this.showNoMatch();
    }
  }

  resizeImage() {
    const { image } = this.state;

    ImageResizer.createResizedImage( image.uri, 299, 299, "JPEG", 80 )
      .then( ( { uri } ) => {
        let userImage;
        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          userImage = uriParts[uriParts.length - 1];
          this.setImageUri( userImage );
        } else {
          userImage = uri;
          this.setImageUri( userImage );
        }
      } ).catch( () => {
        this.setError( "image" );
      } );
  }

  checkOnlineOrOfflineVision() {
    const { predictions } = this.state;

    if ( predictions && predictions.length > 0 ) {
      this.setARCameraVisionResults();
    } else {
      this.getParamsForOnlineVision();
    }
  }

  resizeImageForUploading() {
    const { image } = this.state;

    ImageResizer.createResizedImage( image.uri, 2048, 2048, "JPEG", 80 )
      .then( ( { uri } ) => {
        let userImage;
        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          userImage = uriParts[uriParts.length - 1];
          this.setImageForUploading( userImage );
        } else {
          userImage = uri;
          this.setImageForUploading( userImage );
        }
      } ).catch( () => {
        this.setError( "image" );
      } );
  }

  createJwtToken() {
    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const token = jwt.encode( claims, config.jwtSecret, "HS512" );
    return token;
  }

  fetchScore( params ) {
    const token = this.createJwtToken();

    inatjs.computervision.score_image( params, { api_token: token } )
      .then( ( response ) => {
        const species = response.results[0];
        const commonAncestor = response.common_ancestor;

        // if ( species.combined_score > 85 ) { // changed to 85 for testing
        if ( species.combined_score > 97 ) {
          this.checkDateSpeciesSeen( species.taxon.id );
          this.setOnlineVisionSpeciesResults( species );
        } else if ( commonAncestor ) {
          this.setOnlineVisionAncestorResults( commonAncestor );
        } else {
          this.showNoMatch();
        }
      } ).catch( () => {
        this.setError( "onlineVision" );
      } );
  }

  addObservation() {
    const {
      latitude,
      longitude,
      observation,
      image,
      time
    } = this.state;

    if ( latitude && longitude ) {
      addToCollection( observation, latitude, longitude, image, time );
    } else {
      Alert.alert(
        i18n.t( "results.enable_location" ),
        i18n.t( "results.error_location" ),
        [{
          text: i18n.t( "species_nearby.enable_location" ),
          onPress: () => OpenSettings.openSettings()
        },
        {
          text: i18n.t( "posting.ok" ),
          style: "default"
        }]
      );
    }
  }

  checkDateSpeciesSeen( taxaId ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const seenTaxaIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        if ( seenTaxaIds.includes( taxaId ) ) {
          const seenTaxa = realm.objects( "ObservationRealm" ).filtered( `taxon.id == ${taxaId}` );
          const seenDate = moment( seenTaxa[0].date ).format( "ll" );
          this.setSeenDate( seenDate );
        } else {
          this.setSeenDate( null );
        }
      } ).catch( () => {
        this.setSeenDate( null );
      } );
  }

  toggleConfirmationScreen() {
    const { modalVisible, photoConfirmed } = this.state;
    this.setState( {
      modalVisible: !modalVisible,
      photoConfirmed: !photoConfirmed
    } );
  }

  navigateTo( route ) {
    const { navigation } = this.props;
    const {
      userImage,
      taxaName,
      taxaId,
      speciesSeenImage,
      commonAncestor,
      seenDate,
      imageForUploading,
      isLoggedIn,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    } = this.state;

    navigation.navigate( route, {
      userImage,
      image: imageForUploading,
      taxaName,
      taxaId,
      speciesSeenImage,
      seenDate,
      isLoggedIn,
      scientificName,
      latitude,
      longitude,
      time,
      commonAncestor,
      postingSuccess
    } );
  }

  checkPrevRoute() {
    const { route } = this.state;

    if ( route === "gallery" ) {
      this.toggleConfirmationScreen();
    }
  }

  render() {
    const {
      loading,
      imageForUploading,
      photoConfirmed,
      error,
      route,
      modalVisible
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.getLoggedIn();
            this.getLocation();
            this.resizeImage();
            this.resizeImageForUploading();
            checkNumberOfBadgesEarned();
            checkNumberOfChallengesCompleted();
            this.checkPrevRoute();
          }}
          // onWillBlur={() => this.resetState()}
        />
        {error ? <ErrorScreen error={error} navigation={navigation} /> : null}
        {( !loading && photoConfirmed ) || route === "camera"
          ? null
          : (
            <Modal
              visible={modalVisible}
              onRequestClose={() => this.toggleConfirmationScreen()}
            >
              <ConfirmScreen
                navigation={navigation}
                image={imageForUploading}
                toggleConfirmationScreen={this.toggleConfirmationScreen}
                photoConfirmed={photoConfirmed}
                loading={loading}
              />
            </Modal>
          )}
      </View>
    );
  }
}

export default Results;
