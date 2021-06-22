// @flow

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { Image, TouchableOpacity, ScrollView, Animated, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { setSpeciesId, setRoute } from "../../utility/helpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
import SpeciesCard from "../UIComponents/SpeciesCard";
import { useUserPhoto } from "../../utility/customHooks";
import { dimensions } from "../../styles/global";

type Props = {
  item: Object,
  openModal: ( Object, Object ) => void,
  updateItemScrolledId: ( ?number ) => void,
  itemScrolledId: ?number,
  sectionId: number,
  index: number
}

const ObservationCard = ( {
  item,
  openModal,
  updateItemScrolledId,
  itemScrolledId,
  sectionId,
  index
}: Props ): Node => {
  const scrollView = useRef( null );
  const { navigate } = useNavigation( );
  const animation = useMemo( ( ) => new Animated.Value( -0 ), [] );

  const { taxon } = item;
  const { id } = taxon;

  const photo = useUserPhoto( item );

  useEffect( ( ) => {
    const scrollLeft = ( ) => {
      if ( scrollView.current ) {
        scrollView.current.scrollTo( {
          x: 0, y: 0, duration: 300
        } );
      }
    };

    if ( itemScrolledId && itemScrolledId !== id ) {
      updateItemScrolledId( null );
      scrollLeft();
    }
  }, [updateItemScrolledId, id, itemScrolledId] );

  const handleDeletePress = ( ) => openModal( photo, taxon );

  const handleSpeciesCardPress = ( ) => {
    setSpeciesId( id );
    setRoute( "Observations" );
    navigate( "Species" );
  };

  const handleHorizontalScroll = ( ) => updateItemScrolledId( id );

  const animate = useCallback( ( ) => {
    const entrance = {
      toValue: -( 73 + 24 ),
      duration: 200,
      useNativeDriver: true
    };

    const exit = {
      toValue: 0,
      delay: 2000,
      duration: 200,
      useNativeDriver: true
    };

    Animated.sequence( [
      Animated.timing( animation, entrance ),
      Animated.timing( animation, exit )
    ] ).start( );
  }, [animation] );

  useEffect( ( ) => {
    if ( index === 0 && sectionId === 47126 ) {
      animate( );
    }
  },[index, sectionId, animate] );

  return (
    <ScrollView
      ref={scrollView}
      contentContainerStyle={styles.card}
      horizontal
      onScrollBeginDrag={handleHorizontalScroll}
      showsHorizontalScrollIndicator={false}
    >
      <Animated.View style={[styles.row, { transform: [{ translateX: animation }] }]}>
        <SpeciesCard
          taxon={taxon}
          handlePress={handleSpeciesCardPress}
          photo={photo}
        />
      <TouchableOpacity
        onPress={handleDeletePress}
        style={styles.deleteButton}
      >
        <Image source={icons.delete} />
      </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default ObservationCard;
