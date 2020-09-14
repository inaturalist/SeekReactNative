// @flow

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
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
    filterByTaxonId( settings[filterIndex].taxonId, settings[filterIndex].negativeFilter );
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

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<WarningModal closeModal={closeModal} />}
      />
        {( pictureTaken || !cameraLoaded ) && <LoadingWheel color="white" />}
        <ARCameraHeader ranks={ranks} />
        {isAndroid && (
          <View style={styles.plantFilter}>
            <GreenRectangle text={settings[filterIndex].text} color={settings[filterIndex].color} />
          </View>
        )}
        <Text style={styles.scanText}>{helpText}</Text>
        {isAndroid && (
          <TouchableOpacity
            accessibilityLabel={settings[filterIndex].text}
            accessible
            onPress={toggleFilterIndex}
            style={styles.plantFilterSettings}
          >
            <Image source={settings[filterIndex].icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.take_photo" )}
          accessible
          onPress={() => takePicture()}
          style={styles.shutter}
          disabled={pictureTaken}
        >
          <Image source={ranks && ranks.species ? icons.arCameraGreen : icons.arCameraButton} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.help" )}
          accessible
          onPress={() => navigate( "CameraHelp" )}
          style={styles.help}
        >
          <Image source={icons.cameraHelp} />
        </TouchableOpacity>
    </>
  );
};

export default ARCameraOverlay;
