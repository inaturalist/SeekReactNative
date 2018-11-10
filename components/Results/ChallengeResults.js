// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Platform
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";
import Realm from "realm";
import moment from "moment";

import realmConfig from "../../models/index";
import ChallengeResultsScreen from "./ChallengeResultsScreen";
import LoadingWheel from "../LoadingWheel";
import config from "../../config";
import styles from "../../styles/results";
import { addToCollection, flattenUploadParameters } from "../../utility/helpers";

type Props = {
  navigation: any
}

class ChallengeResults extends Component {
  constructor( { navigation }: Props ) {
    super();

    const {
      id,
      image,
      time,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      title: null,
      subtitle: null,
      loading: true,
      match: null,
      matchUrl: null,
      text: null,
      buttonText: null,
      taxaId: null,
      taxaName: null,
      observation: {},
      seenTaxaIds: [],
      id,
      image,
      time,
      latitude,
      longitude
    };

    this.savePhotoOrStartOver = this.savePhotoOrStartOver.bind( this );
  }

  componentDidMount() {
    this.resizeImage();
  }

  setTextAndPhoto( seenDate ) {
    const {
      id,
      taxaId,
      score,
      taxaName,
      seenTaxaIds
    } = this.state;

    if ( seenTaxaIds.length >= 1 && seenDate !== null ) {
      this.setState( {
        title: "Deja Vu!",
        subtitle: `Looks like you already collected a ${taxaName}`,
        match: true,
        text: `You collected a photo of a ${taxaName} on ${seenDate}`,
        buttonText: "OK",
        yourPhotoText: `Your photo:\n${taxaName}`,
        photoText: `Identified Species:\n${taxaName}`
      } );
    } else if ( score > 85 && id === undefined ) {
      this.setState( {
        title: "Sweet!",
        subtitle: `You saw a ${taxaName}`,
        match: true,
        text: null,
        buttonText: "Add to Collection",
        yourPhotoText: `Your photo:\n${taxaName}`,
        photoText: `Identified Species:\n${taxaName}`
      } );
    } else if ( score <= 85 && id === undefined ) {
      this.setState( {
        title: "Hrmmmmm",
        subtitle: "We can't figure this one out. Please try some adjustments.",
        match: "unknown",
        text: "Here are some photo tips:\nGet as close as possible while being safe\nCrop out unimportant parts\nMake sure things are in focus",
        buttonText: "Start over"
      } );
    } else if ( score > 85 && id === taxaId ) {
      this.setState( {
        title: "It's a Match!",
        subtitle: `You saw a ${taxaName}`,
        match: true,
        text: null,
        buttonText: "Add to Collection"
      } );
    } else if ( score > 85 && id !== taxaId ) {
      this.setState( {
        title: "Good Try!",
        subtitle: `However, this isn't a ... it's a ${taxaName}`,
        match: false,
        text: `You still need to collect a ${taxaName}. Would you like to collect it now?`,
        buttonText: "Add to Collection"
      } );
    } else {
      this.setState( {
        title: "Hrmmmmm",
        subtitle: "We can't figure this one out. Please try some adjustments.",
        match: "unknown",
        text: "Here are some photo tips:\nGet as close as possible while being safe\nCrop out unimportant parts\nMake sure things are in focus",
        buttonText: "Start over"
      } );
    }
  }

  fetchSeenTaxaIds( taxaId ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const seenTaxaIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        if ( seenTaxaIds.includes( taxaId ) ) {
          const observations = realm.objects( "ObservationRealm" );
          const seenTaxa = observations.filtered( `taxon.id == ${taxaId}` );
          const seenDate = moment( seenTaxa[0].date ).format( "ll" );
          this.setState( {
            seenTaxaIds
          }, () => this.setTextAndPhoto( seenDate ) );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
        this.setTextAndPhoto();
      } );
    this.setTextAndPhoto();
  }

  savePhotoOrStartOver( buttonText ) {
    const {
      id,
      observation,
      taxaName,
      latitude,
      longitude
    } = this.state;

    const {
      navigation
    } = this.props;

    if ( buttonText === "Add to Collection" ) {
      addToCollection( observation, latitude, longitude );
      navigation.navigate( "Main", { taxaName, speciesSeen: true } );
    } else if ( buttonText === "Start over" ) {
      navigation.navigate( "Camera", { id } );
    } else {
      // navigation.navigate( "Main" );
      navigation.navigate( "Main", { taxaName, speciesSeen: true } );
    }
  }

  resizeImage() {
    const {
      image,
      time,
      latitude,
      longitude
    } = this.state;

    ImageResizer.createResizedImage( image.uri, 299, 299, "JPEG", 100 )
      .then( ( { uri } ) => {
        let resizedImageUri;

        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          resizedImageUri = uriParts[uriParts.length - 1];
        } else {
          resizedImageUri = uri;
        }
        const params = flattenUploadParameters( resizedImageUri, time, latitude, longitude );
        this.fetchScore( params );
      } ).catch( ( err ) => {
        console.log( err, "error with image resizer" );
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
      .then( ( { results } ) => {
        const match = results[0];
        this.setState( {
          observation: match,
          taxaId: match.taxon.id,
          taxaName: match.taxon.preferred_common_name || match.taxon.name,
          score: match.combined_score,
          matchUrl: match.taxon.default_photo.medium_url,
          loading: false
        }, () => {
          this.fetchSeenTaxaIds( this.state.taxaId );
        } );
      } )
      .catch( ( err ) => {
        console.log( err, "error fetching results from computer vision" );
      } );
  }

  render() {
    const {
      loading,
      title,
      subtitle,
      match,
      matchUrl,
      text,
      buttonText,
      photoText,
      yourPhotoText,
      image
    } = this.state;

    const {
      navigation
    } = this.props;

    const content = loading ? <LoadingWheel />
      : (
        <ChallengeResultsScreen
          title={title}
          subtitle={subtitle}
          match={match}
          matchUrl={matchUrl}
          text={text}
          buttonText={buttonText}
          photoText={photoText}
          yourPhotoText={yourPhotoText}
          image={image}
          navigation={navigation}
          onPress={this.savePhotoOrStartOver}
        />
      );

    return (
      <View style={ { flex: 1 } }>
        <ImageBackground
          style={styles.backgroundImage}
          source={require( "../../assets/backgrounds/background.png" )}
        >
          {content}
        </ImageBackground>
      </View>
    );
  }
}

export default ChallengeResults;
