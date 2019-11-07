// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import RNFS from "react-native-fs";

import { setSpeciesId, setRoute, getTaxonCommonName } from "../../utility/helpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
import { dirPictures } from "../../utility/dirStorage";
import SpeciesCard from "../UIComponents/SpeciesCard";

type Props = {
  +navigation: any,
  +item: Object,
  +toggleDeleteModal: Function,
  +updateItemScrolledId: Function,
  +itemScrolledId: Number
}

class ObservationCard extends Component<Props> {
  constructor() {
    super();

    this.state = {
      photo: null,
      commonName: null
    };
  }

  componentDidMount() {
    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
    if ( Platform.OS === "ios" && seekv1Photos ) {
      this.checkForSeekV1Photos( seekv1Photos );
    } else {
      this.checkForSeekV2Photos();
    }
    this.localizeCommonName();
  }

  componentDidUpdate( prevProps ) {
    const { itemScrolledId } = this.props;

    if ( prevProps.itemScrolledId !== itemScrolledId && itemScrolledId !== null ) {
      this.scrollLeft();
    }
  }

  setPhoto( photo ) {
    this.setState( { photo } );
  }

  checkForSeekV1Photos( seekv1Photos ) {
    const { item } = this.props;

    const photoPath = `${seekv1Photos}/${item.uuidString}`;

    RNFS.stat( photoPath ).then( () => {
      RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
        this.setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
      } ).catch( () => {
        this.checkForSeekV2Photos();
      } );
    } ).catch( () => {
      this.checkForSeekV2Photos();
    } );
  }

  checkForSeekV2Photos() {
    const { item } = this.props;
    const { defaultPhoto } = item.taxon;
    const { backupUri, mediumUrl } = item.taxon.defaultPhoto;

    if ( defaultPhoto ) {
      if ( backupUri ) {
        const uri = backupUri.split( "/Pictures/" );
        const backupFilepath = `${dirPictures}/${uri[1]}`;
        RNFS.readFile( backupFilepath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => this.setPhoto( { uri: backupFilepath } ) );
      } else if ( mediumUrl ) {
        this.setPhoto( { uri: mediumUrl } );
      }
    }
  }

  localizeCommonName() {
    const { item } = this.props;

    getTaxonCommonName( item.taxon.id ).then( ( commonName ) => {
      if ( commonName ) {
        this.setState( { commonName } );
      }
    } );
  }

  scrollLeft() {
    const { item, itemScrolledId } = this.props;

    if ( this.scrollView && itemScrolledId !== item.taxon.id ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, duration: 300
      } );
    }
  }

  render() {
    const {
      navigation,
      item,
      toggleDeleteModal,
      updateItemScrolledId
    } = this.props;
    const { photo, commonName } = this.state;
    const { taxon } = item;

    return (
      <ScrollView
        ref={( ref ) => { this.scrollView = ref; }}
        contentContainerStyle={styles.card}
        horizontal
        onScrollBeginDrag={() => updateItemScrolledId( taxon.id )}
        showsHorizontalScrollIndicator={false}
      >
        <SpeciesCard
          commonName={commonName}
          handlePress={() => {
            setSpeciesId( taxon.id );
            setRoute( "MyObservations" );
            navigation.navigate( "Species", { ...navigation.state.params } );
          }}
          iconicTaxonId={taxon.iconicTaxonId}
          photo={photo}
          scientificName={taxon.name}
        />
        <TouchableOpacity
          onPress={() => toggleDeleteModal(
            item.taxon.id,
            photo,
            commonName,
            taxon.name,
            taxon.iconicTaxonId
          )}
          style={styles.deleteButton}
        >
          <Image source={icons.delete} />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default ObservationCard;
