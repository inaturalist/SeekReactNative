// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Platform
} from "react-native";
import inatjs, { FileUpload } from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";
import Realm from "realm";
import PhotoRealm from "../../models/PhotoRealm";

import ChallengeResultsScreen from "./ChallengeResultsScreen";
import LoadingScreen from "../LoadingScreen";
import config from "../../config";
import styles from "../../styles/results";

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

  setTextAndPhoto() {
    const {
      id,
      taxaId,
      score,
      taxaName
    } = this.state;

    if ( score > 85 && id === undefined ) {
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
    }
  }

  savePhotoOrStartOver( buttonText ) {
    const {
      id
    } = this.state;

    const {
      navigation
    } = this.props;

    if ( buttonText === "Add to Collection" ) {
      this.addToCollection();
      navigation.navigate( "Main" );
    } else if ( buttonText === "Start over" ) {
      navigation.navigate( "CameraCapture", { id } );
    } else {
      navigation.navigate( "Main" );
    }
  }

  flattenUploadParameters( uri ) {
    const {
      time,
      latitude, // need to account for null case
      longitude // need to account for null case
    } = this.state;

    const params = {
      image: new FileUpload( {
        uri,
        name: "photo.jpeg",
        type: "image/jpeg"
      } ),
      observed_on: new Date( time * 1000 ).toISOString(),
      latitude,
      longitude
    };

    return params;
  }

  resizeImage() {
    const {
      image
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
        const params = this.flattenUploadParameters( resizedImageUri );
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
        console.log( results, "computer vision results" );
        const match = results[0];
        this.setState( {
          observation: match,
          taxaId: match.taxon.id,
          taxaName: match.taxon.preferred_common_name || match.taxon.name,
          score: match.combined_score,
          matchUrl: match.taxon.default_photo.medium_url,
          loading: false
        }, () => {
          this.setTextAndPhoto();
        } );
      } )
      .catch( ( err ) => {
        console.log( err, "error fetching results from computer vision" );
      } );
  }

  addToCollection() {
    const {
      observation
    } = this.state;

    Realm.open( { schema: [PhotoRealm] } )
      .then( ( realm ) => {
        realm.write( ( ) => {
          let defaultPhoto;
          const p = observation.taxon.default_photo;
          if ( p ) {
            defaultPhoto = realm.create( "PhotoRealm", {
              squareUrl: p.square_url,
              mediumUrl: p.medium_url
            } );
          }
          const taxon = realm.create( "TaxonRealm", {
            id: observation.taxon.id,
            name: observation.taxon.name,
            preferredCommonName: observation.taxon.preferred_common_name,
            iconicTaxonId: observation.taxon.iconic_taxon_id,
            defaultPhoto
          } );
          realm.create( "ObservationRealm", {
            taxon,
            date: new Date( ),
            // fudging some of the required attributes for now
            latitude: 1,
            longitude: 1
          } );
        } );
        console.log( realm, "realm after writing to file");
      }
      ).catch( ( e ) => {
        console.log( "Error adding photos to collection: ", e );
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

    const content = loading ? <LoadingScreen />
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
