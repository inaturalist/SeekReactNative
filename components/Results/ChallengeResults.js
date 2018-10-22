// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Platform,
  Text,
  TouchableHighlight
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";

import LoadingScreen from "../LoadingScreen";
import config from "../../config";
import styles from "../../styles/results";

// inatjs.setConfig( { apiURL: "https://stagingapi.inaturalist.org/v1" } );

type Props = {
  navigation: any
}

class ChallengeResults extends Component {
  constructor( { navigation }: Props ) {
    super();

    const {
      image,
      time,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      title: null,
      subtitle: null,
      loading: true,
      buttonText: "Add to collection",
      image,
      time,
      latitude,
      longitude
    };
  }

  componentDidMount() {
    this.resizeImage();
  }

  flattenUploadParameters( uri ) {
    const {
      time,
      latitude, // need to account for null case
      longitude // need to account for null case
    } = this.state;

    const UploadParams = class UploadParams {
      constructor( attrs ) {
        Object.assign( this, attrs );
      }
    };

    const params = {
      image: new UploadParams( {
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
        console.log(results, 'computer vision results');
        const match = results[0];
        this.setState( {
          taxaName: match.taxon.preferred_common_name || match.taxon.name,
          score: match.combined_score,
          loading: false
        }, () => {
          this.setTitle();
          this.setSubtitle();
        } );
      } )
      .catch( ( err ) => {
        console.log(err, 'error fetching results from computer vision');
      } );
  }

  setTitle() {
    const {
      score
    } = this.state;

    if ( score > 85 ) {
      this.setState( {
        title: "Sweet!"
      } );
    } else {
      this.setState( {
        title: "Hrmmmmm"
      } );
    }
  }

  setSubtitle() {
    const {
      score,
      taxaName
    } = this.state;

    if ( score > 85 ) {
      this.setState( {
        subtitle: `You saw a ${taxaName}`
      } );
    } else {
      this.setState( {
        subtitle: "We can't figure this one out. Please try some adjustments."
      } );
    }
  }

  renderResult() {
    const { title, subtitle, buttonText } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.text}>{subtitle}</Text>
        </View>
        <View>
          <TouchableHighlight style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => console.log( "pressed button" )}
            >
              {buttonText}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    const { loading } = this.state;

    const content = loading ? <LoadingScreen /> : this.renderResult();

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
