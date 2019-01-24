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

import i18n from "../../i18n";
import realmConfig from "../../models";
import ResultsScreen from "./ResultsScreen";
import LoadingWheel from "../LoadingWheel";
import ErrorScreen from "../ErrorScreen";
import config from "../../config";
import styles from "../../styles/results";
import {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  getLatAndLng
} from "../../utility/helpers";

type Props = {
  navigation: any
}

class Results extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      id,
      image,
      time,
      latitude,
      longitude,
      commonName,
      targetTaxaPhoto
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
      longitude,
      error: null,
      commonName,
      targetTaxaPhoto,
      commonAncestor: null,
      resizedImageUri: null
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
      commonAncestor
    } = this.state;

    if ( score > 97 ) {
      if ( id === taxaId ) {
        this.setTargetMatched( seenDate );
      } else if ( id === null ) {
        this.setTaxaIdentifiedNoTarget( seenDate );
      } else if ( id !== taxaId ) {
        this.setTargetNotMatched( seenDate );
      }
    } else if ( score > 85 && id === taxaId ) {
      this.setTargetMatched( seenDate );
    } else {
      this.setTaxaUnknown( commonAncestor );
    }
  }

  setTargetNotMatched( seenDate ) {
    const {
      taxaName,
      seenTaxaIds,
      commonName,
      targetTaxaPhoto
    } = this.state;

    this.setState( {
      title: i18n.t( "results.good_try" ),
      subtitle: `However, this isn't a ${commonName}, it's a ${taxaName}.`,
      photoText: `Target Species:\n${commonName}`,
      yourPhotoText: `Your Photo:\n${taxaName}`,
      match: false
    } );

    if ( seenTaxaIds.length >= 1 && seenDate !== null ) {
      this.setState( {
        text: `You collected a photo of a ${taxaName} on ${seenDate}`,
        buttonText: "OK"
      } );
    } else {
      this.setState( {
        text: `You still need to collect a ${taxaName}. Would you like to collect it now?`,
        buttonText: "Add to Collection",
        matchUrl: targetTaxaPhoto
      } );
    }
  }

  setTaxaIdentifiedNoTarget( seenDate ) {
    const {
      taxaName,
      seenTaxaIds
    } = this.state;

    if ( seenTaxaIds.length >= 1 && seenDate !== null ) {
      this.setTaxaAlreadySeen( seenDate );
    } else {
      this.setState( {
        title: i18n.t( "results.sweet" ),
        subtitle: `You saw a ${taxaName}`,
        text: null,
        match: true,
        buttonText: "Add to Collection",
        yourPhotoText: `Your Photo:\n${taxaName}`,
        photoText: `Identified Species:\n${taxaName}`
      } );
    }
  }

  setTaxaAlreadySeen( seenDate ) {
    const { taxaName } = this.state;

    this.setState( {
      title: i18n.t( "results.deja_vu" ),
      match: true,
      subtitle: `Looks like you already collected a ${taxaName}`,
      text: `You collected a photo of a ${taxaName} on ${seenDate}`,
      buttonText: "OK"
    } );
  }

  setTargetMatched( seenDate ) {
    const {
      taxaName,
      seenTaxaIds,
      commonName
    } = this.state;

    if ( seenTaxaIds.length >= 1 && seenDate !== null ) {
      this.setTaxaAlreadySeen( seenDate );
      this.setState( {
        yourPhotoText: `Your Photo:\n${taxaName}`,
        photoText: `Identified Species:\n${commonName}`
      } );
    } else {
      this.setState( {
        title: i18n.t( "results.match" ),
        subtitle: `You saw a ${taxaName}`,
        match: true,
        text: null,
        buttonText: "Add to Collection"
      } );
    }
  }

  setTaxaUnknown( commonAncestor ) {
    this.setState( {
      title: i18n.t( "results.hrmmm" ),
      subtitle: commonAncestor ? `We think this is a photo of ${commonAncestor}, but we can't say for sure what species it is.` : "We can't figure this one out. Please try some adjustments.",
      match: "unknown",
      text: "Here are some photo tips:\n\n\u2022 Get as close as possible while being safe\n\u2022 Crop out unimportant parts\n\u2022 Make sure things are in focus",
      buttonText: "Start over"
    } );
  }

  fetchTargetTaxonPhoto() {
    const { id } = this.state;

    inatjs.taxa.fetch( id ).then( ( response ) => {
      const taxa = response.results[0];
      this.setState( {
        targetTaxaPhoto: taxa.default_photo.medium_url
      } );
    } ).catch( ( err ) => {
      // console.log( err, "error fetching taxon photo" );
    } );
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
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
        this.setTextAndPhoto();
      } );
    this.setTextAndPhoto();
  }

  async savePhotoOrStartOver() {
    const {
      id,
      observation,
      latitude,
      longitude,
      image,
      buttonText
    } = this.state;

    const {
      navigation
    } = this.props;

    if ( buttonText === "OK" ) {
      navigation.push( "Main" );
    } else if ( buttonText === "Add to Collection" ) {
      if ( !latitude || !longitude ) {
        const location = await getLatAndLng();
        addToCollection( observation, location.latitude, location.longitude, image );
        navigation.push( "Main" );
      } else {
        addToCollection( observation, latitude, longitude, image );
        navigation.push( "Main" );
      }
    } else if ( buttonText === "Start over" ) {
      navigation.push( "Camera", {
        id,
        commonName: null
      } );
    } else {
      navigation.push( "Main" );
    }
  }

  resizeImage() {
    const {
      image,
      time,
      latitude,
      longitude
    } = this.state;

    ImageResizer.createResizedImage( image.uri, 299, 299, "JPEG", 80 )
      .then( ( { uri } ) => {
        let resizedImageUri;

        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          resizedImageUri = uriParts[uriParts.length - 1];
          this.setState( {
            resizedImageUri
          } );
        } else {
          resizedImageUri = uri;
          this.setState( {
            resizedImageUri
          } );
        }
        const params = flattenUploadParameters( resizedImageUri, time, latitude, longitude );
        this.fetchScore( params );
      } ).catch( ( err ) => {
        this.setState( {
          error: `${err.message}: couldn't resize image`
        } );
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
        this.setState( {
          observation: match,
          taxaId: match.taxon.id,
          taxaName: capitalizeNames( match.taxon.preferred_common_name || match.taxon.name ),
          score: match.combined_score,
          matchUrl: match.taxon.default_photo.medium_url,
          commonAncestor: commonAncestor ? commonAncestor.taxon.name : null,
          loading: false
        }, () => {
          this.fetchTargetTaxonPhoto();
          this.fetchSeenTaxaIds( match.taxon.id );
        } );
      } )
      .catch( ( err ) => {
        console.log( err, "error in computer vision results" );
        this.setState( {
          error: i18n.t( "results.computer_vision_error" )
        } );
      } );
  }

  render() {
    const {
      error,
      loading,
      title,
      subtitle,
      match,
      matchUrl,
      text,
      buttonText,
      photoText,
      yourPhotoText,
      image,
      resizedImageUri
    } = this.state;

    const {
      navigation
    } = this.props;

    let content;

    if ( error ) {
      content = <ErrorScreen error={error} />;
    } else if ( loading ) {
      content = <LoadingWheel />;
    } else {
      content = (
        <ResultsScreen
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
          savePhotoOrStartOver={this.savePhotoOrStartOver}
          resizedImageUri={resizedImageUri}
        />
      );
    }

    return (
      <View style={styles.mainContainer}>
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

export default Results;
