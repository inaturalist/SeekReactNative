// @flow

import React, { Component } from "react";
import { View } from "react-native";
import inatjs from "inaturalistjs";
import Realm from "realm";
import moment from "moment";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import realmConfig from "../../models";
import ErrorScreen from "./Error";
import ConfirmScreen from "./ConfirmScreen";
import styles from "../../styles/results/results";
import {
  addToCollection,
  capitalizeNames,
  getTaxonCommonName
} from "../../utility/helpers";
import { fetchTruncatedUserLocation, createLocationPermissionsAlert } from "../../utility/locationHelpers";
import { checkNumberOfBadgesEarned } from "../../utility/badgeHelpers";
import { checkNumberOfChallengesCompleted } from "../../utility/challengeHelpers";
import { resizeImage } from "../../utility/photoHelpers";

type Props = {
  navigation: any
}

class ARCameraResults extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      image,
      time,
      predictions
    } = navigation.state.params;

    this.state = {
      threshold: 0.7,
      predictions,
      image,
      time,
      latitude: null,
      longitude: null,
      userImage: null,
      speciesSeenImage: null,
      observation: null,
      taxaId: null,
      taxaName: null,
      commonAncestor: null,
      seenDate: null,
      error: null,
      scientificName: null,
      imageForUploading: null
    };
  }

  getLocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.setState( {
          latitude,
          longitude
        } );
      } else {
        createLocationPermissionsAlert();
      }
    } );
  }

  setImageForUploading( imageForUploading ) {
    this.setState( { imageForUploading } );
  }

  setImageUri( uri ) {
    this.setState( { userImage: uri }, () => this.setARCameraVisionResults() );
  }

  setSeenDate( seenDate ) {
    this.setState( { seenDate } );
  }

  setError( error ) {
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

  async showMatch() {
    const { seenDate } = this.state;

    if ( !seenDate ) {
      await this.addObservation();
      this.navigateTo( "Match" );
    } else {
      this.navigateTo( "NoMatchScreen" );
    }
  }

  showNoMatch() {
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

    resizeImage( image.uri, 299 ).then( ( userImage ) => {
      if ( userImage ) {
        this.setImageUri( userImage );
      } else {
        this.setError( "image" );
      }
    } ).catch( () => this.setError( "image" ) );
  }

  resizeImageForUploading() {
    const { image } = this.state;

    resizeImage( image.uri, 2048 ).then( ( userImage ) => {
      if ( userImage ) {
        this.setImageForUploading( userImage );
      } else {
        this.setError( "image" );
      }
    } ).catch( () => this.setError( "image" ) );
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
      scientificName,
      latitude,
      longitude,
      time,
      commonAncestor,
      postingSuccess
    } );
  }

  render() {
    const { error, imageForUploading } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.getLocation();
            this.resizeImage();
            this.resizeImageForUploading();
            checkNumberOfBadgesEarned();
            checkNumberOfChallengesCompleted();
          }}
        />
        {error ? <ErrorScreen error={error} navigation={navigation} /> : null}
        {error
          ? <ErrorScreen error={error} navigation={navigation} />
          : (
            <ConfirmScreen
              image={imageForUploading}
              match={null}
              navigation={navigation}
              clicked
            />
          )}
      </View>
    );
  }
}

export default ARCameraResults;
