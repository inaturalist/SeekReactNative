// @flow

import React, { useState, useEffect } from "react";
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

const ObservationCard = ( {
  navigation,
  item,
  toggleDeleteModal,
  updateItemScrolledId,
  itemScrolledId
}: Props ) => {
  const { taxon } = item;

  const [state, setState] = useState( {
    photo: null,
    commonName: null
  } );

  const [value, setValue] = useState( { item } );

  // componentDidUpdate( prevProps ) {
  //   const { itemScrolledId } = this.props;

  //   if ( prevProps.itemScrolledId !== itemScrolledId && itemScrolledId !== null ) {
  //     this.scrollLeft();
  //   }
  // }

  const setPhoto = ( photo ) => {
    setState( { photo } );
  };

  const checkForSeekV2Photos = () => {
    const { defaultPhoto } = taxon;
    const { backupUri, mediumUrl } = defaultPhoto;

    if ( defaultPhoto ) {
      if ( backupUri ) {
        const uri = backupUri.split( "/Pictures/" );
        const backupFilepath = `${dirPictures}/${uri[1]}`;
        RNFS.readFile( backupFilepath, { encoding: "base64" } ).then( ( encodedData ) => {
          setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => setPhoto( { uri: backupFilepath } ) );
      } else if ( mediumUrl ) {
        setPhoto( { uri: mediumUrl } );
      }
    }
  };

  const checkForSeekV1Photos = ( seekv1Photos ) => {
    const photoPath = `${seekv1Photos}/${item.uuidString}`;

    RNFS.stat( photoPath ).then( () => {
      RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
        setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
      } ).catch( () => {
        checkForSeekV2Photos();
      } );
    } ).catch( () => {
      checkForSeekV2Photos();
    } );
  };

  const localizeCommonName = () => {
    getTaxonCommonName( taxon.id ).then( ( commonName ) => {
      console.log( commonName, "common name" );
      if ( commonName ) {
        setState( { commonName } );
      }
    } );
  };

  useEffect( () => {
    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;

    if ( Platform.OS === "ios" && seekv1Photos ) {
      checkForSeekV1Photos( seekv1Photos );
    } else {
      checkForSeekV2Photos();
    }
    localizeCommonName();
  }, [value] );

  // scrollLeft() {
  //   const { item, itemScrolledId } = this.props;

  //   if ( this.scrollView && itemScrolledId !== item.taxon.id ) {
  //     this.scrollView.scrollTo( {
  //       x: 0, y: 0, duration: 300
  //     } );
  //   }
  // }

  return (
    <ScrollView
      // ref={( ref ) => { this.scrollView = ref; }}
      contentContainerStyle={styles.card}
      horizontal
      onScrollBeginDrag={() => updateItemScrolledId( taxon.id )}
      showsHorizontalScrollIndicator={false}
    >
      <SpeciesCard
        commonName={state.commonName}
        handlePress={() => {
          setSpeciesId( taxon.id );
          setRoute( "MyObservations" );
          navigation.navigate( "Species", { ...navigation.state.params } );
        }}
        iconicTaxonId={taxon.iconicTaxonId}
        photo={state.photo}
        scientificName={taxon.name}
      />
      {/* <TouchableOpacity
        onPress={() => toggleDeleteModal(
          item.taxon.id,
          state.photo,
          state.commonName,
          taxon.name,
          taxon.iconicTaxonId
        )}
        style={styles.deleteButton}
      >
        <Image source={icons.delete} />
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default ObservationCard;
