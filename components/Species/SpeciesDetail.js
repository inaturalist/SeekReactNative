// @flow

import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useContext
} from "react";
import { ScrollView, Platform, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { Node } from "react";

import { viewStyles } from "../../styles/species/species";
import { checkForInternet } from "../../utility/helpers";
import OnlineSpeciesContainer from "./OnlineSpeciesContainer";
import SpeciesHeader from "./SpeciesHeader";
import OfflineSpeciesContainer from "./OfflineSpeciesContainer";
import SpeciesPhotosLandscape from "./SpeciesPhotosLandscape";
import GreenHeader from "../UIComponents/GreenHeader";
import SpeciesName from "./SpeciesName";
import IconicTaxaName from "./IconicTaxaName";
import { useCommonName, useInternetStatus } from "../../utility/customHooks";
import { AppOrientationContext, SpeciesDetailContext } from "../UserContext";
import { useTaxonDetails } from "./hooks/speciesDetailHooks";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";

const SpeciesDetail = ( ): Node => {
  const internet = useInternetStatus( );
  const { id } = useContext( SpeciesDetailContext );
  const { isLandscape, width } = useContext( AppOrientationContext );
  const columnWidth = width / 3;
  const scrollView = useRef( null );
  const navigation = useNavigation( );
  // not actually using params at the moment
  const { params } = useRoute( );
  const commonName = useCommonName( id );
  const taxonDetails = useTaxonDetails( id );

  const photos = taxonDetails ? taxonDetails.photos : [];
  const taxon = taxonDetails && taxonDetails.taxon;
  const details = taxonDetails && taxonDetails.details;
  const scientificName = taxon && taxon.scientificName;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "ERROR":
        return { ...state, error: "internet" };
      case "NO_ERROR":
        return { ...state, error: null };
      case "CLEAR_SELECTION":
        return {
          ...state,
          selectedText: false
        };
      case "HIGHLIGHT_SELECTION":
        return {
          ...state,
          selectedText: true
        };
      default:
        throw new Error( );
    }
  }, {
    error: internet === false ? "internet" : null,
    selectedText: false
  } );

  const {
    error,
    selectedText
  } = state;

  const clearSelectedText = ( ) => dispatch( { type:"CLEAR_SELECTION" } );
  const highlightSelectedText = useCallback( ( ) => dispatch( { type: "HIGHLIGHT_SELECTION" } ), [] );

  const checkInternetConnection = useCallback( ( ) => {
    checkForInternet( ).then( ( network ) => {
      if ( network === "none" || network === "unknown" ) {
        dispatch( { type: "ERROR" } );
      } else {
        dispatch( { type: "NO_ERROR" } );
      }
    } );
  }, [] );

  const resetScreen = useCallback( ( ) => {
    const scrollToTop = ( ) => {
      if ( scrollView.current ) {
        scrollView.current.scrollTo( {
          x: 0, y: 0, animated: Platform.OS === "android"
        } );
      }
    };

    if ( Platform.OS === "android" ) {
      setTimeout( ( ) => scrollToTop( ), 1 );
      // hacky but this fixes scroll not getting to top of screen
    } else {
      scrollToTop( );
    }
  }, [] );

  useEffect( ( ) => {
    // would be nice to stop refetch when a user goes to range map and back
    // and also wikipedia and back or iNat obs and back
    navigation.addListener( "focus", ( ) => {
      resetScreen( );
    } );
  }, [navigation, resetScreen] );

  const predictions = params ? params.image : null;

  const renderOnlineOrOfflineContent = ( ) => {
    if ( error ) {
      return (
        <OfflineSpeciesContainer
          checkForInternet={checkInternetConnection}
          details={details}
          id={id}
          predictions={predictions}
        />
      );
    }
    if ( taxon && Object.keys( taxon ).length > 0 && !error ) {
      return (
        <OnlineSpeciesContainer
          details={details}
          scientificName={scientificName}
          id={id}
          predictions={predictions}
        />
      );
    }
  };

  const renderPortraitMode = ( ) => (
    <ScrollView
      ref={scrollView}
      contentContainerStyle={[viewStyles.background, error && viewStyles.bottomPadding]}
      onScrollBeginDrag={clearSelectedText}
    >
      <SpeciesHeader
        id={id}
        taxon={taxon}
        photos={photos}
        selectedText={selectedText}
        highlightSelectedText={highlightSelectedText}
      />
      {renderOnlineOrOfflineContent( )}
    </ScrollView>
  );

  const renderLandscapeMode = ( ) => (
    <>
      <GreenHeader plainText={commonName || scientificName} />
      <View style={viewStyles.twoColumnContainer}>
        <View style={{ width: columnWidth }}>
          <SpeciesPhotosLandscape photos={photos} id={id} />
        </View>
        <ScrollView
          ref={scrollView}
          contentContainerStyle={viewStyles.landscapeBackground}
          onScrollBeginDrag={clearSelectedText}
          bounces={false}
        >
          <IconicTaxaName iconicTaxonId={taxon && taxon.iconicTaxonId} />
          <SpeciesName
            id={id}
            taxon={taxon}
            selectedText={selectedText}
            highlightSelectedText={highlightSelectedText}
          />
          {renderOnlineOrOfflineContent( )}
        </ScrollView>
      </View>
    </>
  );

  return (
    <ScrollNoHeader>
      {isLandscape ? renderLandscapeMode( ) : renderPortraitMode( )}
    </ScrollNoHeader>
  );
};

export default SpeciesDetail;
