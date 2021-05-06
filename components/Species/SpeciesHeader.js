import React, { useCallback, useContext, useRef, useEffect, useState } from "react";
import { Text, BackHandler, Pressable, Animated, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import SpeciesPhotos from "./SpeciesPhotos";
import { viewStyles, textStyles } from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks";
import { getRoute } from "../../utility/helpers";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import { resetRouter } from "../../utility/navigationHelpers";
import { UserContext } from "../UserContext";
import GreenRectangle from "../UIComponents/GreenRectangle";

type Props = {
  photos: Array<Object>,
  taxon: Object,
  id: number
}

const SpeciesHeader = ( { photos, taxon, id }: Props ) => {
  const fadeOut = useRef( new Animated.Value( 0 ) ).current;
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const commonName = useCommonName( id );
  const [copied, setCopied] = useState( false );
  const [textWidth, setTextWidth] = useState( 0 );

  const disabled = !login;

  const { scientificName, iconicTaxonId } = taxon;

  const backAction = useCallback( async ( ) => {
    const routeName = await getRoute( );
    // odd behavior at the moment -> if a user clicks through 4 species screens
    // and the last one was Great Egret, they will reload the Great Egret Species Details 4x before getting back
    // to the previous screen
    if ( routeName ) {
      // ChallengeDetails, Observations, Home, or Match
      navigation.goBack( );
    } else {
      resetRouter( navigation );
    }
  }, [navigation] );

  useFocusEffect(
    useCallback( ( ) => {
      const onBackPress = ( ) => {
        backAction( );
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [backAction] )
  );

  const copyToClipboard = ( ) => {
    Clipboard.setString( scientificName );
    setCopied( true );
  };

  useEffect( ( ) => {
    let isCurrent = true;
    const entrance = {
      toValue: 1,
      duration: 0,
      useNativeDriver: true
    };

    const exit = {
      toValue: 0,
      delay: 1000,
      duration: 200,
      useNativeDriver: true
    };

    if ( copied && isCurrent && textWidth > 0 ) {
      Animated.sequence( [
        Animated.timing( fadeOut, entrance ),
        Animated.timing( fadeOut, exit )
      ] ).start( ( { finished } ) => {
        if ( finished ) {
          setCopied( false );
        }
      } );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [fadeOut, copied, textWidth] );

  const showAnimation = ( ) => (
    <Animated.View style={[viewStyles.copiedAnimation, { opacity: fadeOut, left: ( textWidth / 2 ) - 40 }]}>
      <GreenRectangle text={i18n.t( "species_detail.copied" )} />
    </Animated.View>
  );

  const setScientificNameTextWidth = ( { nativeEvent } ) => {
    if ( textWidth === 0 && nativeEvent.layout.width < 300 ) {
      setTextWidth( nativeEvent.layout.width );
    }
  };

  return (
    <>
      <CustomBackArrow handlePress={backAction} style={viewStyles.backButton} />
      <SpeciesPhotos photos={photos} id={id} />
      {iconicTaxonId && (
        <Text style={textStyles.iconicTaxaText}>
          {i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase()}
        </Text>
      )}
      <Text style={textStyles.commonNameText}>{commonName || scientificName}</Text>
      <Pressable
        onPress={copyToClipboard}
        disabled={disabled}
        style={viewStyles.pressableArea}
      >
        {( { pressed } ) => (
          <View>
            {copied && showAnimation( )}
            <Text
              style={[textStyles.scientificNameText, pressed && viewStyles.selectedPressableArea]}
              onLayout={setScientificNameTextWidth}
            >
              {scientificName}
            </Text>
          </View>
        )}
      </Pressable>
    </>
  );
};

export default SpeciesHeader;
