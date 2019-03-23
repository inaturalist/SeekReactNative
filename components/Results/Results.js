// @flow

import React, { Component } from "react";
import {
  View,
  Platform,
  Alert
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";
import Realm from "realm";
import moment from "moment";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models";
import ConfirmScreen from "./ConfirmScreen";
import AncestorScreen from "./AncestorScreen";
import MatchScreen from "./MatchScreen";
import NoMatchScreen from "./NoMatchScreen";
import config from "../../config";
import styles from "../../styles/results/results";
import {
  capitalizeNames,
  flattenUploadParameters,
  addToCollection
} from "../../utility/helpers";
import { getLatAndLng } from "../../utility/locationHelpers";
import { checkNumberOfBadgesEarned } from "../../utility/badgeHelpers";
import { checkNumberOfChallengesCompleted } from "../../utility/challengeHelpers";
import AlreadySeenScreen from "./AlreadySeenScreen";

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
      predictions
    } = navigation.state.params;

    this.state = {
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
      match: null,
      seenDate: null,
      loading: true,
      photoConfirmed: false
    };

    this.confirmPhoto = this.confirmPhoto.bind( this );
  }

  async getLocation() {
    const { latitude, longitude } = this.state;
    if ( !latitude || !longitude ) {
      const location = await getLatAndLng();
      this.setLocation( location );
    } else {
      this.checkOnlineOrOfflineVision();
    }
  }

  setLocation( location ) {
    this.setState( {
      latitude: location.latitude,
      longitude: location.longitude
    }, () => {
      this.checkOnlineOrOfflineVision();
    } );
  }

  setImageUri( uri ) {
    this.setState( { userImage: uri } );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setSeenDate( seenDate ) {
    this.setState( { seenDate } );
  }

  setMatch( match ) {
    this.setState( { match } );
  }

  setCommonAncestor( ancestor, speciesSeenImage ) {
    this.setState( {
      commonAncestor: ancestor.name,
      taxaId: ancestor.taxon_id,
      speciesSeenImage
    }, () => this.showNoMatch() );
  }

  setOnlineVisionResults( match, commonAncestor ) {
    this.setState( {
      observation: match,
      taxaId: match.taxon.id,
      taxaName: capitalizeNames( match.taxon.preferred_common_name || match.taxon.name ),
      speciesSeenImage: match.taxon.default_photo.medium_url,
      commonAncestor: commonAncestor ? commonAncestor.taxon.name : null
    }, () => {
      this.checkDateSpeciesSeen( match.taxon.id );
      this.checkForOnlineVisionMatch( match.combined_score );
    } );
  }

  setARCameraVisionResults() {
    const { predictions } = this.state;
    const species = predictions.find( leaf => leaf.rank === 10 );
    Alert.alert( JSON.stringify( species ), "species" );

    if ( species && species.score > 0.9 ) {
      this.setState( {
        taxaId: species.taxon_id,
        taxaName: species.name
      }, () => {
        this.checkDateSpeciesSeen( species.taxon_id );
        this.fetchAdditionalTaxaInfo();
      } );
    } else {
      this.setMatch( false );
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
    this.fetchScore( params );
  }

  checkOnlineOrOfflineVision() {
    const { predictions } = this.state;

    if ( predictions && predictions.length > 0 ) {
      this.setARCameraVisionResults();
    } else {
      this.getParamsForOnlineVision();
    }
  }

  async showMatch() {
    await this.addObservation();
    this.setMatch( true );
    this.setLoading( false );
  }

  showNoMatch() {
    this.setMatch( false );
    this.setLoading( false );
  }

  fetchAdditionalTaxaInfo() {
    const { taxaId } = this.state;

    inatjs.taxa.fetch( taxaId ).then( ( response ) => {
      const taxa = response.results[0];
      this.setState( {
        observation: {
          taxon: {
            default_photo: taxa.default_photo.medium_url,
            id: Number( taxaId ),
            name: taxa.name,
            preferred_common_name: taxa.preferred_common_name,
            iconic_taxon_id: taxa.iconic_taxon_id
          }
        },
        speciesSeenImage: taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null
      }, () => this.showMatch() );
    } ).catch( () => {
      // console.log( err, "error fetching taxon details" );
    } );
  }

  fetchAdditionalAncestorInfo( ancestor ) {
    inatjs.taxa.fetch( ancestor.taxon_id ).then( ( response ) => {
      const taxa = response.results[0];
      const speciesSeenImage = taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
      this.setCommonAncestor( ancestor, speciesSeenImage );
    } ).catch( () => {
      // console.log( err, "error fetching taxon details" );
    } );
  }

  checkForCommonAncestor() {
    const { predictions } = this.state;
    const reversePredictions = predictions.reverse();
    Alert.alert( JSON.stringify( reversePredictions ), "reverse" );
    const ancestor = reversePredictions.find( leaf => leaf.score > 0.9 );

    Alert.alert( JSON.stringify( ancestor ), "ancestor" );

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
          this.checkOnlineOrOfflineVision();
        } else {
          userImage = uri;
          this.setImageUri( userImage );
          this.checkOnlineOrOfflineVision();
        }
      } ).catch( ( err ) => {
        console.log( err, "couldn't resize image" );
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
        const match = response.results[0];
        const commonAncestor = response.common_ancestor;
        this.setOnlineVisionResults( match, commonAncestor );
      } )
      .catch( ( err ) => {
        console.log( err, "error fetching computer vision results" );
      } );
  }

  addObservation() {
    const {
      latitude,
      longitude,
      observation,
      image
    } = this.state;

    Alert.alert( "obs being added", JSON.stringify( observation ) );

    addToCollection( observation, Number( latitude ), Number( longitude ), image );
  }

  checkForOnlineVisionMatch( score ) {
    if ( score > 97 ) {
      this.showMatch();
    } else {
      this.showNoMatch();
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
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to check date species seen: ", err );
      } );
  }

  confirmPhoto() {
    this.setState( { photoConfirmed: true } );
  }

  render() {
    const {
      userImage,
      taxaName,
      match,
      taxaId,
      speciesSeenImage,
      commonAncestor,
      seenDate,
      loading,
      image,
      photoConfirmed
    } = this.state;
    const { navigation } = this.props;

    let resultScreen;

    if ( seenDate ) {
      resultScreen = (
        <AlreadySeenScreen
          navigation={navigation}
          userImage={userImage}
          taxaName={taxaName}
          taxaId={taxaId}
          speciesSeenImage={speciesSeenImage}
          seenDate={seenDate}
        />
      );
    } else if ( match && taxaName ) {
      resultScreen = (
        <MatchScreen
          navigation={navigation}
          userImage={userImage}
          taxaName={taxaName}
          taxaId={taxaId}
          speciesSeenImage={speciesSeenImage}
        />
      );
    } else if ( !match && commonAncestor ) {
      resultScreen = (
        <AncestorScreen
          navigation={navigation}
          userImage={userImage}
          speciesSeenImage={speciesSeenImage}
          commonAncestor={commonAncestor}
        />
      );
    } else {
      resultScreen = (
        <NoMatchScreen
          navigation={navigation}
          userImage={userImage}
        />
      );
    }

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.getLocation();
            this.resizeImage();
            checkNumberOfBadgesEarned();
            checkNumberOfChallengesCompleted();
          }}
        />
        {!loading && photoConfirmed
          ? resultScreen
          : (
            <ConfirmScreen
              navigation={navigation}
              image={image}
              photoConfirmed={photoConfirmed}
              loading={loading}
              confirmPhoto={this.confirmPhoto}
            />
          )}
      </View>
    );
  }
}

export default Results;
