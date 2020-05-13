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

  const photo = {};

  // const photo = useUserPhoto( uuidString, defaultPhoto );
  // console.log( typeof photo, "photo" );

  // componentDidUpdate( prevProps: Object ) {
  //   const { itemScrolledId } = props;

  //   if ( prevProps.itemScrolledId !== itemScrolledId && itemScrolledId !== null ) {
  //     scrollLeft();
  //   }
  // }

  // useEffect( () => {
  //   console.log( itemScrolledId, id, "ids" );
  //   const scrollLeft = () => {
  //     if ( scrollView.current && itemScrolledId !== id ) {
  //       scrollView.current.scrollTo( {
  //         x: 0, y: 0, duration: 300
  //       } );
  //       updateItemScrolledId( null );
  //     }
  //   };

  //   if ( itemScrolledId ) {
  //     scrollLeft();
  //   }
  // }, [itemScrolledId, id, updateItemScrolledId] );

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
