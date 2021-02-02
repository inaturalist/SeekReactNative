// @flow

import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Animated
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/arCameraOverlay";
import icons from "../../../assets/icons";
import { setCameraHelpText } from "../../../utility/textHelpers";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import Modal from "../../UIComponents/Modals/Modal";
import WarningModal from "../../Modals/WarningModal";
import ARCameraHeader from "./ARCameraHeader";
import { checkIfCameraLaunched } from "../../../utility/helpers";
import { CameraContext } from "../../UserContext";
import GreenRectangle from "../../UIComponents/GreenRectangle";
import { colors } from "../../../styles/global";

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
}: Props ) => {
  const fadeOut = useRef( new Animated.Value( 0 ) ).current;
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const rankToRender = Object.keys( ranks )[0] || null;
  const helpText = setCameraHelpText( rankToRender );
  const [showModal, setModal] = useState( false );
  const { autoCapture } = useContext( CameraContext );
  const [filterIndex, setFilterIndex] = useState( 0 );

  const toggleFilterIndex = () => {
    if ( filterIndex < 2 ) {
      setFilterIndex( filterIndex + 1 );
    } else {
      setFilterIndex( 0 );
    }
  };

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  useEffect( () => {
    if ( filterIndex ) {
      filterByTaxonId( settings[filterIndex].taxonId, settings[filterIndex].negativeFilter );
    }
  }, [filterIndex, filterByTaxonId] );

  useEffect( () => {
    if ( params.showWarning === "true" ) {
      openModal();
    }
  }, [params] );

  useEffect( () => {
    const checkForFirstCameraLaunch = async () => {
      const isFirstLaunch = await checkIfCameraLaunched();
      if ( isFirstLaunch ) {
        openModal();
      }
    };
    checkForFirstCameraLaunch();
  }, [] );

  useEffect( () => {
    if ( rankToRender === "species" && autoCapture ) {
      takePicture();
    }
  }, [rankToRender, takePicture, autoCapture] );

  useEffect( () => {
    const entrance = {
      toValue: 1,
      duration: 0,
      useNativeDriver: true
    };

    const exit = {
      toValue: 0,
      delay: 2000,
      duration: 200,
      useNativeDriver: true
    };

    if ( filterIndex === 0 ) {
      Animated.sequence( [
        Animated.timing( fadeOut, entrance ),
        Animated.timing( fadeOut, exit )
      ] ).start();
    }
  }, [fadeOut, filterIndex] );

  const showFilterText = () => {
    if ( filterIndex === 0 || filterIndex === null ) {
      return;
    }

    return (
      <View style={styles.plantFilter}>
        <GreenRectangle text={settings[filterIndex].text} color={settings[filterIndex].color} />
      </View>
    );
  };

  const showAnimation = () => (
    <Animated.View style={[styles.plantFilter, { opacity: fadeOut }]}>
      <GreenRectangle text={settings[filterIndex].text} color={settings[filterIndex].color} />
    </Animated.View>
  );

  const showCameraHelp = () => navigate( "CameraHelp" );

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<WarningModal closeModal={closeModal} />}
      />
        {( pictureTaken || !cameraLoaded ) && <LoadingWheel color="white" testID="cameraLoading" />}
        <ARCameraHeader ranks={ranks} />
        {isAndroid && showFilterText()}
        {( isAndroid && filterIndex === 0 ) && showAnimation()}
        <Text style={styles.scanText}>{helpText}</Text>
        {isAndroid && (
          <TouchableOpacity
            accessibilityLabel={filterIndex ? settings[filterIndex].text : settings[0].text}
            accessible
            onPress={toggleFilterIndex}
            style={styles.plantFilterSettings}
          >
            <Image source={filterIndex ? settings[filterIndex].icon : settings[0].icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.take_photo" )}
          accessible
          testID="takePhotoButton"
          onPress={takePicture}
          style={styles.shutter}
          disabled={pictureTaken}
        >
          <Image source={ranks && ranks.species ? icons.arCameraGreen : icons.arCameraButton} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.help" )}
          accessible
          onPress={showCameraHelp}
          style={styles.help}
        >
          <Image source={icons.cameraHelp} />
        </TouchableOpacity>
    </>
  );
};

export default ARCameraOverlay;
