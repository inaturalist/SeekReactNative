// @flow

import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import RNFS from "react-native-fs";
import { useNavigation } from "@react-navigation/native";

import { setSpeciesId, setRoute, getTaxonCommonName } from "../../utility/helpers";
import { writeToDebugLog } from "../../utility/photoHelpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
import { dirPictures } from "../../utility/dirStorage";
import SpeciesCard from "../UIComponents/SpeciesCard";
import { useUserPhoto } from "../../utility/customHooks";

type Props = {
  +item: Object,
  +openModal: Function,
  +updateItemScrolledId: Function,
  +itemScrolledId: ?number
}

const ObservationCard = ( {
  item,
  openModal,
  updateItemScrolledId,
  itemScrolledId
}: Props ) => {
  const scrollView = useRef( null );
  const { navigate } = useNavigation();
  // const [photo, setPhoto] = useState( null );
  const [commonName, setCommonName] = useState( null );

  const { taxon, uuidString } = item;
  const {
    id,
    defaultPhoto,
    name,
    iconicTaxonId
  } = taxon;

  const photo = useUserPhoto( uuidString, defaultPhoto );
  console.log( photo, "photo" );

  // componentDidUpdate( prevProps: Object ) {
  //   const { itemScrolledId } = props;

  //   if ( prevProps.itemScrolledId !== itemScrolledId && itemScrolledId !== null ) {
  //     scrollLeft();
  //   }
  // }

  const scrollLeft = () => {
    if ( scrollView.current && itemScrolledId !== item.taxon.id ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, duration: 300
      } );

      updateItemScrolledId( null );
    }
  };

  // const checkForSeekV2Photos = useCallback( () => {
  //   if ( !defaultPhoto ) {
  //     return;
  //   }

  //   const { backupUri, mediumUrl } = defaultPhoto;
  //   if ( backupUri ) {
  //     if ( Platform.OS === "ios" ) {
  //       const uri = backupUri.split( "Pictures/" );
  //       const backupFilepath = `${dirPictures}/${uri[1]}`;
  //       setPhoto( { uri: backupFilepath } );
  //     } else {
  //       writeToDebugLog( backupUri );
  //       RNFS.readFile( backupUri, { encoding: "base64" } ).then( ( encodedData ) => {
  //         setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
  //       } ).catch( ( e ) => console.log( e ) );
  //     }
  //   } else if ( mediumUrl ) {
  //     setPhoto( { uri: mediumUrl } );
  //   }
  // }, [defaultPhoto] );

  // const checkForSeekV1Photos = useCallback( ( seekv1Photos ) => {
  //   const photoPath = `${seekv1Photos}/${uuidString}`;

  //   RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
  //     setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
  //   } ).catch( () => checkForSeekV2Photos() );
  // }, [checkForSeekV2Photos, uuidString] );

  useEffect( () => {
    let isActive = true;

    getTaxonCommonName( id ).then( ( taxonName ) => {
      if ( isActive ) {
        setCommonName( taxonName );
      }
    } );
    return () => { isActive = false; };
  }, [id] );

  // useEffect( () => {
  //   const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
  //   if ( Platform.OS === "ios" && seekv1Photos ) {
  //     checkForSeekV1Photos( seekv1Photos );
  //   } else {
  //     checkForSeekV2Photos();
  //   }
  // }, [checkForSeekV1Photos, checkForSeekV2Photos] );

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
          setSpeciesId( id );
          setRoute( "Observations" );
          navigate( "Species" );
        }}
        iconicTaxonId={iconicTaxonId}
        photo={photo}
        scientificName={name}
      />
      <TouchableOpacity
        onPress={() => openModal(
          id,
          photo,
          commonName,
          name,
          iconicTaxonId
        )}
        style={styles.deleteButton}
      >
        <Image source={icons.delete} />
      </TouchableOpacity>
    </ScrollView>
  );
}

export default ObservationCard;
