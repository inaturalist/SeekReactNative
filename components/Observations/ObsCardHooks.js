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
  const [commonName, setCommonName] = useState( null );

  const { taxon } = item;
  const {
    id,
    name,
    iconicTaxonId
  } = taxon;

  const photo = useUserPhoto( item );

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
