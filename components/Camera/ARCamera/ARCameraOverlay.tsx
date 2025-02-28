import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/camera/arCameraOverlay";
import icons from "../../../assets/icons";
import { setCameraHelpText } from "../../../utility/textHelpers";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import ARCameraHeader from "./ARCameraHeader";
import GreenRectangle from "../../UIComponents/GreenRectangle";
import { colors } from "../../../styles/global";
import { useFetchUserSettings } from "../../../utility/customHooks/useFetchUserSettings";
import ToastAnimation from "../../UIComponents/ToastAnimation";
import StyledText from "../../UIComponents/StyledText";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";
import { baseTextStyles } from "../../../styles/textStyles";
import GalleryButton from "./GalleryButton";

interface Prediction {
  name: string;
  taxon_id: number;
  rank_level: number;
  combined_score: number;
  ancestor_ids: number[];
}

interface Props {
  takePicture: ( ) => void;
  prediction?: Prediction;
  pictureTaken: boolean;
  cameraLoaded: boolean;
  filterByTaxonId: ( taxonId: string | null, negativeFilter: boolean ) => void;
  setIsActive: ( arg0: boolean ) => void;
}

const isAndroid = Platform.OS === "android";

const ARCameraOverlay = ( {
  takePicture,
  prediction,
  pictureTaken,
  cameraLoaded,
  filterByTaxonId,
  setIsActive
}: Props ) => {
  const { isLandscape } = useAppOrientation( );
  const { navigate } = useNavigation( );
  const rankToRender = prediction?.rank || null;
  const helpText = setCameraHelpText( rankToRender );
  const userSettings = useFetchUserSettings( );
  const autoCapture = userSettings?.autoCapture;
  const [filterIndex, setFilterIndex] = useState<number | null>( null );

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
    if ( rankToRender === "species" && autoCapture && isCurrent && !pictureTaken ) {
      takePicture( );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [rankToRender, takePicture, autoCapture, pictureTaken] );

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
      {( pictureTaken || !cameraLoaded ) && <LoadingWheel color={colors.white}/>}
      <ARCameraHeader prediction={prediction} />
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
        <StyledText style={[baseTextStyles.buttonSmall, textStyles.scanText, !isLandscape && textStyles.textShadow]}>{helpText}</StyledText>
      </View>

      <View style={
        isLandscape ? viewStyles.cameraControlsContainerLandscape : viewStyles.cameraControlsContainer
      }>
        <View style={viewStyles.leftControls}>
          {isAndroid && (
            <TouchableOpacity
              accessibilityLabel={filterIndex ? settings[filterIndex].text : settings[0].text}
              accessible
              onPress={toggleFilterIndex}
            >
              <Image source={filterIndex ? settings[filterIndex].icon : settings[0].icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.open_help" )}
            accessible
            onPress={showCameraHelp}
          >
            <Image source={icons.cameraHelp} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.take_photo" )}
          accessible
          testID="takePhotoButton"
          onPress={takePicture}
          style={viewStyles.shadow}
          disabled={pictureTaken}
        >
          <Image
            source={
              prediction?.rank === "species"
                ? icons.arCameraGreen
                : icons.arCameraButton
            }
          />
        </TouchableOpacity>

        <View style={viewStyles.rightControls}>
          <GalleryButton setIsActive={setIsActive} />
        </View>
      </View>
    </>
  );
};

export default ARCameraOverlay;
