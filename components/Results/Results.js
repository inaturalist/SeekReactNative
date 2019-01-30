// @flow

import React, { Component } from "react";
import {
  View,
  Platform
} from "react-native";
import inatjs from "inaturalistjs";
import jwt from "react-native-jwt-io";
import ImageResizer from "react-native-image-resizer";
import Realm from "realm";
import moment from "moment";
import { NavigationEvents } from "react-navigation";

import realmConfig from "../../models";
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
import { recalculateBadges } from "../../utility/badgeHelpers";

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
      longitude
    } = navigation.state.params;

    this.state = {
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
      showBanner: true
    };
  }

  setImageUri( uri ) {
    this.setState( { userImage: uri } );
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
        let userImage;
        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          userImage = uriParts[uriParts.length - 1];
          this.setImageUri( userImage );
        } else {
          userImage = uri;
          this.setImageUri( userImage );
        }
        const params = flattenUploadParameters( userImage, time, latitude, longitude );
        this.fetchScore( params );
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
        this.setState( {
          observation: match,
          taxaId: match.taxon.id,
          taxaName: capitalizeNames( match.taxon.preferred_common_name || match.taxon.name ),
          speciesSeenImage: match.taxon.default_photo.medium_url,
          commonAncestor: commonAncestor ? commonAncestor.taxon.name : null
        }, () => {
          this.checkForMatch( match.combined_score );
          this.checkDateSpeciesSeen( match.taxon.id );
        } );
      } )
      .catch( ( err ) => {
        console.log( err, "error fetching computer vision results" );
      } );
  }

  async checkForMatch( score ) {
    const {
      latitude,
      longitude,
      observation,
      image
    } = this.state;

    if ( score > 97 ) {
      this.setState( { match: true } );
      if ( !latitude || !longitude ) {
        const location = await getLatAndLng();
        await addToCollection( observation, location.latitude, location.longitude, image );
        this.checkForNewBadges();
      } else {
        await addToCollection( observation, latitude, longitude, image );
        this.checkForNewBadges();
      }
    } else {
      this.setState( { match: false } );
    }
  }

  checkDateSpeciesSeen( taxaId ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const seenTaxaIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        if ( seenTaxaIds.includes( taxaId ) ) {
          const observations = realm.objects( "ObservationRealm" );
          const seenTaxa = observations.filtered( `taxon.id == ${taxaId}` );
          const seenDate = moment( seenTaxa[0].date ).format( "ll" );
          this.setState( {
            seenDate
          } );
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  checkForNewBadges() {
    const badgeEarned = recalculateBadges();
    console.log( badgeEarned, "badge earned in results" );
    if ( badgeEarned ) {
      this.setState( {
        showBanner: true
      } );
    }
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
      showBanner
    } = this.state;
    const { navigation } = this.props;

    let resultScreen;

    if ( match && taxaName ) {
      resultScreen = (
        <MatchScreen
          navigation={navigation}
          userImage={userImage}
          taxaName={taxaName}
          taxaId={taxaId}
          speciesSeenImage={speciesSeenImage}
          seenDate={seenDate}
          showBanner={showBanner}
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
          onWillFocus={() => this.resizeImage()}
        />
        {resultScreen}
      </View>
    );
  }
}

export default Results;
