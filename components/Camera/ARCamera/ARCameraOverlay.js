// @flow

import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/camera/arCameraOverlay";
import icons from "../../../assets/icons";
import { setCameraHelpText } from "../../../utility/textHelpers";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import ARCameraHeader from "./ARCameraHeader";
import GreenRectangle from "../../UIComponents/GreenRectangle";
import { colors } from "../../../styles/global";
import { useFetchUserSettings } from "../../../utility/customHooks";
import ToastAnimation from "../../UIComponents/ToastAnimation";
import { AppOrientationContext } from "../../UserContext";

type Props = {
  takePicture: Function,
  ranks: Object,
  pictureTaken: boolean,
  cameraLoaded: boolean,
  filterByTaxonId: Function
}

const isAndroid = Platform.OS === "android";

const ARCameraOverlay = ( {
  takePicture,
  ranks,
  pictureTaken,
  cameraLoaded,
  filterByTaxonId
}: Props ): Node => {
  const { isLandscape, height } = useContext( AppOrientationContext );
  const { navigate } = useNavigation( );
  const rankToRender = Object.keys( ranks )[0] || null;
  const helpText = setCameraHelpText( rankToRender );
  const userSettings = useFetchUserSettings( );
  const autoCapture = userSettings?.autoCapture;
  const [filterIndex, setFilterIndex] = useState( null );

  const shutterButtonPositionLandscape = height / 2 - 65 - 31;
  const helpButtonPositionLandscape = height / 2 + 50;

  const settings = useMemo( ( ) => ( [
    {
      negativeFilter: true,
      taxonId: null,
      text: i18n.t( "camera.filters_off" ),
      icon: icons.plantFilterOff,
      color: colors.cameraFilterGray
    },
    {
      negativeFilter: false,
      taxonId: "47126",
      text: i18n.t( "camera.plant_filter" ),
      icon: icons.plantsFilter,
      color: null
    },
    {
      negativeFilter: true,
      taxonId: "47126",
      text: i18n.t( "camera.non_plant_filter" ),
      icon: icons.nonPlantsFilter,
      color: colors.seekTeal
    }
  ] ), [] );

  const toggleFilterIndex = ( ) => {
    if ( filterIndex === null ) {
      setFilterIndex( 1 );
    } else if ( filterIndex < 2 ) {
      setFilterIndex( filterIndex + 1 );
    } else {
      setFilterIndex( 0 );
    }
  };

  useEffect( ( ) => {
    let isCurrent = true;
    if ( filterIndex && isCurrent ) {
      filterByTaxonId( settings[filterIndex].taxonId, settings[filterIndex].negativeFilter );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [filterIndex, filterByTaxonId, settings] );

  useEffect( ( ) => {
    let isCurrent = true;
    if ( rankToRender === "species" && autoCapture && isCurrent ) {
      takePicture( );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [rankToRender, takePicture, autoCapture] );

  const showFilterText = ( ) => {
    if ( filterIndex === 0 || filterIndex === null ) {
      return;
    }

    return (
      <View style={viewStyles.plantFilter}>
        <GreenRectangle text={settings[filterIndex].text} color={settings[filterIndex].color} />
      </View>
    );
  };

  const showCameraHelp = ( ) => navigate( "CameraHelp" );

  const setTaxonomicRankColorStyles = ( ) => {
    if ( isLandscape ) {
      if ( rankToRender === "species" ) {
        return [viewStyles.landscapeHelpBubble, viewStyles.landscapeHelpBubbleSpecies];
      } else {
        return viewStyles.landscapeHelpBubble;
      }
    }
    return viewStyles.helpBubble;
  };

  return (
    <>
      {( pictureTaken || !cameraLoaded ) && <LoadingWheel color="white" />}
      <ARCameraHeader ranks={ranks} />
      {isAndroid && showFilterText( )}
      {( isAndroid && filterIndex === 0 ) && (
        <ToastAnimation
          startAnimation={filterIndex === 0}
          styles={viewStyles.plantFilter}
          toastText={settings[filterIndex].text}
          rectangleColor={settings[filterIndex].color}
        />
      )}
      <View style={setTaxonomicRankColorStyles( )}>
        <Text style={[textStyles.scanText, !isLandscape && textStyles.textShadow]}>{helpText}</Text>
      </View>
      {isAndroid && (
        <TouchableOpacity
          accessibilityLabel={filterIndex ? settings[filterIndex].text : settings[0].text}
          accessible
          onPress={toggleFilterIndex}
          style={viewStyles.plantFilterSettings}
        >
          <Image source={filterIndex ? settings[filterIndex].icon : settings[0].icon} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.take_photo" )}
        accessible
        testID="takePhotoButton"
        onPress={takePicture}
        style={[
          viewStyles.shutter,
          viewStyles.shadow,
          isLandscape && viewStyles.landscapeShutter,
          isLandscape && { bottom: shutterButtonPositionLandscape }
        ]}
        disabled={pictureTaken}
      >
        <Image source={ranks && ranks.species ? icons.arCameraGreen : icons.arCameraButton} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.open_help" )}
        accessible
        onPress={showCameraHelp}
        style={[
          viewStyles.help,
          isLandscape && viewStyles.landscapeHelp,
          isLandscape && { bottom: helpButtonPositionLandscape }
        ]}
      >
        <Image source={icons.cameraHelp} />
      </TouchableOpacity>
    </>
  );
};

export default ARCameraOverlay;
