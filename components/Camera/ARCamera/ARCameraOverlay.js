// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";
import { isLandscape } from "react-native-device-info";

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

type Props = {
  takePicture: Function,
  ranks: Object,
  pictureTaken: boolean,
  cameraLoaded: boolean,
  filterByTaxonId: Function
}

const settings = [
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
];

const isAndroid = Platform.OS === "android";

const ARCameraOverlay = ( {
  takePicture,
  ranks,
  pictureTaken,
  cameraLoaded,
  filterByTaxonId
}: Props ): Node => {
  const { navigate } = useNavigation( );
  const rankToRender = Object.keys( ranks )[0] || null;
  const helpText = setCameraHelpText( rankToRender );
  const { autoCapture } = useFetchUserSettings( );
  const [filterIndex, setFilterIndex] = useState( null );

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
  }, [filterIndex, filterByTaxonId] );

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
      <Text style={textStyles.scanText}>{helpText}</Text>
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
        style={[viewStyles.shutter, isLandscape && viewStyles.landscapeShutter]}
        disabled={pictureTaken}
      >
        <Image source={ranks && ranks.species ? icons.arCameraGreen : icons.arCameraButton} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.open_help" )}
        accessible
        onPress={showCameraHelp}
        style={viewStyles.help}
      >
        <Image source={icons.cameraHelp} />
      </TouchableOpacity>
    </>
  );
};

export default ARCameraOverlay;
