// @flow

import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import RNFS from "react-native-fs";
import { withNavigation } from "react-navigation";

import { setSpeciesId, setRoute, getTaxonCommonName } from "../../utility/helpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
import { dirPictures } from "../../utility/dirStorage";
import SpeciesCard from "../UIComponents/SpeciesCard";

type Props = {
  +navigation: any,
  +item: Object,
  +openModal: Function,
  +updateItemScrolledId: Function,
  +itemScrolledId: ?number
}

const ObservationCard = ( {
  navigation,
  item,
  openModal,
  updateItemScrolledId,
  itemScrolledId
}: Props ) => {
  const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
  const scrollView = useRef( null );
  const [photo, setPhoto] = useState( null );
  const [commonName, setCommonName] = useState( null );

  const { taxon } = item;
  const { defaultPhoto } = taxon;
  const { backupUri, mediumUrl } = taxon.defaultPhoto;

  const checkForSeekV2Photos = () => {
    if ( !defaultPhoto ) {
      return;
    }

    if ( backupUri ) {
      const uri = backupUri.split( "/Pictures/" );
      const backupFilepath = `${dirPictures}/${uri[1]}`;
      console.log( uri[1], "filepath" );
      console.log( mediumUrl, "medium url" );
      RNFS.readFile( backupFilepath, { encoding: "base64" } ).then( ( encodedData ) => {
        setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
      } ).catch( () => setPhoto( { uri: backupFilepath } ) );
    } else if ( mediumUrl ) {
      setPhoto( { uri: mediumUrl } );
    }
  };

  const checkForSeekV1Photos = () => {
    const photoPath = `${seekv1Photos}/${item.uuidString}`;

    // RNFS.stat( photoPath ).then( () => {
    RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
      setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
    } ).catch( () => {
      checkForSeekV2Photos();
    } );
    // } ).catch( () => {
    //   checkForSeekV2Photos();
    // } );
  };


  const localizeCommonName = () => {
    getTaxonCommonName( taxon.id ).then( ( name ) => {
      if ( name ) {
        setCommonName( name );
      }
    } );
  };

  const scrollLeft = () => {
    if ( ( scrollView && scrollView.current !== null ) && ( itemScrolledId !== taxon.id ) ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, duration: 300
      } );

      updateItemScrolledId( null );
    }
  };

  useEffect( () => {
    // console.log( item, "item" );
    if ( Platform.OS === "ios" && seekv1Photos ) {
      checkForSeekV1Photos();
    } else {
      checkForSeekV2Photos();
    }
    localizeCommonName();

    if ( itemScrolledId !== null ) {
      scrollLeft();
    }
  }, [item, itemScrolledId] );

  return (
    <ScrollView
      ref={scrollView}
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
          navigation.navigate( "Species" );
        }}
        iconicTaxonId={taxon.iconicTaxonId}
        photo={photo}
        scientificName={taxon.name}
      />
      <TouchableOpacity
        onPress={() => openModal(
          taxon.id,
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
};

export default withNavigation( ObservationCard );
