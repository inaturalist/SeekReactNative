// @flow

import React, { Component } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import RNFS from "react-native-fs";

import { setSpeciesId, setRoute } from "../../utility/helpers";
import styles from "../../styles/observations";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  navigation: any,
  item: Object
}

class ObservationCard extends Component<Props> {
  constructor() {
    super();

    this.state = {
      photo: null
    };
  }

  componentWillMount() {
    this.checkForSeekV1Photos();
  }

  setPhoto( photo ) {
    this.setState( { photo } );
  }

  checkForSeekV1Photos() {
    const { item } = this.props;

    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;

    if ( Platform.OS === "ios" && seekv1Photos ) {
      const photoPath = `${seekv1Photos}/${item.uuidString}`;
      if ( !RNFS.exists( photoPath ) ) {
        this.checkForSeekV2Photos( item );
      } else {
        RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => {
          this.checkForSeekV2Photos( item );
        } );
      }
    } else {
      this.checkForSeekV2Photos( item );
    }
  }

  checkForSeekV2Photos( item ) {
    const { taxon } = item;
    const { defaultPhoto } = taxon;

    if ( defaultPhoto ) {
      if ( defaultPhoto.mediumUrl ) {
        this.setPhoto( { uri: defaultPhoto.mediumUrl } );
      } else if ( defaultPhoto.squareUrl ) {
        this.setPhoto( { uri: defaultPhoto.squareUrl } );
      } else {
        this.setPhoto( iconicTaxa[taxon.iconicTaxonId] );
      }
    } else {
      this.setPhoto( iconicTaxa[taxon.iconicTaxonId] );
    }
  }

  render() {
    const { navigation, item } = this.props;
    const { photo } = this.state;
    const { taxon } = item;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setSpeciesId( item.taxon.id );
          setRoute( "MyObservations" );
          navigation.navigate( "Species" );
        }}
      >
        <Image style={styles.image} source={photo} />
        <View style={styles.speciesNameContainer}>
          <Text style={styles.commonNameText}>
            {taxon.preferredCommonName ? taxon.preferredCommonName : taxon.name}
          </Text>
          <Text style={styles.scientificNameText}>{taxon.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ObservationCard;
