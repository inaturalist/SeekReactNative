// @flow

import React, { useCallback, useContext, useState } from "react";
import { Text, BackHandler, Pressable, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";
import type { Node } from "react";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import SpeciesPhotos from "./SpeciesPhotos";
import { viewStyles, textStyles } from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks";
import { getRoute } from "../../utility/helpers";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import { resetRouter } from "../../utility/navigationHelpers";
import { UserContext } from "../UserContext";
import ToastAnimation from "../UIComponents/ToastAnimation";
import { colors } from "../../styles/global";

type Props = {
  photos: Array<Object>,
  taxon: Object,
  id: number,
  selectedText: boolean,
  highlightSelectedText: ( ) => void
}

const SpeciesHeader = ( { photos, taxon, id, selectedText, highlightSelectedText }: Props ): Node => {
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const commonName = useCommonName( id );
  const [copied, setCopied] = useState( false );

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
    highlightSelectedText( );
  };

  const finishAnimation = ( ) => setCopied( false );

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
            {copied && (
              <ToastAnimation
                startAnimation={copied}
                styles={viewStyles.copiedAnimation}
                toastText={i18n.t( "species_detail.copied" )}
                finishAnimation={finishAnimation}
                rectangleColor={colors.seekTeal}
              />
            )}
            <Text
              style={[
                textStyles.scientificNameText,
                selectedText && viewStyles.selectedPressableArea
              ]}
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
