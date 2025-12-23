import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { Image, Pressable, ScrollView, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { setRoute, StoredRoutes } from "../../utility/helpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
import SpeciesCard from "../UIComponents/SpeciesCard";
import { useUserPhoto } from "../../utility/customHooks/useUserPhoto";
import { useSpeciesDetail } from "../Providers/SpeciesDetailProvider";

type Taxon = {
  id: number;
  iconicTaxonId?: number | undefined;
  preferredCommonName?: string | undefined;
  name: string;
  defaultPhoto?: {
    backupUri?: string,
    mediumUrl?: string,
    lastUpdated?: Date;
  }
};
interface Props {
  readonly item: {
    taxon: Taxon;
    photo: string;
  };
  readonly openModal: ( photo: { uri: string; }, taxon: Taxon ) => void;
  readonly updateItemScrolledId: ( id: number | null ) => void;
  readonly itemScrolledId: number | null;
  readonly toAnimate: boolean;
  readonly hasAnimated: boolean;
  readonly setHasAnimated: ( hasAnimated: boolean ) => void;
}

const ObservationCard = ( {
  item,
  openModal,
  updateItemScrolledId,
  itemScrolledId,
  toAnimate,
  hasAnimated,
  setHasAnimated,
}: Props ) => {
  const { setId } = useSpeciesDetail( );
  const scrollView = useRef<ScrollView>( null );
  const { navigate } = useNavigation( );
  const animation = useMemo( ( ) => new Animated.Value( -0 ), [] );

  const { taxon } = item;
  const { id } = taxon;

  const photo = useUserPhoto( item );

  useEffect( ( ) => {
    const scrollLeft = ( ) => {
      if ( scrollView.current ) {
        scrollView.current.scrollTo( {
          x: 0, y: 0, duration: 300,
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
    setId( id );
    setRoute( StoredRoutes.Observations );
    navigate( "Species" );
  };

  const handleHorizontalScroll = ( ) => updateItemScrolledId( id );

  const animate = useCallback( ( ) => {
    const entrance = {
      toValue: -( 73 + 24 ),
      duration: 200,
      useNativeDriver: true,
    };

    const exit = {
      toValue: 0,
      delay: 2000,
      duration: 200,
      useNativeDriver: true,
    };

    Animated.sequence( [
      Animated.timing( animation, entrance ),
      Animated.timing( animation, exit ),
    ] ).start( );
  }, [animation] );

  useEffect( ( ) => {
    if ( toAnimate && !hasAnimated ) {
      animate( );
      setHasAnimated( true );
    }
  },[toAnimate, animate, hasAnimated, setHasAnimated] );

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
        <Pressable
          onPress={handleDeletePress}
          style={styles.deleteButton}
        >
          <Image source={icons.delete} />
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
};

export default ObservationCard;
