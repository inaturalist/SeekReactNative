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

import styles from "../../styles/menu/observations";
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
    this.selectPhoto();
  }

  setPhoto( photo ) {
    this.setState( { photo } );
  }

  selectPhoto() {
    const { item } = this.props;
    const { taxon } = item;
    const { defaultPhoto } = taxon;

    if ( Platform.OS === "ios" && `${RNFS.DocumentDirectoryPath}/large` ) {
      RNFS.readdir( `${RNFS.DocumentDirectoryPath}/large` ).then( ( result ) => {
        result.forEach( ( path ) => {
          if ( path === item.uuidString ) {
            const photoPath = `${RNFS.DocumentDirectoryPath}/large/${path}`;
            this.setPhoto( { uri: photoPath } );
          } else if ( defaultPhoto ) {
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
        } );
      } );
    }
  }

  render() {
    const { navigation, item } = this.props;
    const { photo } = this.state;
    const { taxon } = item;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={ () => navigation.push( "Species", {
          id: taxon.id,
          commonName: taxon.preferredCommonName,
          scientificName: taxon.name
        } )}
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
