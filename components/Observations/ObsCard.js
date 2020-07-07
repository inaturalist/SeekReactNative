// @flow

import React, {
  useState,
  useRef,
  useEffect
} from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { setSpeciesId, setRoute, getTaxonCommonName } from "../../utility/helpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
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
  const isFocused = useIsFocused();
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

  useEffect( () => {
    const scrollLeft = () => {
      if ( scrollView.current ) {
        scrollView.current.scrollTo( {
          x: 0, y: 0, duration: 300
        } );
      }
    };

    if ( isFocused ) {
      if ( itemScrolledId && itemScrolledId !== id ) {
        updateItemScrolledId( null );
        scrollLeft();
      }
    }
  }, [updateItemScrolledId, id, itemScrolledId, isFocused] );

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
      onScrollBeginDrag={() => updateItemScrolledId( id )}
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
};

export default ObservationCard;
